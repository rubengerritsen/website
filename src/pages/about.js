import React from "react"
import { graphql, StaticQuery } from "gatsby"
import HeaderLayout from "../components/layouts/header_layout"
import SEO from "../components/SEO"

// Import theme
import "../style/all.scss"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <HeaderLayout title={siteTitle}>
      <SEO title="About" />
      <article className={`post-content no-image`}>
        <h1 className="centerText">About</h1>
        <hr-title />
        <div className="centerText">
          {" "}
          Hi, I am a Ruben Gerritsen, a PhD student at the Eindhoven University
          of Technology. I work in the field of computational chemistry. To
          contact me send an email to r.h.j.gerritsen@tue.nl
        </div>
      </article>
    </HeaderLayout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    benchAccounting: file(relativePath: { eq: "assets/pp_ruben_online.png" }) {
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
