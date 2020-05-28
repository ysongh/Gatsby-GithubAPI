import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { TOKEN } from "../Token";

class IndexPage extends Component{
  state = {
    organization: ""
  }

  async onSubmit(){
    const graphqlQuery = {
      query: `
        query { 
          organization(login: "${this.state.organization}"){
            id
            name
            url
            repositories(privacy: PUBLIC) {
              totalCount
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

    console.log(resultData)
  }

  onChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value} );
  }

  render(){
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
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
    )
  }
}

export default IndexPage
