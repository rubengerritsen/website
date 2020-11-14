import React from "react"
import HeaderLayout from "./header_layout.js"
import RightSidebar from '../RightSidebar';
import LeftSidebar from '../NavigationSidebar/LeftSidebar';

require("katex/dist/katex.min.css")


const DocsLayout = props => {
  const { children, tableOfContents, url } = props



  return (
    <HeaderLayout>
      <div className="wrapper2">
        <div className={'hiddenMobile'}>
          <LeftSidebar url={url} />
        </div>
        <main id="site-main" className="site-main site-main-maxWidth">
          <div>{children}</div>
        </main>
        {tableOfContents &&
          <div className={'hideRightSideBar'}>
            <RightSidebar tableOfContents={tableOfContents} />
          </div>}
      </div>
    </HeaderLayout >
  )
}

export default DocsLayout