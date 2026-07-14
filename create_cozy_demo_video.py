import os
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

OUTPUT_PATH = "/Users/prathk/Desktop/Retro_Music_Player_Cozy_Demo.mp4"
SCREENSHOT_DIR = "/Users/prathk/.gemini/antigravity-ide/brain/e977d388-edac-458d-a0c1-708306492973"

FPS = 30
WIDTH, HEIGHT = 1920, 1080

# Exact Drake Hotline Bling screenshots captured from fresh walkthrough
SCENES_FILES = {
    "home": os.path.join(SCREENSHOT_DIR, "01_home_clean_1783764547878.png"),
    "search": os.path.join(SCREENSHOT_DIR, "02_search_results_1783764586085.png"),
    "playing": os.path.join(SCREENSHOT_DIR, "03_playing_searched_song_1783764634009.png"),
    "lyrics_open": os.path.join(SCREENSHOT_DIR, "04_lyrics_stage_opened_1783764680854.png"),
    "lyrics_anim": os.path.join(SCREENSHOT_DIR, "05_lyrics_animating_1783764714428.png"),
    "seek_sync": os.path.join(SCREENSHOT_DIR, "06_instant_seek_sync_1783764765605.png"),
    "seek_cont": os.path.join(SCREENSHOT_DIR, "07_synced_playback_continued_1783764793726.png"),
}

def load_and_prep_image(path):
    if not os.path.exists(path):
        img = np.zeros((HEIGHT, WIDTH, 3), dtype=np.uint8)
        img[:] = (20, 20, 28)
        return img
    pil_img = Image.open(path).convert("RGB")
    iw, ih = pil_img.size
    scale = min(WIDTH / iw, HEIGHT / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    resized = pil_img.resize((nw, nh), Image.Resampling.LANCZOS)
    
    canvas = Image.new("RGB", (WIDTH, HEIGHT), (14, 14, 20))
    paste_x = (WIDTH - nw) // 2
    paste_y = (HEIGHT - nh) // 2
    canvas.paste(resized, (paste_x, paste_y))
    return cv2.cvtColor(np.array(canvas), cv2.COLOR_RGB2BGR)

def draw_text_overlay(frame_bgr, title, subtitle):
    pil_img = Image.fromarray(cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB))
    
    # Bottom gradient overlay for text readability
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    for y in range(HEIGHT - 260, HEIGHT):
        a = int(225 * ((y - (HEIGHT - 260)) / 260.0))
        odraw.line([(0, y), (WIDTH, y)], fill=(10, 10, 15, a))
    pil_img = Image.alpha_composite(pil_img.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(pil_img)

    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 46)
        font_sub = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 28)
    except Exception:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    draw.text((80, HEIGHT - 180), title, font=font_title, fill=(255, 230, 120, 255))
    draw.text((80, HEIGHT - 110), subtitle, font=font_sub, fill=(220, 220, 235, 255))
    
    return cv2.cvtColor(np.array(pil_img.convert("RGB")), cv2.COLOR_RGB2BGR)

