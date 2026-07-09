const fluidGlow = (() => {
  let canvas, gl;
  let rafId = null;
  let isActive = false;
  let lastTime = 0;

  // WebGL Ext
  let ext;

  // Programs
  let splatProgram, advectionProgram, divergenceProgram, pressureProgram, gradientSubtractProgram, outputProgram;
  
  // FBOs
  let velocity, pressure, divergence, outputColor;

  const vertexShaderSrc = `
    precision highp float;
    attribute vec2 a_position;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 u_texel;

    void main () {
        vUv = 0.5 * (a_position + 1.0);
        vL = vUv - vec2(u_texel.x, 0.0);
        vR = vUv + vec2(u_texel.x, 0.0);
        vT = vUv + vec2(0.0, u_texel.y);
        vB = vUv - vec2(0.0, u_texel.y);
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const splatShaderSrc = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D u_input_texture;
    uniform float u_ratio;
    uniform vec3 u_point_value;
    uniform vec2 u_point;
    uniform float u_point_size;

    void main () {
        vec2 p = vUv - u_point.xy;
        p.x *= u_ratio;
        vec3 splat = pow(2.0, -dot(p, p) / u_point_size) * u_point_value;
        vec3 base = texture2D(u_input_texture, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
  `;

  const advectionShaderSrc = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D u_velocity_texture;
    uniform sampler2D u_input_texture;
    uniform vec2 u_texel;
    uniform float u_dt;
    uniform float u_dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;
        vec2 iuv = floor(st);
        vec2 fuv = fract(st);
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
        vec2 coord = vUv - u_dt * bilerp(u_velocity_texture, vUv, u_texel).xy * u_texel;
        gl_FragColor = u_dissipation * bilerp(u_input_texture, coord, u_texel);
        gl_FragColor.a = 1.0;
    }
  `;

  const divergenceShaderSrc = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D u_velocity_texture;

    void main () {
        float L = texture2D(u_velocity_texture, vL).x;
        float R = texture2D(u_velocity_texture, vR).x;
        float T = texture2D(u_velocity_texture, vT).y;
        float B = texture2D(u_velocity_texture, vB).y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
  `;

  const pressureShaderSrc = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D u_pressure_texture;
    uniform sampler2D u_divergence_texture;

    void main () {
        float L = texture2D(u_pressure_texture, vL).x;
        float R = texture2D(u_pressure_texture, vR).x;
        float T = texture2D(u_pressure_texture, vT).x;
        float B = texture2D(u_pressure_texture, vB).x;
        float divergence = texture2D(u_divergence_texture, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
  `;

  const gradientSubtractShaderSrc = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D u_pressure_texture;
    uniform sampler2D u_velocity_texture;

    void main () {
        float L = texture2D(u_pressure_texture, vL).x;
        float R = texture2D(u_pressure_texture, vR).x;
        float T = texture2D(u_pressure_texture, vT).x;
        float B = texture2D(u_pressure_texture, vB).x;
        vec2 velocity = texture2D(u_velocity_texture, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `;

  const outputShaderSrc = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D u_output_texture;
    uniform vec2 u_resolution;

    void main () {
        vec3 C = texture2D(u_output_texture, vUv).rgb;
        
        // Exact 48 physical pixel mask
        vec2 pixelCoord = vUv * u_resolution;
        float dx = min(pixelCoord.x, u_resolution.x - pixelCoord.x);
        float dy = min(pixelCoord.y, u_resolution.y - pixelCoord.y);
        float distPx = min(dx, dy);
        
        float mask = smoothstep(48.0, 0.0, distPx);
        
        // Add a slight baseline glow to the mask edge to keep it visible
        float baselineGlow = smoothstep(48.0, 30.0, distPx) * 0.15;
        
        // Intensity of the fluid physics (length of color vector)
        float intensity = length(C);
        
        // Maya's Teal Colors
        vec3 darkTeal = vec3(0.02, 0.25, 0.15);
        vec3 mainTeal = vec3(0.15, 0.90, 0.57);
        vec3 brightTeal = vec3(0.60, 1.00, 0.85);
        
        vec3 finalColor = mix(darkTeal, mainTeal, smoothstep(0.0, 0.3, intensity));
        finalColor = mix(finalColor, brightTeal, smoothstep(0.3, 0.8, intensity));
        
        float alpha = (intensity * 2.0 + baselineGlow) * mask;
        gl_FragColor = vec4(finalColor * alpha, alpha);
    }
  `;

  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  function createProgram(fsSource) {
    const vs = createShader(gl.VERTEX_SHADER, vertexShaderSrc);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    const p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    
    const uniforms = {};
    const count = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) {
        const name = gl.getActiveUniform(p, i).name;
        uniforms[name] = gl.getUniformLocation(p, name);
    }
    return { program: p, uniforms };
  }

  function createFBO(w, h, type) {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, type, w, h, 0, type, gl.FLOAT, null);

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return {
        fbo, width: w, height: h,
        attach: (id) => {
            gl.activeTexture(gl.TEXTURE0 + id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return id;
        }
    };
  }

  function createDoubleFBO(w, h, type) {
    let fbo1 = createFBO(w, h, type);
    let fbo2 = createFBO(w, h, type);
    return {
        width: w, height: h,
        texelSizeX: 1.0 / w, texelSizeY: 1.0 / h,
        read: () => fbo1, write: () => fbo2,
        swap: () => { let t = fbo1; fbo1 = fbo2; fbo2 = t; }
    };
  }

  function init() {
    canvas = document.getElementById("sable-fluid-canvas");
    if (!canvas) return;
    
    gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    ext = gl.getExtension("OES_texture_float") || gl.getExtension("OES_texture_half_float");
    if (!ext) gl.getExtension("OES_texture_float_linear"); 

    splatProgram = createProgram(splatShaderSrc);
    advectionProgram = createProgram(advectionShaderSrc);
    divergenceProgram = createProgram(divergenceShaderSrc);
    pressureProgram = createProgram(pressureShaderSrc);
    gradientSubtractProgram = createProgram(gradientSubtractShaderSrc);
    outputProgram = createProgram(outputShaderSrc);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, -1,1, 1,1, 1,-1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2, 0,2,3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    resize();
    window.addEventListener("resize", resize);
  }

  function resize() {
    if (!canvas || !gl) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Scale down resolution for physics to save performance
    const resScale = window.innerWidth < 800 ? 0.25 : 0.5;
    const w = Math.floor(canvas.width * resScale);
    const h = Math.floor(canvas.height * resScale);

    outputColor = createDoubleFBO(w, h, gl.RGBA);
    velocity = createDoubleFBO(w, h, gl.RGBA);
    divergence = createFBO(w, h, gl.RGBA);
    pressure = createDoubleFBO(w, h, gl.RGBA);
  }

  function blit(target) {
    if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }

  function splat(x, y, dx, dy, color) {
    gl.useProgram(splatProgram.program);
    gl.uniform1i(splatProgram.uniforms.u_input_texture, velocity.read().attach(1));
    gl.uniform1f(splatProgram.uniforms.u_ratio, canvas.width / canvas.height);
    gl.uniform2f(splatProgram.uniforms.u_point, x, 1.0 - y);
    gl.uniform3f(splatProgram.uniforms.u_point_value, dx, -dy, 1.0);
    gl.uniform1f(splatProgram.uniforms.u_point_size, 2.0 / window.innerHeight); // Smaller point for edges
    blit(velocity.write());
    velocity.swap();

    gl.uniform1i(splatProgram.uniforms.u_input_texture, outputColor.read().attach(1));
    gl.uniform3f(splatProgram.uniforms.u_point_value, color.r, color.g, color.b);
    blit(outputColor.write());
    outputColor.swap();
  }

  function render(t) {
    if (!isActive) return;
    
    const dt = 1.0 / 60.0;
    
    // Automated Splats around the edges to simulate speaking/fluid moving
    if (Math.random() < 0.2) { // 20% chance per frame to generate a pulse
        // Randomly choose an edge (0: top, 1: right, 2: bottom, 3: left)
        const edge = Math.floor(Math.random() * 4);
        let x = 0, y = 0, dx = 0, dy = 0;
        
        // Random position along the chosen edge
        const p = Math.random();
        
        if (edge === 0) { // Top
            x = p; y = 0.01;
            dx = (Math.random() - 0.5) * 5.0;
            dy = Math.random() * 5.0;
        } else if (edge === 1) { // Right
            x = 0.99; y = p;
            dx = -Math.random() * 5.0;
            dy = (Math.random() - 0.5) * 5.0;
        } else if (edge === 2) { // Bottom
            x = p; y = 0.99;
            dx = (Math.random() - 0.5) * 5.0;
            dy = -Math.random() * 5.0;
        } else { // Left
            x = 0.01; y = p;
            dx = Math.random() * 5.0;
            dy = (Math.random() - 0.5) * 5.0;
        }
        
        splat(x, y, dx * 1.5, dy * 1.5, {r: 0.15, g: 0.90, b: 0.57});
    }

    gl.useProgram(divergenceProgram.program);
    gl.uniform2f(divergenceProgram.uniforms.u_texel, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(divergenceProgram.uniforms.u_velocity_texture, velocity.read().attach(1));
    blit(divergence);

    gl.useProgram(pressureProgram.program);
    gl.uniform2f(pressureProgram.uniforms.u_texel, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(pressureProgram.uniforms.u_divergence_texture, divergence.attach(1));
    
    for (let i = 0; i < 15; i++) {
        gl.uniform1i(pressureProgram.uniforms.u_pressure_texture, pressure.read().attach(2));
        blit(pressure.write());
        pressure.swap();
    }

    gl.useProgram(gradientSubtractProgram.program);
    gl.uniform2f(gradientSubtractProgram.uniforms.u_texel, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gradientSubtractProgram.uniforms.u_pressure_texture, pressure.read().attach(1));
    gl.uniform1i(gradientSubtractProgram.uniforms.u_velocity_texture, velocity.read().attach(2));
    blit(velocity.write());
    velocity.swap();

    gl.useProgram(advectionProgram.program);
    gl.uniform2f(advectionProgram.uniforms.u_texel, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(advectionProgram.uniforms.u_velocity_texture, velocity.read().attach(1));
    gl.uniform1i(advectionProgram.uniforms.u_input_texture, velocity.read().attach(1));
    gl.uniform1f(advectionProgram.uniforms.u_dt, dt);
    gl.uniform1f(advectionProgram.uniforms.u_dissipation, 0.98);
    blit(velocity.write());
    velocity.swap();

    gl.useProgram(advectionProgram.program);
    gl.uniform2f(advectionProgram.uniforms.u_texel, outputColor.texelSizeX, outputColor.texelSizeY);
    gl.uniform1i(advectionProgram.uniforms.u_input_texture, outputColor.read().attach(2));
    gl.uniform1f(advectionProgram.uniforms.u_dissipation, 0.96); // Colors dissipate slightly faster
    blit(outputColor.write());
    outputColor.swap();

    gl.useProgram(outputProgram.program);
    gl.uniform2f(outputProgram.uniforms.u_resolution, canvas.width, canvas.height);
    gl.uniform1i(outputProgram.uniforms.u_output_texture, outputColor.read().attach(1));
    blit(null); // Render to screen

    if (isActive) {
        rafId = requestAnimationFrame(render);
    }
  }

  return {
    start: () => {
      if (!gl) init();
      if (!gl) return;
      isActive = true;
      canvas.style.opacity = "1";
      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }
    },
    stop: () => {
      isActive = false;
      if (canvas) canvas.style.opacity = "0";
      setTimeout(() => {
          if (rafId && !isActive) {
              cancelAnimationFrame(rafId);
              rafId = null;
          }
      }, 500);
    }
  };
})();

window.fluidGlow = fluidGlow;
