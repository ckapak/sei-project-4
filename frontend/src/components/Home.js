// user inputs their postcode 
// clicks on multiple categories 
// filters through the list of places,
// page gives you a list of places

import React from 'react'
import Select from 'react-select'

class Home extends React.Component {

  state = {
    search_data: {
      postcode: '',
      choices: ['']
    }
  }

  options = [
    { value: 'desks', label: 'Desks'},
    { value: 'charging', label: 'Charging Point'},
    { value: 'cafe', label: 'Cafe onsite'},
    { value: 'sofas', label: 'Comfy sofas'},
    { value: 'wifi', label: 'Wifi'}
  ]
    
  handleMultiChange = (selected) => {
    const choices = selected ? selected.map(item => item.value) : []
    const search_data = { ...this.state.search_data, choices }
    this.setState({ search_data })
  } 

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const find_location = {
      ...this.state.data,
      postcode: this.state.data.postcode.replace(' ', ''),
    }
    this.props.history.push({
      pathname: '/places',
      search: '',
      state: { find_location }
    })
  }

    render() {
      // const { search_data } = this.state
      return (
        <>
          <h1>Find your place to be</h1>
          <hr />
          <form>
            <div className="field">
            <label className="label">Enter your postcode</label>
            <input
              type="text"
              className="input u-full-width user-input"
              placeholder="Postcode"
              onChange={this.handleChange}
              name="postcode"
              required={true}
              />
            </div>
            <div className="field">
              <label className="label">Select the facilities you need from the list below</label>
              <div className="control">
              <Select
                options={this.options}
                isMulti
                onChange={this.handleMultiChange} 
              />
              </div>
            </div> 
            <button className="button offset-by-three six columns btn-home">Search</button>
          </form>
        </>
      )
    }
  }

  export default Home

