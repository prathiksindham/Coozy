const fluidGlow = (() => {
  let canvas, gl, program, timeLocation, resolutionLocation;
  let rafId = null;
  let startTime = 0;
  
  const vertexShaderSrc = `
    attribute vec2 a_position;
    varying vec2 vUv;
    void main() {
      vUv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  // A fluid swirling noise shader masked to the edges
  const fragmentShaderSrc = `
    precision highp float;
    varying vec2 vUv;
    uniform float u_time;
    uniform vec2 u_resolution;

    // Pseudo-random and noise functions
    vec3 hash(vec3 p) {
      p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
               dot(p, vec3(269.5, 183.3, 246.1)),
               dot(p, vec3(113.5, 271.9, 124.6)));
      return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }
    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      vec3 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(mix(dot(hash(i + vec3(0,0,0)), f - vec3(0,0,0)), 
                         dot(hash(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                     mix(dot(hash(i + vec3(0,1,0)), f - vec3(0,1,0)), 
                         dot(hash(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
                 mix(mix(dot(hash(i + vec3(0,0,1)), f - vec3(0,0,1)), 
                         dot(hash(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                     mix(dot(hash(i + vec3(0,1,1)), f - vec3(0,1,1)), 
                         dot(hash(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z);
    }
    float fbm(vec3 p) {
      float f = 0.0;
      float w = 0.5;
      for (int i = 0; i < 4; i++) {
        f += w * noise(p);
        p *= 2.0;
        w *= 0.5;
      }
      return f;
    }

    void main() {
      // Normalize coords based on aspect ratio
      vec2 st = vUv;
      st.x *= u_resolution.x / u_resolution.y;
      
      // Calculate distance to nearest edge (0 to 0.5)
      float dx = min(vUv.x, 1.0 - vUv.x);
      float dy = min(vUv.y, 1.0 - vUv.y);
      float distToEdge = min(dx, dy);
      
      // Make thinner on mobile (resolution width < 800)
      float thickness = u_resolution.x < 800.0 ? 0.04 : 0.07;
      
      // Mask: 1.0 at edge, fading to 0.0 inwards
      float mask = smoothstep(thickness, 0.0, distToEdge);
      
      // Early exit for pixels completely inside (optimization)
      if (mask <= 0.01) {
         gl_FragColor = vec4(0.0);
         return;
      }

      // Generate swirling fluid noise
      vec3 p = vec3(st * 3.0, u_time * 0.4);
      
      // Domain warping for fluid look
      vec3 q = vec3(fbm(p + vec3(0.0)), fbm(p + vec3(5.2)), 0.0);
      vec3 r = vec3(fbm(p + 4.0 * q + vec3(1.7, 9.2, 0.0)), fbm(p + 4.0 * q + vec3(8.3, 2.8, 0.0)), 0.0);
      float n = fbm(p + 4.0 * r);
      
      // Map noise [-1, 1] to [0, 1] and boost contrast significantly
      n = smoothstep(-0.1, 0.6, n);
      
      // Base color: Maya's teal green rgb(39, 229, 145) = (0.15, 0.9, 0.57)
      vec3 color = vec3(0.15, 0.90, 0.57);
      
      // High contrast mix with darker/lighter variants
      vec3 fluidColor = mix(color * 0.1, color * 2.2, n);
      
      // Apply mask and an extra power curve for soft glowing edges
      float alpha = mask * n * 2.0;
      
      gl_FragColor = vec4(fluidColor * alpha, alpha);
    }
  `;

  function init() {
    canvas = document.getElementById("sable-fluid-canvas");
    if (!canvas) return;
    
    gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexShaderSrc);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentShaderSrc);
    gl.compileShader(fs);

    // Link program
    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Setup buffers (a simple full-screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1.0, -1.0,  1.0, -1.0,  -1.0, 1.0,
      -1.0,  1.0,  1.0, -1.0,   1.0, 1.0
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniforms
    timeLocation = gl.getUniformLocation(program, "u_time");
    resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    resize();
    window.addEventListener("resize", resize);
  }

  function resize() {
    if (!canvas || !gl) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
  }

  function render(time) {
    if (!startTime) startTime = time;
    const elapsed = (time - startTime) * 0.001; // seconds

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.uniform1f(timeLocation, elapsed);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    rafId = requestAnimationFrame(render);
  }

  return {
    start: () => {
      if (!gl) init();
      if (!gl) return;
      if (!rafId) {
        canvas.style.opacity = "1";
        startTime = performance.now() - (startTime ? startTime : 0); // resume smoothly
        rafId = requestAnimationFrame(render);
      }
    },
    stop: () => {
      if (rafId) {
        if (canvas) canvas.style.opacity = "0";
        setTimeout(() => {
            if (canvas && canvas.style.opacity === "0") {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }, 500); // Wait for CSS transition
      }
    }
  };
})();

window.fluidGlow = fluidGlow;
