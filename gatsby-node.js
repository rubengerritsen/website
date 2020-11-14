const path = require(`path`)
const _ = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const docPost = path.resolve('./src/templates/doc-post.js')

  return graphql(
    `
      {
        allMarkdownRemark(
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    const tagSet = new Set();

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      // Based on the slug (relative path we create either a blog or docs post)
      if (post.node.fields.slug.includes("docs")) {
        createPage({
          path: post.node.fields.slug,
          component: docPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        })
      } else if (post.node.fields.slug.includes("posts")) {
        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        })
      }
    })
    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}