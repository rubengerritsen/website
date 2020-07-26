const siteParams = require("./siteParams")

const config = {
  gatsby: {
    pathPrefix: '/rubengerritsen/',
    siteUrl: siteParams.url,
    gaTrackingId: null,
    trailingSlash: false,
  },
  sidebar: {
    forcedNavOrder: [
      '/docs/introduction', // add trailing slash if enabled above
      '/docs/codeblock',
      '/docs/markd',
    ],
    links: [{ text: 'Google', link: 'https://google.com' }],
    frontline: false,
    ignoreIndex: true,
    title:
      "Pages",
  },
};


module.exports = config;
