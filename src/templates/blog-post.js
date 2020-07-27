import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/blog_layout"
import SEO from "../components/seo"


import "../style/normalize.css"
import "../style/all.scss"

require(`katex/dist/katex.min.css`)


class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title


    return (
      <Layout tableOfContents={post.tableOfContents} location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article
          className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
        >
        {!post.frontmatter.thumbnail && (
            <div className="post-thumbnail-blog">
              <h1 className="post-title">{post.frontmatter.title}</h1>
              <div className="post-meta">{post.frontmatter.date}</div>
            </div>
          )}
          {!!post.frontmatter.thumbnail && (
            <div className="post-thumbnail-blog" style={{backgroundImage: `url(${post.frontmatter.thumbnail.childImageSharp.fluid.src})`}}>
              <h1 className="post-title">{post.frontmatter.title}</h1>
              <div className="post-meta">{post.frontmatter.date}</div>
            </div>
          )}
<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML' async></script>
          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents(maxDepth: 2)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
`
