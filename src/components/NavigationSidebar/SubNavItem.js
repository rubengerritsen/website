import React from "react"
import { Link } from "gatsby"

const SubNavItem = ({ item, url }) => {
  if (url === item.url) {
    return (
      <li key={item.title}>
        <Link style={{ fontWeight: "700" }} to={item.url}>
          {item.title}
        </Link>
      </li>
    )
  } else {
    return (
      <li key={item.title}>
        <Link to={item.url}>{item.title}</Link>
      </li>
    )
  }
}

export default React.memo(SubNavItem)
