import React, {useState, Link} from "react"
import { graphql, StaticQuery, useStaticQuery } from "gatsby"

import LayoutDocs from "../components/docs_layout"
import SEO from "../components/seo"


import "../style/normalize.css"
import "../style/all.scss"

const calculateTreeData = (edges, sidebarConfig) => {
  const originalData = sidebarConfig.ignoreIndex
    ? edges.filter(
        ({
          node: {
            fields: { slug }
          }
        }) => slug !== '/'
      )
    : edges;

  if (originalData.length === 0) {
    return { items: [] };
  }

  const tree = originalData.reduce(
    (
      accu,
      {
        node: {
          fields: { slug},
          frontmatter: {title}
        }
      }
    ) => {
      const parts = slug.slice(1,-1).split('/');
      let { items: prevItems } = accu;
      for (const part of parts.slice(1, -1)) {
        let tmp = prevItems.find(({ label }) => label === part);
        if (tmp) {
          if (!tmp.items) {
            tmp.items = [];
          }
        } else {
          tmp = { label: part, items: [] };
          prevItems.push(tmp);
        }
        prevItems = tmp.items;
      }
      const existingItem = prevItems.find(({ label }) => label === parts[parts.length - 1]);
      if (existingItem) {
        existingItem.url = slug;
        existingItem.title = title;
      } else {
        prevItems.push({
          label: parts[parts.length - 1],
          url: slug,
          items: [],
          title
        });
      }
      return accu;
    },
    { items: [] }
  );
  const forcedNavOrder = sidebarConfig.forcedNavOrder || [];
  const tmp = [...forcedNavOrder];
  tmp.reverse();
  return tmp.reduce((accu, slug) => {
    const parts = slug.slice(1,-1).split('/');
    let { items: prevItems } = accu;
    for (const part of parts.slice(1, -2)) {
      let tmp = prevItems.find(({ label }) => label === part);
      if (tmp) {
        if (!tmp.items) {
          tmp.items = [];
        }
      } else {
        tmp = { label: part, items: [] };
        prevItems.push(tmp);
      }
      prevItems = tmp.items;
    }
    // sort items alphabetically.
    prevItems.forEach(item => {
      item.items = item.items.sort(function(a, b) {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      });
    });
    const index = prevItems.findIndex(({ label }) => label === parts[parts.length - 1]);
    accu.items.unshift(prevItems.splice(index, 1)[0]);
    return accu;
  }, tree);
};


const DocsPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title;
  const { allSite, allMarkdownRemark } = data;
  const { sidebarConfig } = allSite.edges[0].node.siteMetadata;
  const [treeData] = useState(() => {
    return calculateTreeData(allMarkdownRemark.edges, sidebarConfig);
  });

  console.log(treeData);

  return (
    <LayoutDocs title={siteTitle}>
      <SEO title="Docs" />
     
      <article className="post-content page-template no-image">
      <h1 className="post-title-docs">
            Table Of Contents
          </h1>
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
    allSite {
      edges {
        node {
          siteMetadata {
            sidebarConfig {
              forcedNavOrder
              ignoreIndex
            }
          }
        }
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
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(docs)/"  }}, sort: { fields: [fields___slug], order: ASC }) {
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
      <DocsPage location={props.location} data={data} {...props} />
    )}
  />
)
