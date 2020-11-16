import styled from "@emotion/styled"
import React from "react"

const RightSidebar = ({ tableOfContents }) => {
  return (
    <RightSidebarWrapper>
      <RightSidebarTitle>On this page</RightSidebarTitle>
      <RightSidebarList>
        <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
      </RightSidebarList>
    </RightSidebarWrapper>
  )
}

const RightSidebarWrapper = styled.aside`
  overflow: hidden;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 3.2em;
  display: block;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 1rem;
  max-width: 350px;
  min-width: 200px;
  max-height: 90vh;
  border-style: none none none solid;
  border-width: 1px;
  border-color: rgba(172, 172, 172, 0.323);
`

const RightSidebarTitle = styled.p`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-size: 1.5rem;
  font-weight: 400;
`

const RightSidebarList = styled.ul`
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 80vh;
  margin: 0;
  padding: 0;
  list-style: none;
  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  & p {
    margin: 0;
    padding: 0;
    font-size: 1.3rem;
  }
  & li {
    margin: 2px 2px 2px 8px;
    padding: 0em;
    font-size: 1.4rem;
  }
  & li li {
    padding: 0em;
    font-size: 1.2rem;
  }
  & li li a {
    color: #555454 !important;
    font-size: 1.2rem;
    padding: 0em;
  }
`

export default RightSidebar
