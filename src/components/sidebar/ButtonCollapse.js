import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';

const ButtonCollapse = ({ onClick, isCollapsed }) => {
  return (
    <button className="sidebarButton"
      onClick={onClick}
      aria-label="Toggle Subnavigation"
      title="Toggle Subnavigation"
    >
      {isCollapsed ?   <ClosedSvg /> : <OpenedSvg />}
    </button>
  );
};

ButtonCollapse.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool
};

export default ButtonCollapse;
