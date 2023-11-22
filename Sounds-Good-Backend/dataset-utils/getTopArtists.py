import json
import requests


limit = "100"
api_key = "SECRET_KEY"

top_artists = {}

api_url = f"http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit={limit}&api_key={api_key}&format=json"
response = requests.get(api_url)
response.raise_for_status()
data = response.json()

for artist in data["artists"]["artist"]:
    artist_name = artist["name"]
    listeners = int(artist["listeners"])
    top_artists[artist_name] = {
        "listeners": listeners
    }

with open('top100_artists.json', 'w', encoding='utf-8') as file:
    json.dump(top_artists, file, ensure_ascii=False, indent=4)
