# Python script to fetch and write to a json all fonts provided by Google

import requests
import json

data = requests.get("https://www.googleapis.com/webfonts/v1/webfonts?key=YOUR_API_KEY").json()
data = data["items"]

fonts = list(map(lambda x: x["family"], data))

with open("gfonts.json", "w") as file:
    file.write(
        json.dumps(fonts, indent=4)
    )