def create_title_card(title, subtitle, duration_sec):
    frames = []
    total_frames = int(duration_sec * FPS)
    for i in range(total_frames):
        canvas = Image.new("RGB", (WIDTH, HEIGHT), (14, 14, 20))
        draw = ImageDraw.Draw(canvas)
        try:
            ft = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 60)
            fs = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 32)
        except Exception:
            ft = ImageFont.load_default()
            fs = ImageFont.load_default()
        
        draw.text((80, HEIGHT//2 - 60), title, font=ft, fill=(255, 230, 120))
        draw.text((80, HEIGHT//2 + 30), subtitle, font=fs, fill=(200, 205, 220))
        frames.append(cv2.cvtColor(np.array(canvas), cv2.COLOR_RGB2BGR))
    return frames

def ken_burns_scene(img_bgr, duration_sec, zoom_start=1.0, zoom_end=1.05, title="", subtitle=""):
    frames = []
    total_frames = int(duration_sec * FPS)
    h, w = img_bgr.shape[:2]
    for i in range(total_frames):
        progress = i / max(1, total_frames - 1)
        z = zoom_start + (zoom_end - zoom_start) * progress
        
        new_w, new_h = int(w / z), int(h / z)
        x1 = (w - new_w) // 2
        y1 = (h - new_h) // 2
        crop = img_bgr[y1:y1+new_h, x1:x1+new_w]
        frame = cv2.resize(crop, (WIDTH, HEIGHT), interpolation=cv2.INTER_LANCZOS4)
        
        if title or subtitle:
            frame = draw_text_overlay(frame, title, subtitle)
        frames.append(frame)
    return frames

def main():
    print("[video] Loading Drake Hotline Bling scenes...")
    imgs = {k: load_and_prep_image(v) for k, v in SCENES_FILES.items()}
    
    video_frames = []
    
    # 1. Intro Card (4s)
    print("[video] Rendering Intro...")
    video_frames.extend(create_title_card("YOUR WORKSPACE SANCTUARY", "Retro Music Player — Designed for Visual Desk Workers & Extra Monitors", 4.0))
    
    # 2. Scene 1: Minimalist Retro Cassette Deck (6s)
    print("[video] Rendering Scene 1...")
    video_frames.extend(ken_burns_scene(
        imgs["home"], 6.0, 1.0, 1.04,
        "1. THE COZY DESK COMPANION",
        "A warm, cassette-powered aesthetic built specifically for your second screen without visual clutter."
    ))
    
    # 3. Scene 2: Searching & Playing Hotline Bling (7s)
    print("[video] Rendering Scene 2...")
    video_frames.extend(ken_burns_scene(
        imgs["search"], 3.5, 1.0, 1.03,
        "2. INSTANT TRACK SEARCH",
        "Search any hit instantly — featuring Drake's iconic 'Hotline Bling'."
    ))
    video_frames.extend(ken_burns_scene(
        imgs["playing"], 3.5, 1.03, 1.06,
        "2. INSTANT TRACK SEARCH",
        "Fast track loading with responsive illuminated VU meters and retro cassette tape reels."
    ))
    
    # 4. Scene 3: The 3D Conveyor Belt Lyrics Sanctuary (10s)
    print("[video] Rendering Scene 3...")
    video_frames.extend(ken_burns_scene(
        imgs["lyrics_open"], 5.0, 1.0, 1.04,
        "3. THE 3D CONVEYOR BELT LYRICS SANCTUARY",
        "Exact-caption morphing text loops smoothly along a 3D ribbon, turning your room into a glowing audio haven."
    ))
    video_frames.extend(ken_burns_scene(
        imgs["lyrics_anim"], 5.0, 1.04, 1.08,
        "3. THE 3D CONVEYOR BELT LYRICS SANCTUARY",
        "Watch the active line glow while upcoming lyrics preview behind — calm, immersive, and visually captivating."
    ))
    
    # 5. Scene 4: Instant Seek & Sync Proof (8s)
    print("[video] Rendering Scene 4...")
    video_frames.extend(ken_burns_scene(
        imgs["seek_sync"], 4.0, 1.05, 1.02,
        "4. INSTANTANEOUS SEEK SYNCHRONIZATION",
        "Jump anywhere across the timeline. The 3D lyrics conveyor immediately snaps to the exact beat with zero lag."
    ))
    video_frames.extend(ken_burns_scene(
        imgs["seek_cont"], 4.0, 1.02, 1.0,
        "4. INSTANTANEOUS SEEK SYNCHRONIZATION",
        "Continuous, rock-solid synchronization across every line so your state of flow remains uninterrupted."
    ))
    
    # 6. Outro Card (4s)
    print("[video] Rendering Outro...")
    video_frames.extend(create_title_card("MAKE YOUR WORKSPACE COZY", "Experience the Retro Music Player — Rich 3D aesthetics, custom playlists & exact synchronization.", 4.0))
    
    print(f"[video] Encoding {len(video_frames)} frames to {OUTPUT_PATH}...")
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(OUTPUT_PATH, fourcc, FPS, (WIDTH, HEIGHT))
    for f in video_frames:
        out.write(f)
    out.release()
    print("[video] Successfully created Drake Hotline Bling video at:", OUTPUT_PATH)

if __name__ == "__main__":
    main()
