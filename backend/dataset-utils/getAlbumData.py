import requests
import json
import time
from urllib.parse import quote

api_key = 'SECRET_KEY'
failed_requests = []

# Read the generated JSON file
with open('top5_albums.json', 'r', encoding='utf-8') as file:
    all_albums_data = json.load(file)

total = 150 * 5
count = 1

# Iterate through each artist in the file
try:
    with open('checkpoint.txt', 'r') as file:
        checkpoint_artist = file.readline().strip()
        checkpoint_album = file.readline().strip()
except FileNotFoundError:
    checkpoint_artist = None
    checkpoint_album = None

for artist_name, artist_data in all_albums_data.items():

    for album in artist_data["albums"]:
        if checkpoint_artist and artist_name != checkpoint_artist:
            continue
        if checkpoint_album and album_name != checkpoint_album:
            continue
        # Error handeling: Clear after reaching the checkpointed artist
        checkpoint_artist = None
        checkpoint_album = None   # Error handeling: Clear after reaching the checkpointed album

    for album in artist_data["albums"]:
        prosent = (count/total)*100
        album_name = album["album_name"]
        print("\n---- "+artist_name + " ---- " + album_name +
              " ---- " + "{:.2f}".format(prosent) + "'%' ferdig")  # shows progress (this script takes a long time to run)

        api_url = f"http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key={api_key}&artist={quote(artist_name)}&album={quote(album_name)}&format=json"

        try:
            response = requests.get(api_url)
            response.raise_for_status()

        except requests.exceptions.HTTPError as err:
            print(
                f"Failed to fetch info for {artist_name} - {album_name}. Error: {err}")
            failed_requests.append({
                "artist": artist_name,
                "album": album_name
            })
            continue

        album_info = response.json()

        if 'album' in album_info and 'tracks' in album_info['album']:

            cleanedTracks = []
            tracksData = album_info["album"]["tracks"]["track"]

            if isinstance(tracksData, dict):
                tracksData = [tracksData]

            # for track in album_info["album"]["tracks"]["track"]:
            for track in tracksData:
                # print(track)
                print(track["name"])
                cleanedTrack = {
                    "name": track["name"],
                    "duration": 0 if track["duration"] is None else int(track["duration"]),
                    "rank": int(track["@attr"]["rank"])
                }
                cleanedTracks.append(cleanedTrack)

            album["tracks"] = cleanedTracks

        # Tags are user submitted and usually weird
        if ('album' in album_info and
            isinstance(album_info["album"], dict) and
            'tags' in album_info['album'] and
            isinstance(album_info["album"]["tags"], dict) and
            'tag' in album_info["album"]["tags"] and
                isinstance(album_info["album"]["tags"]["tag"], list)):
            tags = album_info["album"]["tags"]["tag"]
            album["tags"] = [tag["name"]
                             for tag in tags if isinstance(tag, dict) and "name" in tag]

        # Extracting and saving wiki
        if 'album' in album_info and 'wiki' in album_info['album']:
            wiki = album_info["album"]["wiki"]
            album["wiki"] = {
                "published": wiki["published"],
                "summary": wiki["summary"],
                "content": wiki["content"]
            }
        time.sleep(2)
        count = count + 1

    # first_artist_processed = True


with open('checkpoint.txt', 'w') as file:
    file.write(f"{artist_name}\n{album_name}")

# 5. Write the updated data back to the JSON file
with open('top5_albums_data.json', 'w', encoding='utf-8') as file:
    json.dump(all_albums_data, file, ensure_ascii=False, indent=4)

print("Updated data saved to top5_albums_data.json")


if failed_requests:
    with open('failed_requests.json', 'w', encoding='utf-8') as file:
        json.dump(failed_requests, file, ensure_ascii=False, indent=4)
    print("Failed requests saved to failed_requests.json")
