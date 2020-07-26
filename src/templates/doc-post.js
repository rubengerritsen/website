import React, {Component} from "react"
import { graphql } from "gatsby"

import LayoutDocs from "../components/docs_layout"
import SEO from "../components/seo"
//import NextPrevious from '../components/NextPrevious';
import config from '../../config';

require(`katex/dist/katex.min.css`)

import "../style/normalize.css"
import "../style/all.scss"

const forcedNavOrder = config.sidebar.forcedNavOrder;


export default class MDRuntime extends Component {
  render() {

    const {data} = this.props;

    if (!data) {
      return null;
    }

    const {
      allMarkdownRemark,
      site: {
        siteMetadata: {title},
      },
    } = data;
    


    const navItems = allMarkdownRemark.edges
      .map(({ node }) => node.fields.slug)
      .filter(slug => slug !== '/')
      .sort()
      .reduce(
        (acc, cur) => {
          if (forcedNavOrder.find(url => url === cur)) {
            return { ...acc, [cur]: [cur] };
          }

          let prefix = cur.split('/')[1];

          if (config.gatsby && config.gatsby.trailingSlash) {
            prefix = prefix + '/';
          }

          if (prefix && forcedNavOrder.find(url => url === `/${prefix}`)) {
            return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] };
          } else {
            return { ...acc, items: [...acc.items, cur] };
          }
        },
        { items: [] }
      );

      const nav = forcedNavOrder
      .reduce((acc, cur) => {
        return acc.concat(navItems[cur]);
      }, [])
      .concat(navItems.items)
      .map(slug => {
        if (slug) {
          const { node } = allMarkdownRemark.edges.find(({ node }) => node.fields.slug === slug);

          return { title: node.fields.title, url: node.fields.slug };
        }
      });
      const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    console.log("toc")
    console.log(post.tableOfContents)

      return (
        <LayoutDocs tableOfContents={post.tableOfContents} {...this.props}>
          <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        
         <article
          className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
        >

<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML' async></script>
          <h1 className="post-title-docs">{post.frontmatter.title}</h1>
          <hr-title />
          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <footer className="post-content-footer">
            PUT PREVIOUS NEXT HERE!
          </footer>
        </article>
        </LayoutDocs>
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
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(docs)/"  }}) {
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

