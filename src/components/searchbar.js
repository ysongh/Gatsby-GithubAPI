import PropTypes from "prop-types"
import React from "react"

const Searchbar = ({ name, placeholder, state, onChange, onClick }) => (
  <div>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          name={name}
          placeholder={placeholder}
          value={state}
          onChange={onChange}
        />
      </div>
      <button className="btn btn-primary" onClick={onClick}>Search</button>
  </div>
)

Searchbar.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    state: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func
}

export default Searchbar
