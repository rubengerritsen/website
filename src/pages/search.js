import React, { useState } from 'react';
import { Link, graphql } from "gatsby";

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostLink from "../components/post-link"

const BlogIndex = props => {
  
  const { data } = props
  const allPosts = data.allMarkdownRemark.edges
  const siteTitle = data.site.siteMetadata.title

  const emptyQuery = ""

  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = event => {
    console.log(event.target.value)
    const query = event.target.value
    const { data } = props

    const posts = data.allMarkdownRemark.edges || []

    const filteredData = posts.filter(post => {
      const { description, title, tags } = post.node.frontmatter
      return (
        description.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags &&
          tags
            .join("")
            .toLowerCase()
            .includes(query.toLowerCase())) ||
            post.node.rawMarkdownBody.toLowerCase().includes(query.toLowerCase())
      )
    })

    setState({
      query,
      filteredData,
    })
  }

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : allPosts

  const Posts = posts
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout title={siteTitle}>
        <SEO
          // title={`#${tag}`}
          title={`Search`}
          keywords={[`search`]}
        />
        <article className="post-content-blog page-template no-image">
      <h1 style={{ textAlign: `center` }}>Search</h1>

      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          aria-label="Search"
          placeholder="Type to search through posts..."
          onChange={handleInputChange}
        />
      </div>

      <div className="grids-blog">
        {Posts}
      </div>

      {posts.map(({ node }) => {
        const { excerpt } = node

        const { slug } = node.fields
        const { tags, title, date, description } = node.frontmatter
        return (
          <article key={slug}>
            <header>
              <h2>
                <Link to={slug}>{title}</Link>
              </h2>

              <p>{date}</p>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: description || excerpt,
                }}
              />
            </section>
            <hr />
          </article>
        )
      })}
      </article>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
            tags
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          rawMarkdownBody
          fields {
            slug
          }
        }
      }
    }
  }
`