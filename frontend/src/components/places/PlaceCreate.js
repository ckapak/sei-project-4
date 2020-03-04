import React from 'react'
import PlaceForm from './PlaceForm'
// import { headers } from '../../lib/headers'
import Auth from '../../lib/auth'

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
    { value: 'desks', label: 'Desks' },
    { value: 'charging', label: 'Charging Plugs' },
    { value: 'cafe', label: 'Cafe onsite' },
    { value: 'sofas', label: 'Comfy sofas' },
    { value: 'wifi', label: 'Wifi' }
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
      const { data } = await axios.post('/api/places/', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/places/${data.id}`)
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    return (
      <section className="is-dark is-fullheight-with-navbar">
        <div className="hero-body">
          <PlaceForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            options={this.options}
            handleMultiChange={this.handleMultiChange}
            errors={this.state.errors}
          />
        </div>
      </section>
    )
  }
}

export default PlaceCreate