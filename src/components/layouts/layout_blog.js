import React from "react"
import { Link } from "gatsby"
import RightSidebar from '../RightSidebar';
import styled from '@emotion/styled';


const Wrapper = styled('div')`
  display: flex;
  width: 100%
  justify-content: flex-start;
  background: $dark-bg;

  @media only screen and (max-width: 850px) {
    display: block;
  }
`;

const RightSideBarWidth = styled('div')`
  position: sticky;
  position: -webkit-sticky;
  position: -moz-sticky;
    top: 0;
    right: 0;
`;

const RightSideBarWidthFake = styled('div')`
visibility: hidden;
  position: sticky;
  position: -webkit-sticky;
  position: -moz-sticky;
    top: 0;
    right: 0;
`;



const Layout = props => {
  const { title, children, tableOfContents } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <header className="site-head">
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


      {tableOfContents && (
            <RightSideBarWidthFake className="hiddenMobile">
          <RightSidebar tableOfContents={tableOfContents} />
          </RightSideBarWidthFake>
      )}

      <main className="site-content">
      <div className="site-content-maxWidth-blog">{children}</div>
      </main>

      {tableOfContents && (
            <RightSideBarWidth className="hiddenMobile">
          <RightSidebar tableOfContents={tableOfContents} />
          </RightSideBarWidth>
      )}
      </div>

      <footer className="site-foot">
      <Link to={`/`}>{title}</Link> 
      </footer>

      
    </div>
  )
}

export default Layout
