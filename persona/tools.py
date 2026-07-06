"""
============================================================
Client-side tools the voice agent (Sable/Maya) can call.

The actual work runs in the BROWSER — playlists live in localStorage and are
created by createPlaylistData()/addSongToPlaylist() in script.js. So the server
never executes these; it only lets Claude *decide* to call one, then relays the
JSON tool call down to the browser (see server._persona), which runs the real
function. This module just holds the tool schema Claude sees.
============================================================
"""

# Anthropic tool definition. The description is the contract that tells Claude
# WHEN to reach for this tool — be prescriptive, not just descriptive.
CREATE_PLAYLIST_TOOL = {
    "name": "create_playlist",
    "description": (
        "Create a new playlist in the user's library, fill it with songs, and "
        "optionally start it playing. Call this when the user asks to make, start, "
        "build, or put together a playlist or mix — e.g. \"make a mix of chill "
        "songs\", \"create a playlist called Gym Hype\", \"a calm playlist for a "
        "1-hour study session\". "
        "Only call it once you have a NAME (ask the user first if they didn't give "
        "one — see the system prompt's playlist flow). "
        "CURATE `tracks` yourself: when the user describes a vibe, genre, or "
        "activity instead of naming songs, fill `tracks` with real, specific songs "
        "that fit — you are a music expert, so pick actual tracks and artists, not "
        "placeholders. Size the list to any stated duration (~17 songs per hour, "
        "~9 per 30 min); use `target_minutes` to record that duration. "
        "Set `play` to true when the user wants it to start playing now (usual for "
        "an activity like studying or working out). "
        "Do NOT call this to add to or play an EXISTING playlist — only to create a new one."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "description": (
                    "Playlist title (2-4 words). Use the user's exact name if they "
                    "gave one; otherwise the title they approved. Never blank."
                ),
            },
            "tracks": {
                "type": "array",
                "description": (
                    "Songs to add, in order. Each item is a song title, optionally "
                    "with the artist as \"Song by Artist\" or \"Song - Artist\". "
                    "Curate real songs matching the requested vibe/genre/activity, "
                    "sized to the duration. Empty only if the user explicitly wants "
                    "an empty playlist."
                ),
                "items": {"type": "string"},
            },
            "target_minutes": {
                "type": "integer",
                "description": (
                    "Rough total length the user asked for, in minutes (e.g. 60 for "
                    "\"an hour\"). Omit if no duration was mentioned."
                ),
            },
            "play": {
                "type": "boolean",
                "description": "True to start the playlist playing immediately after creating it.",
            },
        },
        "required": ["name"],
    },
}

# The array you pass to the Anthropic `tools=` parameter. Add more tools here later.
PLAYLIST_TOOLS = [CREATE_PLAYLIST_TOOL]
