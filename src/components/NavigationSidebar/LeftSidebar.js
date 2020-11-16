import styled from "@emotion/styled"
import React from "react"
import Navigation from "./Navigation"

const LeftSidebar = props => {
  const { url } = props
  return (
    <LeftSidebarWrapper>
      <aside className="hiddenMobile">
        <Navigation url={url} />
      </aside>
    </LeftSidebarWrapper>
  )
}

const LeftSidebarWrapper = styled.aside`
  overflow: hidden;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 3.2em;
  left: 0;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 1rem;
  max-width: 280px;
  min-width: 150px;
  height: 90vh;
`

export default LeftSidebar
