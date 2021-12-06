from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class LocationModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f"Location(name={name}, latitude={latitude}, longitude={longitude})"

# if creating db for the FIRST TIME, make sure to run "db.create_all()" right here. 
# db.create_all()

location_put_args = reqparse.RequestParser() 
location_put_args.add_argument("name", type = str, help = "Name of the location is required", required = True)
location_put_args.add_argument("latitude", type = float, help = "Latitude of the location", required = True)
location_put_args.add_argument("longitude", type = float, help = "Longitude of the location", required = True)

location_update_args = reqparse.RequestParser()
location_update_args.add_argument("name", type = str, help = "Name of the location is required")
location_update_args.add_argument("latitude", type = float, help = "Latitude of the location")
location_update_args.add_argument("longitude", type = float, help = "Longitude of the location")

resource_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'latitude': fields.Float,
    'longitude': fields.Float
}

class Location(Resource):
    @marshal_with(resource_fields)
    def get(self, location_id):
        result = LocationModel.query.filter_by(id=location_id).first()
        if not result:
            abort(404, message="Could not find location with that ID...")
        return result

    @marshal_with(resource_fields)
    def put(self, location_id):
        args = location_put_args.parse_args()
        result = LocationModel.query.filter_by(id=location_id).first()
        if result:
            abort(409, message="Location id taken...")

        location = LocationModel(id=location_id, name=args['name'], latitude=args['latitude'], longitude=args['longitude'])
        db.session.add(location)
        db.session.commit()
        return location, 201

    @marshal_with(resource_fields)
    def patch(self, location_id):
        args = location_update_args.parse_args()
        result = LocationModel.query.filter_by(id=location_id).first()
        if not result:
            abort(404, message="Video doesn't exist, cannot update")
            
        if args['name']:
            result.name= args["name"]
        if args['latitude']:
            result.latitude= args["latitude"]
        if args['longitude']:
            result.longitude= args["longitude"]
        # db.session.add(result)
        db.session.commit()

        return result


    def delete(self, location_id):
        # abort_if_location_id_doesnt_exist(location_id)
        del locations[location_id]
        return "", 204


api.add_resource(Location, "/location/<int:location_id>")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
