import PropTypes from "prop-types"
import React from "react"

const Searchbar = ({ label, name, placeholder, state, onChange, onClick }) => (
  <div className="d-flex align-items-center">
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          className="form-control"
          type="text"
          name={name}
          placeholder={placeholder}
          value={state}
          onChange={onChange}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={onClick}>Search</button>
  </div>
)

Searchbar.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    state: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func
}

export default Searchbar
