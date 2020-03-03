import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class PlaceShow extends React.Component {

  state = {
    place: {},
    text: ''
  }

  async componentDidMount() {
    const placeId = this.props.match.params.id
    try {
      const response = await axios.get(`/api/places/${placeId}`)
      this.setState({
        place: response.data
      })
      console.log(response.data)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const placeId = this.props.match.params.id
    axios.post(`/api/places/${placeId}/comments/`, { text: this.state.text }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.setState({ place: res.data, text: '' })
      })
      .catch(err => console.log(err))
  }

  handleDelete = async () => {
    const placeId = this.props.match.params.id
    try {
      await axios.delete(`/api/places/${placeId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/places')
    } catch (err) {
      console.log(err.response)
    }
  }

//   isOwner = () => {
//     console.log(this.state.place.user)
//     return Auth.getPayload().sub === this.state.place.user.id
// }

  render() {
    if (!this.state.place.id)
      return null

    const { place } = this.state
    console.log(this.state.place)
    console.log(this.state.text, 'text')
    return (
      <section className="section show">
        <div className="container">
          <h2 className="title">{place.name}</h2>
          <h2 className="address">You'll find it here: {place.address}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
                <img src={place.image} alt={place.name} />
              </figure>
            </div>
            <div className="column is-half">
              <h4 className="title is-4">What we enjoy most about {place.name}</h4>
              <p>{place.description}</p>
              <hr />

              <h4 className="title is-4">The amenities</h4>
              <div className="facility-text">{place.facilities.map(facility =>
                <div key={facility.id}>
                  {facility.name}
                </div>)}</div>
                <hr />

              <form className="form title is-4" onSubmit={this.handleSubmit}>
                Tell us what you think!
                <hr />
                <textarea name="text" onChange={this.handleChange}
                  value={this.state.text}
                  placeholder="Type your comment here...maximum character length is 50"></textarea>
                <br />
                <input type="submit" value="Submit" />
              </form>

              <div className="comment-text">{place.comments.map(comment =>
                <div key={comment.id}>
                  <h2>{comment.text} - {comment.owner}</h2>
                </div>)}</div>
              <hr />

              {/* {this.isOwner() &&
                <>
                  <Link to={`/places/${place.id}/edit`} className="button is-warning">Edit</Link>
                  <button onClick={this.handleDelete} className="button is-danger">Delete</button>
                </>
              } */}

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default PlaceShow