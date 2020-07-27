const React = require('react');
const GlobalContextProvider = require('./src/components/context/GlobalContextProvider').default;

export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>{element}</GlobalContextProvider>
);
