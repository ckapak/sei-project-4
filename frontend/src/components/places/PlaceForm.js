import React from 'react'
import Select from 'react-select'

const PlaceForm = ({ data, options, handleChange, handleSubmit, handleMultiChange, errors }) => {
  return (
    <section className="is-dark is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <form className="column is-half is-offset-one-quarter" onSubmit={handleSubmit}>
            <h2 className="title is-1 has-text-warning has-text-centered">Add a place to the Hive</h2>
            <div className="notification is-light">

              <div className="field">
                <div className="control">
                  <input
                    className={`input ${errors.name ? 'is-danger' : ''}`}
                    placeholder="e.g. The Breakfast Club"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                    required={true}
                  />
                </div>
                {errors.name && <small className="help is-danger">{errors.name}</small>}
              </div>

              <div className="field">
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
                    options={options}
                    isMulti
                    onChange={handleMultiChange}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-info is-rounded is-outlined is-medium is-fullwidth">Add a place</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
export default PlaceForm