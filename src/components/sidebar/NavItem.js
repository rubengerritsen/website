import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React, { useContext } from 'react';
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider';
import ButtonCollapse from './ButtonCollapse';



const NavItem = ({ item }) => {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  
  const isCollapsed = state.collapsed[item.url];
  const hasChildren = item.items && item.items.length > 0;
  return (
    <li>
      <Link to={item.url} activeClassName="is-active">
        {item.title}
      </Link>

      {hasChildren && (
        <ButtonCollapse
          onClick={() => {
            dispatch({ type: 'TOGGLE_NAV_COLLAPSED', url: item.url });
          }}
          isCollapsed={isCollapsed}
        />
      )}
      {hasChildren && !isCollapsed && (
        <ul>
          {item.items.map(child => (
            <li key={child.url}>
              <Link to={child.url} activeClassName="is-active">
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      
    </li>
  );
};

export default React.memo(NavItem);
