import React from 'react'
import { Link } from 'react-router-dom'

const PlaceCard = ({ id, name, image, description }) => (

<Link to={`/places/${id}`}>
  <h1>{name}</h1>
  <img src={image} alt={name}/>
  <h1>{description}</h1>
</Link>
)

export default PlaceCard