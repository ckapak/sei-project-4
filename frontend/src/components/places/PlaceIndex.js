import React from 'react'
import axios from 'axios'
import Card from './PlaceCard'
// import MapGL from 'react-map-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'

const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

class PlaceIndex extends React.Component {
  state = {
    places: [],
    viewport: {
      latitude: 51.5074,
      longitude: 0.1278
    }
  }

  async componentDidMount() {
    const findLocation = this.props.history.location.state.find_location
    // const first_place = this.state.places[0] ? this.state.places[0] : findLocation

    const shortPostcode = findLocation.postcode
      .replace(/[^a-z0-9]/gi, '')
      .slice(0, 3).toLowerCase()

      console.log(shortPostcode)

      const queries = [`postcode=${shortPostcode}`]
      for (const choice of findLocation.choices) {
        queries.push("facilities=" + choice)
      }
      
      const response = await axios.get(`/api/places?${queries.join('&')}`)

      console.log(response.data)

      this.setState({ places: response.data  })
  }

  convertPostcode = async (location) => {
    const resMap = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.postcode}.json?access_token=${mapboxToken}`
    )
    return {
      latitude: resMap.data.features[0].center[1],
      longitude: resMap.data.features[0].center[0],
    }
    // this.setState({
    //   ...this.state,
    //   viewport: {
    //     ...this.state.viewport,
    //     latitude: resMap.data.features[0].center[1],
    //     longitude: resMap.data.features[0].center[0],
    //     zoom: 12
    //   }
    // })
  }

  render() {
    return(
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {this.state.places.map(place =>( 
              <Card key={place.id} {...place}/>
            ))}
          </div>
        </div>
      </section>    )
  }
}

export default PlaceIndex