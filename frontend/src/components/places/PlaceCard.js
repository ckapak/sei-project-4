import React from 'react'
import { Link } from 'react-router-dom'

const PlaceCard = ({ id, name, image }) => (

<Link to={`/place/${id}`}>
  <div className="card">
    <div className="card-header">
      <h4 className="card-header-title">{name}</h4>
    </div>
    <div className="card-image">
      <figure className="image">
        <img src={image} alt={name}/>
      </figure>
    </div>
    {/* <div className="card-content">
      <h5 className="title is-6">{description}</h5>
    </div> */}
  </div>
</Link>
)

export default PlaceCard