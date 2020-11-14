
import React from 'react';
import { Link } from 'gatsby';



const SubNavItem = ({ item }) => {

  return (
    <li key={item.title}>
      <Link to={item.url}>
        {item.title}
      </Link>
    </li>
  );
};

export default React.memo(SubNavItem);
