import PropTypes from "prop-types"
import React from "react"
import Moment from 'react-moment';

const Repositories = ({ data }) => (
    <div className="row">
        {data.map(repo => {
            return (
                <div className="col-12 col-md-6 col-lg-4" key={repo.id}>
                    <div className="card mb-3">
                        <div className="card-body">
                        <h5 className="card-title">{repo.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            <Moment format="MMM DD, YYYY">{repo.createdAt}</Moment>
                        </h6>
                        <p className="card-text">{repo.description}</p>
                        <a href={repo.url} className="card-link" target="_blank" rel="noreferrer">Link to Repo</a>
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
