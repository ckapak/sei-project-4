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

        <section className="hero is-fullheight-with-navbar">

          <div className="hero-body">
            <div className="container">

              <p className="title is-1 has-text-warning has-text-centered">Find your place to Bee.LDN</p>
              <p className="has-text-white has-text-centered">Searching for a FREE place to study in London? Use our search below!</p>

                <form className="has-text-centered" onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label has-text-white has-text-centered">Enter your postcode here:</label>
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
                    <label className="label has-text-white has-text-centered">Select the facilities you require from the dropdown below:</label>
                    <div className="control column is-half is-offset-one-quarter card">
                      <Select
                        options={this.options}
                        isMulti
                        onChange={this.handleMultiChange}
                      />
                    </div>
                  </div>
                  <button className="button is-warning is-rounded is-medium is-one-quarter">Search</button>
                </form>

            </div>
          </div>

        </section>

    )
  }
}

export default Home

