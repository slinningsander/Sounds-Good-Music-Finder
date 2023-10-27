import requests
import os
import json

# Open a log file to log any issues
log_file = open("download_errors.log", "a")

with open('topAlbums_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

def download_image(url, filename):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(filename, 'wb') as f:
                f.write(response.content)
        else:
            print(f"Failed to download {url}")
            log_file.write(f"Failed with status code {response.status_code} for URL: {url}\n")
    except requests.RequestException as e:
        print(f"Error downloading {url} due to {e}")
        log_file.write(f"Error downloading {url} due to {e}\n")

def main():
    # Create a directory to store the images
    if not os.path.exists('coverart'):
        os.mkdir('coverart')
    
    counter = 1  # Initialize the counter
    
    # Iterate over the JSON and download images
    for artist, details in data.items():
        for album in details["albums"]:
            url = album["albumcover"]["#text"]
            filename = os.path.join('coverart', f"{counter}.png")
            download_image(url, filename)
            print(f"Downloaded image with filename {counter}.png...")
            counter += 1  # Increment the counter

if __name__ == "__main__":
    main()
    log_file.close()  # Close the log file when done
