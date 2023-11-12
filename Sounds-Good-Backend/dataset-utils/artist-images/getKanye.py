import requests
from bs4 import BeautifulSoup

# URL of the Wikipedia page
url = "https://en.wikipedia.org/wiki/Kanye_West"

# Sending a request to the URL
response = requests.get(url)

# Parsing the content of the page
soup = BeautifulSoup(response.content, 'html.parser')

# Find the first <td> tag with class 'infobox-image'
infobox_image_td = soup.find('td', class_='infobox-image')

# If the <td> tag is found, find the first <img> tag within it
if infobox_image_td:
    first_img_tag = infobox_image_td.find('img')
    
    # If the <img> tag is found, print its 'src' attribute
    if first_img_tag:
        print(first_img_tag['src'])  # prints the src attribute of the first <img> tag within the 'infobox-image' <td> tag
