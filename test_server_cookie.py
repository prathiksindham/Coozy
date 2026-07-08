import urllib.request
import time
import subprocess
import os
import signal

# start server
p = subprocess.Popen(["python3", "server.py"], env=dict(os.environ, GOOGLE_CLIENT_ID="test", PORT="4748"))
time.sleep(2)

try:
    # 1. Login with a fake credential (won't work because verify_google will fail)
    # Let's bypass google by calling _auth_google with a mock? No, just testing cookie behavior.
    pass
finally:
    p.send_signal(signal.SIGINT)
    p.wait()
