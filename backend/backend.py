from flask import Flask, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

def get_api_key():
   with open("./.gitignore/api_key.txt", "r") as file:
      return file.read().strip()
   
@app.route("/")
def get_weather():

   # Get data for specific city
   city = request.args.get("city")
   api_key = get_api_key() # My api key is located in a local file
   url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
   response = requests.get(url)
   weather_data = response.json()

   # Nonexistent city entered
   if "cod" in weather_data and weather_data["cod"] == "404":
      data = {
         "found_city": False
      }
      return data

   # Filter and return data 
   temperature_kelvin = weather_data["main"]["temp"]
   temperature_celsius = round(temperature_kelvin - 272.15, 2)
   wind_speed = weather_data["wind"]["speed"]
   sky_condition = weather_data["weather"][0]["id"]
   humidity = weather_data["main"]["humidity"]

   filtered_weather_data = {
      "found_city": True,
      "temperature": temperature_celsius,
      "wind_speed": wind_speed,
      "sky_condition": sky_condition,
      "humidity": humidity
   }
   return filtered_weather_data

if __name__ == "__main__":
   app.run(debug=True)