import server
import logging
logging.basicConfig(level=logging.DEBUG)

print("Result:", server.fetch_lyrics("Don Toliver", "ATM", "153"))
