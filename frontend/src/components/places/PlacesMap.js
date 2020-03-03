import React from 'react'
import axios from 'axios'
import MapGL, { Marker, Popup } from 'react-map-gl'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

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
    },
    popupInfo: null
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
              <Link to={`/place/${place.id}`}>
                <FaMapMarkerAlt
                className="marker"
                src={place.name}
                // alt={place.name}
                onMouseOver={() => this.setState({ popupInfo: place })}
                onMouseOut={() => this.setState({ popupInfo: null })}
                />
              </Link>
            </Marker>
          )})}
          {this.state.popupInfo &&
            <Popup tipSize={5}
              anchor="bottom-right"
              closeButton={false}
              longitude={Number(this.state.popupInfo.longitude)}
              latitude={Number(this.state.popupInfo.latitude)}>
              <p>{this.state.popupInfo.name}</p>
            </Popup>
          }
      </MapGL>
    )
  }
}

export default Map