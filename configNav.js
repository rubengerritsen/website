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
      '/docs/introduction/', // add trailing slash if enabled above
      '/docs/second/',
      '/docs/second/0codeblockSub/',
      '/docs/second/1codeblockSub/',
      '/docs/third/',
      '/docs/third/0codeblockSub/',
    ],
    links: [{ text: 'Google', link: 'https://google.com' }],
    frontline: false,
    ignoreIndex: true,
    title:
      "<a href='/docs'>Docs</a>",
  },
};


module.exports = config;
