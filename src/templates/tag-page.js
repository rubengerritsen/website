import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/home_layout"
import SEO from "../components/seo"
import PostLink from "../components/linksToPosts/post-link"

class TagPageTemplate extends React.Component {
  render() {
    const props = this.props
    const tag = this.props.pageContext.tag
    const Posts = this.props.data.allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          // title={`#${tag}`}
          title={`#${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
          keywords={[`${tag}`, `blog`, `gatsby`, `javascript`, `react`]}
        />
         <article className="post-content-blog page-template no-image">
        <header className="tag-page-head">
          <h1 className="page-head-title">#{tag}({props.data.allMarkdownRemark.totalCount})</h1>
        </header>
        <div className="grids-blog">
        {Posts}
      </div>
      </article>
    </Layout>
    )
  }
}

export default TagPageTemplate

export const pageQuery = graphql`
  query PostByTag($tag: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }, sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
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
