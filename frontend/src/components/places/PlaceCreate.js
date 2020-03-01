import React from 'react'
import PlaceForm from './PlaceForm'
import axios from 'axios'

class PlaceCreate extends React.Component {

  state = {
    data: {
      name: '',
      address: '',
      postcode: '',
      image: '',
      description: '',
      choices: ['']
    },
    errors: {}
  }

  options = [
    { value: 'desks', label: 'Desks'},
    { value: 'charging', label: 'Charging Plugs'},
    { value: 'cafe', label: 'Cafe onsite'},
    { value: 'sofas', label: 'Comfy sofas'},
    { value: 'wifi', label: 'Wifi'}
  ]
    
  handleMultiChange = (selected) => {
    const choices = selected ? selected.map(item => item.value) : []
    this.setState({ choices })
  } 

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post('/api/places/', this.state.data)
      this.props.history.push(`/places/${data.id}`)
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1>Add a place to our database</h1>
          <PlaceForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleMultiChange={this.handleMultiChange}
            errors={this.state.errors}
          />
        </div>
      </section>
    )
  }
}

export default PlaceCreate