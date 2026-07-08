import auth
val = auth.session_cookie(1, False)
cookie_val = val.split(";")[0].split("=")[1]
print("cookie val:", cookie_val)
header = "sess=" + cookie_val
print("Parsed UID:", auth.read_session(header))
