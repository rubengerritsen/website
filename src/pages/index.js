import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import PostCard from "../components/postCard"

import PostCardSite from "../components/postCardSite"

import "../style/normalize.css"
import "../style/all.scss"


const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const sites = data.allSiteListJson.edges
  let postCounter = 0

  return (
    <Layout title={siteTitle}>
      <SEO title="Home" keywords={[`quantum`, `chemistry`, `programming`, `projects`, ]}/>
      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            Welcome to Ruben's website!
          </h2>
          <p>
            It is still under construction, so there isn't much to see :(
          </p>
        </header>
      )}
      <article className="home">
      <div className="sub-pages">
      {sites.map(({ node }) => {
          postCounter++
          return (
            <PostCardSite
            key="fiets"
            pageLink={node.pageLink}
            count={postCounter}
            displayName ={node.displayName}
            node={node}
            postClass={`post`}
          />
          )
        })}
      </div>
      </article>
    </Layout>
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
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(blog)/"  }}, sort: { fields: [frontmatter___date], order: DESC }) {
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
  allSiteListJson{
      edges {
        node {
          displayName
          pageLink
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
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
