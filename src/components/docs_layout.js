import React, { useState } from 'react';
import { Link } from "gatsby";
import styled from '@emotion/styled';
import LeftSidebar from './sidebar';
import RightSidebar from './RightSidebar';
import config from '../../configNav.js';

const LeftSideBarWidth = styled('div')`
  width: 298px;
  position: sticky;
  position: -webkit-sticky;
  position: -moz-sticky;
    top: 0;
    
`;

const RightSideBarWidth = styled('div')`
  position: sticky;
  position: -webkit-sticky;
  position: -moz-sticky;
    top: 0;
`;



const LayoutDocs = props => {
  const { title, children, location, tableOfContents } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  const [navOpen, setNavOpen] = useState(false);
  return (
    
    
    
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
    
    <header className="site-head site-head-docs">
        <div id="menu" className="site-head-container">
          <a
            className="nav-burger"
            href={`#menu`}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div> <div className="hamburger-text-menu-text hidden">Menu</div>
            </div>
          </a>
          <nav id="swup" className="site-head-right">
            <ul className="nav" role="menu">
              <li className="nav-home nav-current" role="menuitem">
                <Link to={`/`}>Home</Link>
              </li> 
              <li className="nav-tags" role="menuitem">
                <Link to={`/docs`}>Docs</Link>
              </li>
              <li className="nav-tags" role="menuitem">
                <Link to={`/projects`}>Projects</Link>
              </li>
              <li className="nav-tags" role="menuitem">
                <Link to={`/search`}>Search</Link>
              </li>
              <li className="nav-about" role="menuitem">
                <Link to={`/about`}>About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="wrapper">
          <LeftSideBarWidth className={'hiddenMobile'}>
            <LeftSidebar location={location} />
          </LeftSideBarWidth>
          {config.sidebar.title ? (
            <div
              className={'sidebarTitle sideBarShow'}
              dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
            />
          ) : null}

          <main className="site-content">      
            <div className="site-content-maxWidth">{children}</div>
          </main>

          {tableOfContents && (
            <RightSideBarWidth className={'hiddenMobile'}>
          <RightSidebar tableOfContents={tableOfContents} location={location} />
          </RightSideBarWidth>
        )}
        </div> 
        </div>
  )
}

export default LayoutDocs;
