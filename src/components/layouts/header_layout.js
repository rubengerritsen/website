import React from "react"
import { Link } from "gatsby"


const HeaderLayout = props => {
  const { children } = props
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
              </div>
            </div>
          </a>
          <nav id="swup" className="site-head-right">
            <ul className="nav" >
              <li className="nav-home nav-current">
                <Link to={`/`}>Home</Link>
              </li>
              <li className="nav-tags" >
                <Link to={`/docs`}>Docs</Link>
              </li>
              <li className="nav-about" >
                <Link to={`/about`}>About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {children}
    </div>
  )
}

export default HeaderLayout
