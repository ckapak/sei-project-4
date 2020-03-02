import React from 'react'
import axios from 'axios'
import PlaceCard from './PlaceCard'

class PlaceAll extends React.Component {

  state = {
    places: []
  }

  async componentDidMount()  {
    console.log('ComponentDidMount in Index has run')
    try {
      const response = await axios.get('/api/places')
      this.setState({ places: response.data })
      console.log(response)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {this.state.places.map(place =>( 
              <PlaceCard id={place.id} key={place.id} {...place}/>
            ))}
          </div>
        </div>
      </section>
    )
  }

}
export default PlaceAll