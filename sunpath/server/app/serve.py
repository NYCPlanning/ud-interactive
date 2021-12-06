from dateutil import tz, parser
import requests
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin
from pysolar.solar import get_altitude, get_azimuth
from pysolar.radiation import get_radiation_direct

def altitude(location, date):
    d = parser.isoparse(date)
    return get_altitude(location['lat'], location['lon'], d)

def azimuth(location, date):
    d = parser.isoparse(date)
    return get_azimuth(location['lat'], location['lon'], d)

def radiation(location, date):
    alt = altitude(location, date)
    d = parser.isoparse(date)
    result = get_radiation_direct(d, alt)
    return result

api_version = '1.0.0'

app = Flask(__name__)
CORS(app)

@app.route('/v1/system/version', methods=['GET'])
@cross_origin(origin='*')
def get_version():
  response = jsonify({'version': api_version})
  return response

@app.route('/v1/sun', methods=['POST'])
@cross_origin(origin='*')
def get_solar_params():
    req = request.get_json()
    result = {
        'altitude': altitude(req['location'], req['date_time']),
        'azimuth': azimuth(req['location'], req['date_time']),
        'radiation': radiation(req['location'], req['date_time']),
    }
    response = jsonify(result)
    return response
