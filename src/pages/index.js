import React, { Component } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Searchbar from '../components/searchbar'
import Repositories from '../components/repositories'
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
    const loadMoreBtn = (
      <button className="btn btn-primary d-block mx-auto" onClick={this.onSubmit.bind(this, this.state.page)}>
        Load More
      </button>
    )
    
    return(
      <Layout>
      <SEO title="Home" />
      <h1>Gatsby and Github</h1>
      <p>Find information about your organisation from Github</p>

      <Searchbar
        name="organization"
        placeholder="Organization Name"
        state={this.state.organization}
        onChange={this.onChange.bind(this)}
        onClick={this.onSubmit.bind(this, 0)}/>

      <p className="mt-3 h4 text-center text-danger">{this.state.error}</p>

      <Repositories data={this.state.data} />

      { this.state.page * 12 < this.state.total ? loadMoreBtn : null }
      
    </Layout>
    )
  }
}

export default IndexPage
