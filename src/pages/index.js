import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { TOKEN } from "../Token";

class IndexPage extends Component{
  state = {
    data: [],
    organization: "",
    error: ""
  }

  async onSubmit(e){
    e.preventDefault();

    const graphqlQuery = {
      query: `
        query { 
          organization(login: "${this.state.organization}"){
            repositories(first: 12) {
              totalCount
              nodes{
                id
                name
                description
                createdAt
                url
              }
            }
          }
        }
      `
    };

    const result = await fetch('https://api.github.com/graphql', {
      method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + TOKEN
        },
        body: JSON.stringify(graphqlQuery)
    });

    const resultData = await result.json()
    if(!resultData.data.organization){
      this.setState({ error: "Not Found" });
    }
    else{
      this.setState({ 
        data: resultData.data.organization.repositories.nodes,
        error: ""
     });
    }
  }

  onChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value} );
  }

  render(){
    console.log(this.state.data)
    return(
      <Layout>
      <SEO title="Home" />
      <h1>Gatsby and Github</h1>
      <p>Find information about your organisation from Github</p>
      <form className="form-inline" onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="organization"
            placeholder="Organization Name"
            value={this.state.organization}
            onChange={this.onChange.bind(this)} 
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
        
      </form>

      <p className="text-danger">{this.state.error}</p>

      <div className="row">
        {this.state.data.map(repo => {
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
    </Layout>
    )
  }
}

export default IndexPage
