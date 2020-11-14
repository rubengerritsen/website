import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import MainNavItem from './MainNavItem';



const calculateTreeData = (edges) => {
  const originalData = edges;

  if (originalData.length === 0) {
    return { items: [] };
  }

  const tree = originalData.reduce(
    (
      accu,
      {
        node: {
          fields: { slug },
          frontmatter: { title }
        }
      }
    ) => {
      const parts = slug.slice(1, -1).split('/');
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
  return tree;

};


const Navigation = props => {
  const { url } = props;
  const result = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/docs/"  }}, sort: { fields: [fields___slug], order: ASC }) {
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
  `);
  const { allMarkdownRemark } = result;
  const [treeData] = useState(() => {
    return calculateTreeData(allMarkdownRemark.edges);
  });

  return (
    <ul className={'sideBarNav'}>
      {treeData.items.map(item => (
        <MainNavItem item={item} url={url} />
      ))}
    </ul>
  );
};


export default React.memo(Navigation);
