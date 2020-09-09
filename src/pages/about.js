import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import LayoutHome from "../components/layouts/layout_home"
import SEO from "../components/seo"

import "../style/normalize.css"
import "../style/all.scss"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <LayoutHome title={siteTitle}>
      <SEO title="About" />
      <article className="post-content page-template no-image">
        <div className="post-content-body">

        </div>
      </article>
    </LayoutHome>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    benchAccounting: file(
      relativePath: { eq: "assets/pp_ruben_online.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
