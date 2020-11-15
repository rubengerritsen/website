import React, { Component } from "react"
import { graphql } from "gatsby"
import NextPrevious from '../components/NextPrevious';
import { Link } from 'gatsby';


import DocsLayout from "../components/layouts/docs_layout.js"
import "../style/normalize.css"
import "../style/all.scss"



export default class MDRuntime extends Component {
  render() {

    const { data } = this.props;

    if (!data) {
      return null;
    }

    const {
      allMarkdownRemark,
    } = data;

    const navItems = allMarkdownRemark.edges
      .map(({ node }) => node.fields.slug)
      .filter(slug => slug !== '/')
      .sort()
      .reduce(
        (acc, cur) => {

          return { ...acc, items: [...acc.items, cur] };

        },
        { items: [] }
      );

    const nav = []
      .reduce((acc, cur) => {
        return acc.concat(navItems[cur]);
      }, [])
      .concat(navItems.items)
      .map(slug => {
        if (slug) {
          const { node } = allMarkdownRemark.edges.find(({ node }) => node.fields.slug === slug);

          return { title: node.frontmatter.title, url: node.fields.slug };
        } else {
          return {};
        }
      });

    const post = this.props.data.markdownRemark

    return (
      <DocsLayout tableOfContents={post.tableOfContents} url={post.fields.slug} {...this.props}>
        <article className={`post-content no-image`} >
          <div className="visibleMobile">&#8249;<Link to={`/docs`}>{" table of contents"}</Link> </div>
          <h1 className="post-title-docs">{post.frontmatter.title}</h1>
          <hr-title />
          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <div className='addPaddTopBottom'>
            <NextPrevious markdownRemark={this.props.data.markdownRemark} nav={nav} />
          </div>
        </article>
      </DocsLayout>
    );
  }
}

export const pageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }){
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents(maxDepth: 2)
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(docs)/"  }}) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            tags
          }
        }
      }
    }
  }
`


