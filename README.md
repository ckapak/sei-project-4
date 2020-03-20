# Find a quiet place to Bee Project

## Overview

This was my final project on the Software Engineering Immersive course at General Assembly.

## Brief

To plan and build a full-stack application by making my own backend and frontend in one-week. The app must use a Python Django API using Django REST to serve data from a Postgres database. This must incorporate a separate frontend which is built with React.

## Technologies

The app was built with:

- React
- Mapbox
- Bulma
- Python
- Django
- PostgreSQL
- PostGIS extension for supporting spatial features in the PostgreSQL database

## Deployment

This application was deployed on Heroku at https://study-places-ldn.herokuapp.com/

## Getting started

```
<!-- To install all the packages in the frontend directory: -->
$ yarn

<!-- To install all the packages in the root directory: -->
<!-- Install Django and a shell in the root directory -->
$ pip install pipenv
$ pipenv install django==2.2.10
$ pipenv shell

<!-- Create the postgreSQL database -->
$ pipenv install psycopg2-binary  
$ createdb sei-project-4

## Postgris

<!-- Migrate everything from the backend -->
$ python manage.py migrate

<!-- Seed your database by running the following command -->
$ python manage.py loaddata places/seeds.json jwt_auth/seeds.json facilities/seeds.json

<!-- To run the project on localhost:8000 type: -->
$ python manage.py runserver
```

## Website Architecture

The app is comprised of the following pages:

### Homepage

The user is able to search for the area they wish to study in by postcode and by multiple categories. 




Added PostGIS, which adds geographic object support to PostgreSQL, turning it into a spatial database. 

It meant changing the places model and using PointField for the location (a GeoDjango-specific geometric field for storing a GEOS Point object that represents a pair of longitude and latitude coordinates).

```
  location = models.PointField(null=True)
```
I changed the 'get all places' function in views

```
    def get(self, request):

      queryset = None 

      latitude = self.request.query_params.get('latitude', None)
      longitude = self.request.query_params.get('longitude', None)    
      if latitude is not None and longitude is not None:
        user_location = Point(float(longitude), float(latitude), srid=4326)
        queryset = Place.objects.annotate(distance=Distance('location', user_location)).order_by('distance')[0:3]
      else:
        queryset = Place.objects.all()

      postcode = self.request.query_params.get('postcode', None)
      if postcode is not None:
        queryset = queryset.filter(postcode__istartswith=postcode)

      facilities = self.request.query_params.get('facilities', None)
      if facilities is not None:
        queryset = queryset.filter(facilities__name__icontains=facilities)
      
      serialized_place = PopulatedPlaceSerializer(queryset, many=True)

      return Response(serialized_place.data)
```

### Register & Login

### Create a Place

### Map

### Comment

## Challenges & Future Improvements

