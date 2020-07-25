import React, { Component } from "react";
import { Link } from "gatsby"
import Tags from "../tag"

export default props => (
  <article
    className={`post-card ${ (props.count % 4 === 0 || props.count % 5 === 0) && `post-card-large`} ${
      props.postClass
    } ${props.node.thumbnail ? `with-image` : `no-image`}`}
    style={
      props.node.thumbnail && {
        backgroundImage: `url(${
          props.node.thumbnail.childImageSharp.fluid.src
        })`,
      }
    }
  >
      {
        props.node.thumbnail
          ?(<ContentWithImage props={props}/>)
          :(<ContentNoImage props={props}/>)
      }
  </article>
)

class ContentNoImage extends Component {
  render() {
    const{props}=this.props;
    return (
      <div className="post-card-content">
        <div>
        <Link to={props.node.fields.slug} className="post-card-link">
          <h2 className="post-card-title">
            {props.node.title || props.node.fields.slug}
          </h2>
        </Link>
        </div>
        <div className="post-card-date">
        22-09-2020
        </div>
        <div className="post-card-body">
        {props.node.displayName || props.node.excerpt}
        </div>
        <div>
        <Link to={props.node.displayName} className="post-card-link post-card-readmore">
          {
            props.node.displayName || props.node.displayName
              ?("Read more")
              :(null)
          }
        </Link>
        </div>
      </div>
    );
  }
}

class ContentWithImage extends Component {
  render() {
    const{props}=this.props;
    return (
      <Link to={props.node.pageLink} className="post-card-link">
        <div className="post-card-content">
          <h2 className="post-card-title">
            {props.node.displayName || props.node.displayName}
          </h2>
        </div>
      </Link>
    );
  }
}