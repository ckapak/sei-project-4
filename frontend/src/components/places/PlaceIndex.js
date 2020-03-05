import React from 'react'
import axios from 'axios'
import Card from './PlaceCard'
// import MapGL from 'react-map-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'
// const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

class PlaceIndex extends React.Component {
  state = {
    places: [],
    viewport: {
      latitude: 51.5074,
      longitude: 0.1278
    }
  }

  componentDidMount() {
    this.convertData()
  }

  checkResults = (places, postcode) => {
    const noResult = true

    if (!places.length) {
      this.props.history.push({
        pathname: '/places',
        search: '',
        state: { noResult, postcode }
      })
    }
  } 

  convertData = async() => {
    const location = this.props.history.location.state.find_location
    const postcode = location.postcode
    const shortPostcode = postcode
      .replace(/[^a-z0-9]/gi, '')
      .slice(0, 3).toLowerCase()

      const queries = [`postcode=${shortPostcode}`]

      for (const choice of location.choices.filter(x => x)) {
        queries.push("facilities=" + choice)
      }
      
      const response = await axios.get(`/api/places?${queries.join('&')}`)
      this.setState({ places: response.data })
      this.checkResults(response.data, postcode)
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
      </section>    
      )
  }
}

export default PlaceIndex