import requests
import math
from suncalc import get_position, get_times
from datetime import datetime

BASE = "http://127.0.0.1:5000/"

# DATABASE BUILT WITH FOLLOWING DATA: 
# data = [{"name": "Empire State Building", "latitude": 40.7484, "longitude": -73.9857},
#         {"name": "Eiffel Tower", "latitude": 48.8584, "longitude": 2.2945},
#         {"name": "Sydney Opera House", "latitude": -33.8568, "longitude": 151.2153}]

date = datetime.now()

for i in range(3):
        response = requests.get(BASE + "location/" + str(i))
        response_data = response.json() # json object returned by response_data
        print(response_data)
        currLocation = response_data['name'] # parse through json object for human readability...
        currLongitude = response_data['longitude']
        currLatitude = response_data['latitude']

        posArr = get_position(date, currLongitude, currLatitude) # suncalc function to get current sun position at given time, lon lat
        print("At the: " + currLocation + "... ")
        print("ALTITUDE is: " + str(posArr['altitude'] * 180/math.pi)) # have to change radian to degrees
        print("AZIMUTH is: " + str(180 + posArr['azimuth'] * 180/math.pi)) # have to add 180 to value if past 12:00 
        print()

# TO ADD TO DATABASE[i]:
# response = requests.put(BASE + "location/i", {'name': 'Empire State Building', 'latitude': 40.7484, 'longitude': -73.9857})

# TO UPDATE DATABASE[i]: 
# response = requests.patch(BASE + 'location/i', {"latitude": -33.8568, "longitude": 151.2153})
# print(response.json())

# TO DELETE OBJECTS[i]:
# response = requests.delete(BASE + 'location/i')