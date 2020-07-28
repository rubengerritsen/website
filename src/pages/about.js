import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import LayoutHome from "../components/layouts/layout_home"
import SEO from "../components/seo"

import "../style/normalize.css"
import "../style/all.scss"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <LayoutHome title={siteTitle}>
      <SEO title="About" />
      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2>
            This is the website of Ruben Gerritsen
          </h2>
          <figure className="kg-card kg-image-card kg-width-about">
            <Img
              fluid={data.benchAccounting.childImageSharp.fluid}
              className="kg-image"
            />
          </figure>
          <h3 id="dynamic-styles">About me</h3>
          <p>
            I am a PhD student at the  Eindhoven University of Technology (<a href="https://tue.nl">TU/e</a>) with a background in chemical engineering and mathematics. 
            I work in the interdisciplinary <a href="https://www.baumeiergroup.com/">Baumeier Research Group</a> that focusses on the development of multiscale quantum-classical simulations for the study of complex molecular systems. 
          </p>
          <p>
            Besides doing research at the TU/e, I have many other interests. I like music, thinkering with stuff, plant biology, coding and many other things.
          </p>
          <h3 id="dynamic-styles">About this site</h3>
          <p>
            This site is meant as a place to document the different projects I do and share findings either related to my research at the TU/e or any of my other projects.
          </p>
        
        <h3 id ="dynamic-styles">Contact</h3>
        <p>
          If you want to contact me, send me an email via r.h.j.gerritsen(at)tue.nl.
        </p>
        </div>
      </article>
    </LayoutHome>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    benchAccounting: file(
      relativePath: { eq: "assets/pp_ruben_online.png" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
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
