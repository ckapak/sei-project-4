import React from 'react'
import axios from 'axios'
import PlaceCard from './PlaceCard'

const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

class PlaceAll extends React.Component {

  state = {
    places: []
  }

  async componentDidMount() {
    // console.log(this.state.props.history.location)


    if (this.props.history.location.length > 0) {
      const postcode = this.props.history.location.state.postcode

      console.log('Using postcode: ' + postcode)
      const lnglat = await this.convertPostcode(postcode)
      const queries = [`longitude=${lnglat.longitude}`, `latitude=${lnglat.latitude}`]

      try {
        const response = await axios.get(`/api/places?${queries.join('&')}`)
        this.setState({ places: response.data })
        console.log(response)
      } catch (err) {
        this.props.history.push('/notfound')
      }
    } else {
      try {
        const response = await axios.get(`/api/places/`)
        this.setState({ places: response.data })
        console.log(response)
      } catch (err) {
        this.props.history.push('/notfound')
      }
    }
  }

  convertPostcode = async (postcode) => {
    const results = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${postcode}.json?access_token=${mapboxToken}`
    )

    const firstPlace = results.data.features
      .map(x => ({ name: x.place_name, lng: x.center[0], lat: x.center[1] }))
      .sort(x => x.name)[0]

    return {
      latitude: firstPlace.lat,
      longitude: firstPlace.lng,
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-three-quarters is-mobile is-multiline">
            {this.props.history.location.state ?
              <p className="container">
                Unfortunately we can't find anything in your area. Here are some alternatives:
            </p>
              : null
            }
            {this.state.places.map(place => (
              <PlaceCard id={place.id}
                key={place.id}
                {...place} />
            ))}
          </div>
        </div>
      </section>
    )
  }

}
export default PlaceAll