import React from 'react'
import axios from 'axios'

class PlaceAll extends React.Component {

  state = {
    data: {
      name: '',
      image: '',
      address: ''
    }
  }

  getData = async() => {
    try {
      const { data } = await axios.get('api/places/')
      this.setState({ data })
    } catch(err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { data } = this.state
    return(
      <>
        <h1>Index Page</h1>
        {
          data.length && data.map(data => {
            return <div key={data.id}>
              <p>{data.name}</p>
              <img src={data.image} alt={data.name}/>        
              <p>{data.address}</p>   
              </div>
          })
        }
      </>
    )}

}
export default PlaceAll