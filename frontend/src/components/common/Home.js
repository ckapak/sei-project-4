import React from 'react'
import Select from 'react-select'

class Home extends React.Component {

  state = {
    postcode: '',
    choices: ['']
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
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const find_location = {
      postcode: this.state.postcode.replace(' ', ''),
      choices: this.state.choices
    }
    this.props.history.push({
      pathname: '/places/search',
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
          <form onSubmit={this.handleSubmit}>
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

