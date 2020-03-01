import React from 'react'
import Select from 'react-select'

const PlaceForm = ({ data, handleChange, handleSubmit, handleMultiChange, errors }) => (

  <div className="columns">

    <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter card">

      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className={`input ${errors.name ? 'is-danger' : ''}`}
            placeholder="e.g. The Breakfast Club"
            name="name"
            onChange={handleChange}
            value={data.name}
          />
        </div>
        {errors.name && <small className="help is-danger">{errors.name}</small>}
      </div>

      <div className="field">
        <label className="label">Address</label>
        <div className="control">
          <input
            className={`input ${errors.address ? 'is-danger' : ''}`}
            placeholder="Address"
            name="address"
            onChange={handleChange}
            value={data.address}
          />
        </div>
        {errors.address && <small className="help is-danger">{errors.address}</small>}
      </div>

      <div className="field">
        <label className="label">Postcode</label>
        <div className="control">
          <input
            className={`input ${errors.postcode ? 'is-danger' : ''}`}
            placeholder="Postcode"
            name="postcode"
            onChange={handleChange}
            value={data.postcode}
          />
        </div>
        {errors.postcode && <small className="help is-danger">{errors.postcode}</small>}
      </div>

      <div className="field">
        <label className="label">Image</label>
        <div className="control">
          <input
            className={`input ${errors.image ? 'is-danger' : ''}`}
            placeholder="Image"
            name="image"
            onChange={handleChange}
            value={data.image}
          />
        </div>
        {errors.image && <small className="help is-danger">{errors.image}</small>}
      </div>

      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={data.description}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Select the facilities from the dropdown below</label>
        <div className="control">
        <Select
          options={data.choices}
          isMulti
          onChange={handleMultiChange} 
          />
        </div>
      </div> 

      <div className="field">
        <div className="control">
          <button type="submit" className="button is-warning is-fullwidth">Add a place</button>
        </div>
      </div>
    </form>
  </div>
)

export default PlaceForm