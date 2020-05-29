import PropTypes from "prop-types"
import React from "react"

const Repositories = ({ data }) => (
    <div className="row">
        {data.map(repo => {
            return (
                <div className="col-12 col-md-6 col-lg-4" key={repo.id}>
                    <div className="card mb-3">
                        <div className="card-body">
                        <h5 className="card-title">{repo.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{repo.createdAt}</h6>
                        <p className="card-text">{repo.description}</p>
                        <a href={repo.url} className="card-link">Link</a>
                        </div>
                    </div>
                </div>
            )
        })}
  </div>
)

Repositories.propTypes = {
    data: PropTypes.array
}

export default Repositories
