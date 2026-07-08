import sys

with open("server.py", "r") as f:
    lines = f.readlines()

out = []
for line in lines:
    if line.strip() == "def _persona(self):":
        out.append("""    def _post_feedback(self):
        uid = self._uid()
        if not uid:
            self._json(401, b'{"error":"Not logged in"}')
            return
        
        user = auth.get_user(uid)
        user_email = user.get("email") if user else "unknown"
        
        req = self._read_json()
        message = req.get("message", "").strip()
        if not message:
            self._json(400, b'{"error":"Message is empty"}')
            return
        
        try:
            auth.insert_feedback(user_email, message)
            self._json(200, b'{"ok":true}')
        except Exception as e:
            self._json(500, json.dumps({"error": str(e)}).encode())

    def _export_feedback_csv(self):
        import csv
        import io
        import time
        try:
            records = auth.get_all_feedback()
            output = io.StringIO()
            writer = csv.writer(output)
            writer.writerow(["Email", "Message", "Timestamp"])
            for rec in records:
                ts_str = time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime(rec[2]))
                writer.writerow([rec[0], rec[1], ts_str])
            
            csv_data = output.getvalue().encode('utf-8')
            
            self.send_response(200)
            self.send_header("Content-Type", "text/csv")
            self.send_header("Content-Disposition", 'attachment; filename="feedback.csv"')
            self.send_header("Content-Length", str(len(csv_data)))
            self.end_headers()
            self.wfile.write(csv_data)
        except Exception as e:
            self._json(500, json.dumps({"error": str(e)}).encode())

""")
    out.append(line)

with open("server.py", "w") as f:
    f.writelines(out)

