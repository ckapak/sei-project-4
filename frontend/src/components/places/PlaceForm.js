import React from 'react'
import Select from 'react-select'

const PlaceForm = ({ data, options, handleChange, handleSubmit, handleUpload, handleMultiChange }) => {
  return (
    <section className="is-dark is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <form className="column is-half is-offset-one-quarter" onSubmit={handleSubmit}>
            <h2 className="title is-1 has-text-warning has-text-centered is-family-code">Add a place to the Hive</h2>
            <div className="notification is-light">

              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    required
                    placeholder="Name of the place e.g. The Breakfast Club"
                    name="name"
                    onChange={handleChange}
                    // value={data.name}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    placeholder="Address"
                    name="address"
                    onChange={handleChange}
                    // value={data.address}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    placeholder="Postcode"
                    name="postcode"
                    onChange={handleChange}
                    // value={data.postcode}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="image"
                    placeholder="Image"
                    type="file"
                    name="image"
                    onChange={handleUpload}
                    // value={data.image}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    // value={data.description}
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
                  <button type="submit" className="button is-info is-rounded is-outlined is-medium is-fullwidth is-family-code">Add a place</button>
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