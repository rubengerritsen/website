import styled from '@emotion/styled';
import React from 'react';
import Navigation from './Navigation';
import { Link } from 'gatsby';


const LeftSidebar = props => {
  const { url } = props
  return (
    <LeftSidebarWrapper>
      <aside className="hiddenMobile" >
        <Navigation url={url} />
      </aside>
    </LeftSidebarWrapper>
  );
};


const LeftSidebarWrapper = styled.aside`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 3.2em;
  left: 0;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 1rem;
  max-width: 350px;
  min-width: 150px;
  height: 95vh;
`;



const LeftSidebarTitle = styled.p`
& a {
  color: #000;
}
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-size: 1.8rem;
  font-weight: 600;
  width:inherit;
    max-width:inherit;
  
`;

export default LeftSidebar;