import json
import requests

api_key = "SECRET_KEY"

# Load the data from the existing top_Artists.json
with open('top100_w50Scandi_artists.json', 'r', encoding='utf-8') as file:
    top_artists = json.load(file)

updated_artists = {}

for artist_name, artist_info in top_artists.items():
    print(f"Fetching info for {artist_name}...")

    # Get artist's bio summary using the API call
    artist_info_url = f"http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist={artist_name}&api_key={api_key}&format=json"
    artist_info_response = requests.get(artist_info_url)
    artist_info_response.raise_for_status()
    artist_info_data = artist_info_response.json()

    # Extract bio summary; use an empty string if summary is not available
    bio_summary = artist_info_data.get(
        "artist", {}).get("bio", {}).get("summary", "")

    # Add to the updated artists dictionary
    updated_artists[artist_name] = {
        **artist_info,  # This will add all existing info from the previous JSON
        "bio_summary": bio_summary
    }

# Save the updated data to a new JSON file
with open('artists_data.json', 'w', encoding='utf-8') as file:
    json.dump(updated_artists, file, ensure_ascii=False, indent=4)

print("Updated artists info saved!")
