// custom typefaces
import "./src/style/all.scss"
import "typeface-montserrat"
import "typeface-merriweather"
import "typeface-nunito"
import "typeface-alegreya"

import React from 'react';
import GlobalContextProvider from './src/components/context/GlobalContextProvider';

export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>{element}</GlobalContextProvider>
);
