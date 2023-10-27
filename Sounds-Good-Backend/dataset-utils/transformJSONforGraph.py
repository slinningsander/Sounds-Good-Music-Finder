import json
import uuid
import requests
import os
import time

def download_image(url, save_folder="downloaded_images"):
    """Download an image from a given URL and save it to a local folder."""
    # Ensure the folder exists
    if not os.path.exists(save_folder):
        os.makedirs(save_folder)

    try:
        response = requests.get(url, timeout=10)
        # Ensure the request was successful and the content type is an image
        if response.status_code != 200:
            print(f"Failed to fetch image from {url}. Status code: {response.status_code}")
            with open("image_errors.log", "a") as log_file:
                log_file.write(f"Failed to fetch image from {url}. Status code: {response.status_code}\n")
            return None

        if 'image' not in response.headers.get('content-type', ''):
            print(f"URL {url} does not seem to point to an image.")
            with open("image_errors.log", "a") as log_file:
                log_file.write(f"URL {url} does not seem to point to an image.\n")
            return None

        # Create a unique filename using the last part of the URL
        filename = os.path.join(save_folder, url.split("/")[-1])

        with open(filename, 'wb') as file:
            file.write(response.content)

        print(f"Downloaded image from {url} and saved as {filename}")
        time.sleep(1)

        return filename
    except requests.RequestException as e:
        print(f"Failed to download image from {url}. Error: {e}")
        with open("image_errors.log", "a") as log_file:
            log_file.write(f"Failed to download image from {url}. Error: {e}\n")
        return None


def transform_data_for_neo4j(data):
    artists = []
    albums = []
    tracks = []
    tags = {}
    album_tag_relations = []
    artist_album_relations = []
    artist_track_relations = []
    album_track_relations = []

    for artist_name, artist_data in data.items():
        artist_id = str(uuid.uuid4())
        artists.append({
            "id": artist_id,
            "name": artist_name,
            "listeners": artist_data["listeners"],
            "artist_bio": artist_data["bio_summary"]
        })

        for album_data in artist_data['albums']:
            album_id = str(uuid.uuid4())

            # Download the album cover
            local_path = download_image(album_data["album_cover"], "album_covers")

            #handels wiki not in album
            if "wiki" not in album_data or "summary" not in album_data["wiki"]:
                with open("missing_data.log", "a") as log_file:
                    log_file.write(f"Album {album_data['album_name']} by artist {artist_name} is missing wiki summary.\n")
                album_data["wiki"] = {"summary": "No summary available."}  # Defaulting to a generic message

            albums.append({
                "id": album_id,
                "name": album_data["album_name"],
                "coverart": local_path,
                "summary": album_data["wiki"]["summary"],
                "artist": artist_name
            })
            
            # Relation between artist and album
            artist_album_relations.append({
                "artist_id": artist_id,
                "album_id": album_id
            })

            if not album_data.get("tracks"):
                with open("albums_without_tracks.txt", "a", encoding="utf-8") as log_file:
                    log_file.write(f"Artist: {artist_name}, Album: {album_data['album_name']}\n")
                continue

            # with open("albums_without_tracks.txt", "a", encoding="utf-8") as log_file:
            #         log_file.write(f"Artist: {artist_name}, Album: {album_data['album_name']}\n")
                
            #     continue

            for track_data in album_data["tracks"]:
                track_id = str(uuid.uuid4())
                tracks.append({
                    "id": track_id,
                    "name": track_data["name"],
                    "duration": track_data["duration"],
                    "rank": track_data["rank"],
                    "album_id": album_id,
                    "album_cover": local_path
                })


                # Relation between album and track
                album_track_relations.append({
                    "album_id": album_id,
                    "track_id": track_id
                })

                # Relation between artist and track
                artist_track_relations.append({
                    "artist_id": artist_id,
                    "track_id": track_id
                })

            for tag_name in album_data.get("tags", []):
                if tag_name not in tags:
                    tags[tag_name] = {
                        "id": str(uuid.uuid4()),
                        "name": tag_name
                    }
                album_tag_relations.append({
                    "album_id": album_id,
                    "tag_id": tags[tag_name]["id"]
                })

    # Convert the dictionary of tags into a list
    tag_list = list(tags.values())

    return {
        "artists": artists,
        "albums": albums,
        "tracks": tracks,
        "tags": tag_list,
        "album_tag_relations": album_tag_relations,
        "artist_album_relations": artist_album_relations,
        "artist_track_relations": artist_track_relations,
        "album_track_relations": album_track_relations
    }

# Load the JSON data from the input file
with open('merged_data.json', 'r', encoding = 'utf-8') as infile:
    raw_data = json.load(infile)

# Transform the loaded data
formatted_data = transform_data_for_neo4j(raw_data)

# Write the transformed data to the output file
with open('graph_optimized_data_v2.json', 'w', encoding = 'utf-8') as outfile:
    json.dump(formatted_data, outfile, ensure_ascii = False, indent=4)

print("Data has been transformed and saved to graph_optimized_data.json")
