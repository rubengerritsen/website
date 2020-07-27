import React, {Component} from "react"
import { graphql, Link } from "gatsby"

import LayoutDocs from "../components/docs_layout"
import NextPrevious from '../components/NextPrevious';
import SEO from "../components/seo"
//import NextPrevious from '../components/NextPrevious';
import config from '../../configNav';

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

          return { title: node.frontmatter.title, url: node.fields.slug };
        }
      });
      const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

      return (
        <LayoutDocs tableOfContents={post.tableOfContents} {...this.props}>
          <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        
         <article className={`post-content no-image`} >
         

          <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML' async></script>
          <div className="visibleMobile">&#8249;<Link to={`/docs`}>{" table of contents"}</Link> </div> 
          <h1 className="post-title-docs">{post.frontmatter.title}</h1>
          <hr-title />
          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <footer className="post-content-footer">
          <div className={'addPaddTopBottom'}>
          <NextPrevious markdownRemark={this.props.data.markdownRemark} nav={nav} />
        </div>
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
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
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
          }
        }
      }
    }
  }
`

