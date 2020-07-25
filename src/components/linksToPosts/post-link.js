/* **********************************************
 * Post-link is a card like element that contains
 * a thumbnail, title, tags and a link to 
 * a markdown post 
 * *******************************************/

import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Tags from "../tag"

const PostLink = ({ post }) => (
  <article className="post-link">
    <Link to={post.fields.slug}>
      {!!post.frontmatter.thumbnail && (
        <Img fluid={post.frontmatter.thumbnail.childImageSharp.fluid} alt={post.frontmatter.title} className="post-link-image"/>
      )}
    </Link>
    <header>
      <div>
        <Tags tags={post.frontmatter.tags}/>
      </div>
      <h2 className="post-link-title">
        <Link to={post.fields.slug} className="post-link-blog">
          {post.frontmatter.title}
        </Link>
      </h2>
      <div className="post-link-meta" >{post.frontmatter.date}</div>
    </header>
  </article>
)
export default PostLink


