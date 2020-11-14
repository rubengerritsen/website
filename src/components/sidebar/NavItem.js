
import { Link } from 'gatsby';
import React, { useContext } from 'react';
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider';
import ButtonCollapse from './ButtonCollapse';



const NavItem = ({ item, liStyle }) => {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);


  const isCollapsed = state.collapsed[item.url];
  const hasChildren = item.items && item.items.length > 0;
  return (
    <li className={liStyle}>
      <Link onClick={() => {
        dispatch({ type: 'SET_NAV_OPEN', url: item.url });
      }} to={item.url} activeClassName="is-active">
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
            <div>
              <NavItem key={child.url} item={child} className="sideBarLIPage" />
            </div>
          ))}
        </ul>
      )}

    </li>
  );
};

export default React.memo(NavItem);
