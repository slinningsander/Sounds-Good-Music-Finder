import json
import requests


limit = "100"
api_key = "SECRET_KEY"

top_tags = {}

api_url = f"http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&limit={limit}&api_key={api_key}&format=json"
response = requests.get(api_url)
response.raise_for_status()
data = response.json()

for tags in data["tags"]["tag"]:
    tag = tags["name"]
    reach = int(tags["reach"])
    top_tags[tag] = {
        "reach": reach
    }

with open('top_tags.json', 'w', encoding='utf-8') as file:
    json.dump(top_tags, file, ensure_ascii=False, indent=4)
