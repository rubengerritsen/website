import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import Navigation from './Navigation';

import config from '../../../configNav.js';

const LeftSidebar = ({ navOpen }) => {
  return (
    <aside className="hiddenMobile sideBarAside" >
       {config.sidebar.title ? (
            <div
              className={'sidebarTitle'}
              dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
            />
          ) : null}
        <Navigation />
    </aside>
  );
};

LeftSidebar.propTypes = {
  navOpen: PropTypes.bool
};

export default React.memo(LeftSidebar);
