import requests
import os
import json
import time

# JSON data with links (assuming it's loaded into a variable named 'artist_data')
with open("artist_links.json", "r", encoding="utf-8") as data:
    artist_data = json.load(data)

# Ensure there is a directory to save the images
os.makedirs("artist_images", exist_ok=True)
failed_downloads = []
# Iterate through the JSON data

def attempt_download(link, max_attempts=2):
    for attempt in range(max_attempts):
        try:
            response = requests.get(link)
            if response.status_code == 200:
                return response.content
            else:
                print(f"Attempt {attempt + 1} failed for {link}, Status Code: {response.status_code}")
        except Exception as e:
            print(f"Attempt {attempt + 1} error for {link}: {e}")
    time.sleep(3)  # Delay between retries
    return None

# Iterate through the JSON data
for artist, data in artist_data.items():
    if "link" in data:
        link = data["link"]
        # Add 'https:' to the link if it's missing
        if link.startswith("//"):
            link = "https:" + link
        
        content = attempt_download(link)
        if content:
            # Save the image
            file_path = os.path.join("artist_images", artist + ".jpg")
            with open(file_path, "wb") as file:
                file.write(content)
            print(f"Downloaded image for {artist}")
        else:
            print(f"Failed to download image for {artist} after retries.")
            failed_downloads.append(link)
    else:
        print(f"No image link available for {artist}")
        failed_downloads.append(f"{artist}: No link available")
    time.sleep(1)
# Write the failed downloads to a log file
with open("failed_downloads.log", "w") as log_file:
    for url in failed_downloads:
        log_file.write(url + "\n")

print("Finished downloading. Check failed_downloads.log for any failed downloads.")