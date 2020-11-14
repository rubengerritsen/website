import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import LayoutHome from "../components/layouts/layout_home"
import SEO from "../components/seo"
import PostLink from "../components/linksToPosts/post-link"

import "katex/dist/katex.min.css"

import "../style/normalize.css"
import "../style/all.scss"

const PostsPage = ({ data }) =>{
  const siteTitle = data.site.siteMetadata.title

  const Posts = data.allMarkdownRemark.edges
  .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
  .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <LayoutHome title={siteTitle}>
      <SEO
        title="Posts"
      />
      <article className="post-content-blog page-template no-image">
        <div className="page-head-title">
      <h2>Posts</h2>
      </div>
      <div className="grids-blog">
        {Posts}
      
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
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(posts)/"  }}, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
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
      <PostsPage location={props.location} data={data} {...props} />
    )}
  />
)