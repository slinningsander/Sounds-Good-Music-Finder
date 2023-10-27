import json
import time

# Read from the first JSON file
with open('artists_data.json', 'r', encoding = 'utf-8') as file1:
    artists_data = json.load(file1)

# Read from the second JSON file
with open('top5_albums_data.json', 'r', encoding = 'utf-8') as file2:
    top5_albums_data = json.load(file2)

# Append the "listeners" and "bio_summary" properties to the second JSON
for artist_name, artist_data in artists_data.items():
    if artist_name in top5_albums_data:
        # Create a new dictionary for the artist
        updated_artist_data = {}
        
        # Insert "listeners" and "bio_summary" at the top
        updated_artist_data["listeners"] = artist_data["listeners"]
        updated_artist_data["bio_summary"] = artist_data["bio_summary"]

        # Insert the remaining data
        updated_artist_data.update(top5_albums_data[artist_name])

        # Update the artist's data in top5_albums_data
        top5_albums_data[artist_name] = updated_artist_data

        print(artist_name)

    time.sleep(1)

# Write the merged data back to the second JSON file (or a new file if you prefer)
with open('merged_data.json', 'w', encoding = 'utf-8') as file_out:
    json.dump(top5_albums_data, file_out, ensure_ascii = False, indent=4)

print("Data appended successfully!")