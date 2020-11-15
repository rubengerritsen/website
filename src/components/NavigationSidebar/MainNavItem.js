import React from "react"
import SubNavItem from "./SubNavItem"
import { Link } from "gatsby"
import { Collapse } from "react-collapse"

const MainNavItem = ({ item, url }) => {
  const hasChildren = item.items && item.items.length > 0
  var subURL = ""
  if (url) {
    const parts = url.slice(1, -1).split("/")
    subURL = "/".concat(parts[0], "/", parts[1], "/")
  }

  if (url === item.url) {
    return (
      <li key={item.title}>
        <Link style={{ fontWeight: "700" }} to={item.url}>
          {item.title}
        </Link>
        <Collapse isOpened={item.url === subURL}>
          {hasChildren && (
            <ul>
              {item.items.map(child => (
                <SubNavItem item={child} url={url} />
              ))}
            </ul>
          )}
        </Collapse>
      </li>
    )
  } else {
    return (
      <li key={item.title}>
        <Link to={item.url}>{item.title}</Link>
        <Collapse isOpened={item.url === subURL}>
          {hasChildren && (
            <ul>
              {item.items.map(child => (
                <SubNavItem item={child} url={url} />
              ))}
            </ul>
          )}
        </Collapse>
      </li>
    )
  }
}

export default React.memo(MainNavItem)
