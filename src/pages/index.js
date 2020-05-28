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

  async onSubmit(){
    const graphqlQuery = {
      query: `
        query { 
          organization(login: "${this.state.organization}"){
            repositories(first: 10) {
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
      <input
        type="text"
        name="organization"
        value={this.state.organization}
        onChange={this.onChange.bind(this)} 
      />
      <button onClick={this.onSubmit.bind(this)}>Search</button>
      <p>{this.state.error}</p>
      {this.state.data.map(repo => {
        return (
          <div key={repo.id}>
            <p>{repo.name}</p>
          </div>
        )
      })}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
    )
  }
}

export default IndexPage
