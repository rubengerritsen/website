import React from "react"
import { graphql, StaticQuery } from "gatsby"

import LayoutDocs from "../components/docs_layout"
import SEO from "../components/seo"

import "../style/normalize.css"
import "../style/all.scss"

const DocsPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <LayoutDocs title={siteTitle}>
      <SEO title="Docs" />
      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2>
            Landing page for the docs
          </h2>
          <p>
            Nothing here yet.
          </p>
        </div>
      </article>
    </LayoutDocs>
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
      relativePath: { eq: "pp_ruben_online.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/hobbyprojects/"  }}, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <DocsPage location={props.location} data={data} {...props} />
    )}
  />
)
