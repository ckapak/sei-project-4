import React from 'react'
import axios from 'axios'
import MapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

class Map extends React.Component {

  state = {
    places: [],
    name: [],
    viewport: { 
      longitude: -0.118092, 
      latitude: 51.509865, 
      zoom: 12 
    }  
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/places')
      this.setState({ places: response.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log('mapszz')
    const { viewport } = this.state

    return (
      <MapGL {...viewport}
        mapboxApiAccessToken={mapboxToken}
        onViewportChange={viewport => this.setState({ viewport })}
        height={'100vh'}
        width={'100vw'}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >   
        {this.state.places.map(place => {
          console.log(place)
          return(
            <Marker 
            key={place.id}
            latitude={parseFloat(place.latitude)}
            longitude={parseFloat(place.longitude)}
            >
              <div>Place</div>
            </Marker>
          )})
        }
      </MapGL>
    )
  }
}

export default Map