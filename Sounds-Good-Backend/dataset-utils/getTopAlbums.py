import requests
import json
import time

with open('artists_data.json', 'r', encoding='utf-8') as file:
    artist_data = json.load(file)
    artists = list(artist_data.keys())

api_key = '691ee9c1ac42404e59e5e2fb690e9451'
base_url = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums'
limit = "5"
all_top_albums = {}


for artist in artists:
    api_url = f"{base_url}&artist={artist}&api_key={api_key}&limit={limit}&format=json"
    response = requests.get(api_url)
    response.raise_for_status()
    data = response.json()
    
    albums = []

    if "topalbums" in data and "album" in data["topalbums"] and len(data["topalbums"]["album"]) > 0:
        #artist_top_albums = []
        for i in range(min(5, len(data["topalbums"]["album"]))):
            album = data["topalbums"]["album"][i]
            albums.append(
                {
                "album_name": album["name"],
                "album_cover": album["image"][3]["#text"]
                }
            )
    all_top_albums[artist] = {"albums": albums}
    print(artist)
    time.sleep(1)
with open('top5_albums.json', 'w', encoding='utf-8') as file:
    json.dump(all_top_albums, file, ensure_ascii=False, indent=4)

print("Data saved to topAlbums_data.json")