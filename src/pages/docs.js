import { graphql, StaticQuery } from "gatsby"
import React, { useState } from "react"
import DocsLayout from "../components/layouts/docs_layout.js"
import SEO from "../components/SEO"
// Import theme
import "../style/all.scss"

const calculateTreeData = edges => {
  const originalData = edges

  if (originalData.length === 0) {
    return { items: [] }
  }

  const tree = originalData.reduce(
    (
      accu,
      {
        node: {
          fields: { slug },
          frontmatter: { title },
        },
      }
    ) => {
      const parts = slug.slice(1, -1).split("/")
      let { items: prevItems } = accu
      for (const part of parts.slice(1, -1)) {
        let tmp = prevItems.find(({ label }) => label === part)
        if (tmp) {
          if (!tmp.items) {
            tmp.items = []
          }
        } else {
          tmp = { label: part, items: [] }
          prevItems.push(tmp)
        }
        prevItems = tmp.items
      }
      const existingItem = prevItems.find(
        ({ label }) => label === parts[parts.length - 1]
      )
      if (existingItem) {
        existingItem.url = slug
        existingItem.title = title
      } else {
        prevItems.push({
          label: parts[parts.length - 1],
          url: slug,
          items: [],
          title,
        })
      }
      return accu
    },
    { items: [] }
  )
  return tree
}

const AboutPage = ({ data }, location) => {
  const [treeData] = useState(() => {
    return calculateTreeData(data.allMarkdownRemark.edges)
  })

  return (
    <DocsLayout>
      <SEO title="Docs" keywords={["table of contents"]} />
      <article className={`post-content no-image`}>
        <h1 className="post-title-docs">Table Of Contents</h1>
        <hr-title />
        <div className="post-content-body tableOfContents">
          <ul>
            {treeData.items.map(child => (
              <li key={child.url}>
                <a href={child.url}>{child.title}</a>
                <ul>
                  {child.items.map(item => (
                    <li>
                      <a href={item.url}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </DocsLayout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(docs)/" } }
      sort: { fields: [fields___slug], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
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
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
