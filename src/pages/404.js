import React from "react"
import { graphql } from "gatsby"
import HeaderLayout from "../components/layouts/header_layout"


class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <HeaderLayout location={this.props.location} title={siteTitle}>
        <h1>404 Not Found</h1>
        <p>This page doesn&#39;t exist...</p>
      </HeaderLayout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
