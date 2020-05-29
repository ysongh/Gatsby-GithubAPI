import React, { Component } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { TOKEN } from "../Token"

class IndexPage extends Component{
  state = {
    data: [],
    organization: "",
    error: "",
    page: 0,
    total: 0
  }

  async onSubmit(page){
    const graphqlQuery = {
      query: `
        query { 
          organization(login: "${this.state.organization}"){
            repositories(first: ${(page + 1) * 12}) {
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

    try{
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
        this.setState({ 
          data: [],
          error: "Not Found",
          page: 0,
          total: 0
        })
      }
      else{
        this.setState({ 
          data: resultData.data.organization.repositories.nodes,
          error: "",
          page: page + 1,
          total: resultData.data.organization.repositories.totalCount
        })
      }
    }
    catch(err){
      console.log(err)
    }
  }

  onChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value} );
  }

  render(){
    console.log(this.state.page, this.state.total)
    return(
      <Layout>
      <SEO title="Home" />
      <h1>Gatsby and Github</h1>
      <p>Find information about your organisation from Github</p>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          name="organization"
          placeholder="Organization Name"
          value={this.state.organization}
          onChange={this.onChange.bind(this)} 
        />
      </div>
      <button className="btn btn-primary" onClick={this.onSubmit.bind(this, 0)}>Search</button>

      <p className="mt-3 h4 text-center text-danger">{this.state.error}</p>

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

      {
        this.state.page * 12 < this.state.total ? (
          <button className="btn btn-primary d-block mx-auto" onClick={this.onSubmit.bind(this, this.state.page)}>
            Load More
          </button>
        ) : null
      }
      
    </Layout>
    )
  }
}

export default IndexPage
