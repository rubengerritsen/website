import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Tags from "./tag"

const PostLink = ({ post }) => (
  <article className="card-blog ">
    <Link to={post.fields.slug}>
      {!!post.frontmatter.thumbnail && (
        <Img fluid={post.frontmatter.thumbnail.childImageSharp.fluid} alt={post.frontmatter.title} className="post-blog-image"/>
      )}
    </Link>
    <header>
      <div>
        <Tags tags={post.frontmatter.tags}/>
      </div>
      <h2 className="post-title-blog">
        <Link to={post.fields.slug} className="post-link-blog">
          {post.frontmatter.title}
        </Link>
      </h2>
      <div className="post-meta-blog">{post.frontmatter.date}</div>
    </header>
  </article>
)
export default PostLink


