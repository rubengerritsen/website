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
overflow-x: hidden;
  overflow-y: auto;
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
    display: block;
`;

const RightSidebarTitle = styled.p`
  margin-top: 0;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const RightSidebarList = styled.ul`
  display: block;
  overflow: hidden;
  height: 100vh;
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
  list-style: none;
  & ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;


RightSidebar.propTypes = {
  tableOfContents: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default RightSidebar;
