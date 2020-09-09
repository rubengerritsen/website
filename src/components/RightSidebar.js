import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ListItem from './ListItem';

const RightSidebar = ({ tableOfContents}) => {
   return (
    <RightSidebarWrapper>
        <RightSidebarTitle>Contents</RightSidebarTitle>
        <RightSidebarList>
        <div
              dangerouslySetInnerHTML={{ __html: tableOfContents}}
            />
        </RightSidebarList>
    </RightSidebarWrapper>
  );
};


const RightSidebarWrapper = styled.aside`
  overflow: hidden;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  content-align: right;
  top: 0;
  right: 0;
  display: none;
  flex: 0 0 16rem;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem;
  max-width: 200px;
  min-width: 150px;
  height: 100vh;
    display: block;
`;

const RightSidebarTitle = styled.p`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const RightSidebarList = styled.ul`
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  height: 80vh;
  font-size: 1.3rem;
  margin: 0;
  padding: 0;
  list-style: none;
  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  & p{
    margin: 0;
    padding: 0;
    font-size: 1.3rem;
  }
  & li {
    margin:  2px 2px 2px 5px ;
    padding: 0em;
    font-size: 1.2rem;
  }
`;


RightSidebar.propTypes = {
  tableOfContents: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default RightSidebar;
