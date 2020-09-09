import React from "react"
import { graphql, StaticQuery } from "gatsby"

import LayoutHome from "../components/layouts/layout_home"
import SEO from "../components/seo"


import PostCardSite from "../components/linksToPosts/postCardSite"

import "../style/normalize.css"
import "../style/all.scss"

// Needed for syntax highlighting
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

//Use postcards code
/*<div className="sub-pages">
      {sites.map(({ node }) => {
          postCounter++
          return (
            <PostCardSite
            key={node.displayName}
            pageLink={node.pageLink}
            count={postCounter}
            displayName ={node.displayName}
            node={node}
            postClass={`post`}
          />
          )
        })}
      </div> */


const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const sites = data.allSiteListJson.edges
  let postCounter = 0

  return (
    <LayoutHome title={siteTitle}>
      <SEO title="Home" keywords={[`quantum`, `chemistry`, `programming`, `projects` ]}/>
      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
          Under Construction
          </h2>
        </header>
      )}
      <article className="home">
      </article>
    </LayoutHome>
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
