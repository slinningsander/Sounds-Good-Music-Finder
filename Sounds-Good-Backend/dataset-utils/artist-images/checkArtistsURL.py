import json
from bs4 import BeautifulSoup
import requests
import time

def get_modified_artist_names(artist_data):
    # Convert artist names to title case and replace spaces with underscores
    return [name.title().replace(" ", "_") for name in artist_data.keys()]

# Sample JSON data with artist information
with open("artists_data.json", "r", encoding="utf-8") as data:
    artist_data = json.load(data)

# Use the function to get modified artist names
modified_artist_names = get_modified_artist_names(artist_data)

print("ArtistName List created")

# URL of the Wikipedia page
base_url = "https://en.wikipedia.org/wiki/"

artist_image_link_list = {}

for artistName in modified_artist_names:
    urls_to_try = [artistName, artistName + "_(musician)", artistName + "_(rapper)", artistName + "_(band)"]
    
    for url in urls_to_try:
        response = requests.get(base_url + url)
        
        # Check if the request was successful
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            infobox_image_td = soup.find('td', class_='infobox-image')
            print("getting: " + url + " wiki")

            if infobox_image_td:
                first_img_tag = infobox_image_td.find('img')
                if first_img_tag:
                    print("getting: " + url + " image")
                    artist_image_link_list[artistName] = {
                        "link": first_img_tag['src']
                    }
                    break  # Exit the loop if an image is found
            
                else:
                    print(f"Image not found for {url}")
            else:
                print(f"Infobox not found for {url}")
        else:
            print(f"Failed to fetch data for {url}, trying next option...")

        if url == urls_to_try[-1]:  # If all options are exhausted
            artist_image_link_list[artistName] = {
                "link": "",
                "error": "link was not available. Will be added manualy"
            }
with open('artist_links.json', 'w', encoding='utf-8') as file:
    json.dump(artist_image_link_list, file, ensure_ascii=False, indent=4)