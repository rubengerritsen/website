import React from "react"
import { graphql, StaticQuery } from "gatsby"
import HeaderLayout from "../components/layouts/header_layout"

// Import theme 
import "../style/all.scss"
import "../style/normalize.css"


const HomePage = ({ data }, location) => {
  return (
    <HeaderLayout title={data.site.siteMetadata.title}>
      <header className="page-head">
        <h2 className="page-head-title">
          Under Construction
          </h2>
        <p>There is some finished content under Docs though.</p>
      </header>
    </HeaderLayout>

  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <HomePage location={props.location} props data={data} {...props} />
    )}
  />
)