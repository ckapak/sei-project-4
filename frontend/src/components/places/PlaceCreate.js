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
      image:  null,
      description: '',
      choices: ['']
    }  
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

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleUpload = async ({ target: { files } }) => {
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'an5meedt')
    const res = await axios.post('https://api.cloudinary.com/v1_1/ckapak/image/upload', data)
    console.log(res)
    this.setState({ image: res.data.url }, () => {
      // callback function 
      this.handleChange({ target: { name: 'image', value: res.data.url } })
    })
  }


  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/places/', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/places/${res.data.id}`)
    } catch (err) {
      this.props.history.push('/notfound')
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
            handleUpload={this.handleUpload}
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