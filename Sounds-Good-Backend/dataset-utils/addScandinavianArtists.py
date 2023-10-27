import json
import requests

api_key = "691ee9c1ac42404e59e5e2fb690e9451"

# List of Scandinavian artists
scandinavian_artists = [
    "Kygo", "Aurora", "Sigrid", "Alan Walker", "TIX", "Astrid S", "Seeb", "Matoma", "Marcus & Martinus", "Highasakite", "KARPE", "Dagny", 
    "Emilie Nicolas", "Lemaitre", "Boy Pablo", "AVABEREE", "Lido", "Todd Terje", "CLMD", "Cezinando", "Gabrielle", "Ina Wroldsen", "Jenny Hval", 
    "Tungevaag", "Julie Bergan", "Zara Larsson", "Tove Lo", "Alesso", "Swedish House Mafia", "Robyn", "Avicii", "ABBA", "MØ", "Lukas Graham", 
    "Alphabeat", "Christopher", "Icona Pop", "Mando Diao", "First Aid Kit", "Lykke Li", "Iceage", "Anna of the North", "Of Monsters and Men", 
    "Björn Rosenström", "José González", "Benny Andersson", "Sabina Ddumba", "Vigiland", "Axwell", "Yung Lean"
]

# Convert the list to a set and back to a list to remove duplicates
unique_scandinavian_artists = list(set(scandinavian_artists))

# Notify if there were any duplicates
if len(unique_scandinavian_artists) < len(scandinavian_artists):
    print(f"Removed {len(scandinavian_artists) - len(unique_scandinavian_artists)} duplicate artists.")

# Load the data from the existing top_Artists.json
with open('top100_artists.json', 'r', encoding='utf-8') as file:
    top_artists = json.load(file)

for artist_name in unique_scandinavian_artists:
    print(f"Fetching info for {artist_name}...")

    # Check if the artist info already exists, if not, initialize it

    if artist_name not in top_artists:
        artist_info_url = f"http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist={artist_name}&api_key={api_key}&format=json"
        artist_info_response = requests.get(artist_info_url)
        artist_info_response.raise_for_status()
        artist_info_data = artist_info_response.json()

        listeners = artist_info_data.get("artist", {}).get("stats", {}).get("listeners")
        top_artists[artist_name] = {"listeners": int(listeners) if listeners else 0}
    

# Save the combined data to updated_Top_Artists.json
with open('top100_w50scandi_artists.json', 'w', encoding='utf-8') as file:
    json.dump(top_artists, file, ensure_ascii=False, indent=4)

print("Updated artists info saved!")
