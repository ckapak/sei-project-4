import React from 'react'
import axios from 'axios'
import PlaceCard from './PlaceCard'

class PlaceAll extends React.Component {

  state = {
    places: []
  }

  async componentDidMount()  {
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
          <div className="columns is-three-quarters is-mobile is-multiline">
            { this.props.history.location.state ? 
            <p> 
              Unfortunately we can't find anything in your area. Here are some alternatives:
            </p> 
            : null
            }
            {this.state.places.map(place =>( 
              <PlaceCard id={place.id} 
              key={place.id} 
              {...place}/>
            ))}
          </div>
        </div>
      </section>
    )
  }

}
export default PlaceAll