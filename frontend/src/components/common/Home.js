import React from 'react'
import Select from 'react-select'

class Home extends React.Component {

  state = {
    postcode: '',
    choices: ['']
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
        <section className="section hero-image">
          <div className="hero-body">
            <div className="columns is-centered">
              <div className="column is-half">


                <h2 className="has-text-centered is-info">Find your place to Bee</h2>
                

                <form onSubmit={this.handleSubmit} className="has-text-centered">
                  <div className="field">
                    <label className="label">Enter your postcode</label>
                    <input
                      type="text"
                      className="column is-half is-offset-one-quarter card"
                      placeholder="Postcode"
                      onChange={this.handleChange}
                      name="postcode"
                      required={true}
                    />
                  </div>

                  <div className="field">
                    <label className="label">Select the facilities you need from the list below</label>
                    <div className="control column is-half is-offset-one-quarter card">
                      <Select
                        options={this.options}
                        isMulti
                        onChange={this.handleMultiChange}
                      />
                    </div>
                  </div>

                  <button className="button is-warning is-rounded is-large is-one-quarter">Search</button>

                </form>

              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Home

