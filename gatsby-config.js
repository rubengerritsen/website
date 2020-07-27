const siteParams = require("./siteParams")
const urljoin = require("url-join")
const sideParams = require("./configNav")
const { nodeModuleNameResolver } = require("typescript")

module.exports = {
  siteMetadata: {
    title: siteParams.name,
    description: siteParams.description,
    author: siteParams.author,
    siteUrl: urljoin(siteParams.url, siteParams.prefix),
    sidebarConfig: {
      forcedNavOrder: sideParams.sidebar.forcedNavOrder,
      ignoreIndex: false
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/home`,
        name: `data`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteParams.title,
        short_name: siteParams.shortName,
        start_url: `/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1360,
              withWebp: true,
              showCaptions: true,
              quality: 75,
            },
          },
          `gatsby-remark-bibliography`,
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          }, 
          `gatsby-remark-smartypants`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-katex`,
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: true,
              fromHeading: 1,
              toHeading: 3
            },
          },
          `gatsby-remark-prismjs`,
          'gatsby-plugin-emotion',
        ],
      },
    },
  ],
}
