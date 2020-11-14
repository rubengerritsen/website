
import React, { useContext } from 'react';
import SubNavItem from './SubNavItem';
import { Link } from 'gatsby';
import { Collapse } from 'react-collapse';




const MainNavItem = ({ item, url }) => {
  const hasChildren = item.items && item.items.length > 0;
  var subURL = "";
  if (url) {
    const parts = url.slice(1, -1).split('/');
    subURL = "/".concat(parts[0], "/", parts[1], "/")
  }
  return (
    <li key={item.title}>
      <Link to={item.url}>
        {item.title}
      </Link>
      <Collapse isOpened={item.url === subURL}>
        {
          hasChildren && (
            <ul >
              {item.items.map(child => (
                <SubNavItem item={child} />
              ))}
            </ul>
          )
        }
      </Collapse>
    </li>
  );
};



export default React.memo(MainNavItem);
