import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import NavItem from './NavItem';

/**
 * This File was inspired by https://github.com/hasura/gatsby-gitbook-starter
 */

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
  console.log("temp")
  console.log(tmp)
  return tmp.reduce((accu, slug) => {
    const parts = slug.slice(1,-1).split('/');
    console.log(parts)
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

const Navigation = () => {
  const result = useStaticQuery(graphql`
    query {
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
  `);
  const { allSite, allMarkdownRemark } = result;
  const { sidebarConfig } = allSite.edges[0].node.siteMetadata;
  const [treeData] = useState(() => {
    return calculateTreeData(allMarkdownRemark.edges, sidebarConfig);
  });
  return (
    <ul className={'sideBarUL'}>
      {treeData.items.map(item => (
        <NavItem key={item.url} item={item} />
      )) }
    </ul>
  );
};


export default React.memo(Navigation);
