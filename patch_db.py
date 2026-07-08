import sqlite3

def patch():
    try:
        conn = sqlite3.connect("music.db")
        c = conn.cursor()
        c.execute("ALTER TABLE feedback ADD COLUMN exported INTEGER DEFAULT 0")
        conn.commit()
        print("Patched DB")
    except Exception as e:
        print("Error or already patched:", e)

if __name__ == "__main__":
    patch()
