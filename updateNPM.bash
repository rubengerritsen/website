#!/bin/bash

for NAME in gatsby-remark-table-of-contents gatsby-transformer-sharp       gh-pages                       node-sass                      prettier                       prism-react-renderer           react                          react-collapse                 react-collapsible              react-dom
do
npm install "${NAME}@latest"
done