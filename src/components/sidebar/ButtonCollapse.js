import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import Add from './icons/Add';
import Icon from './icons/Icon';
import Minimize from './icons/Minimize';

const ButtonCollapse = ({ onClick, isCollapsed }) => {
  return (
    <button className="sidebarButton"
      onClick={onClick}
      aria-label="Toggle Subnavigation"
      title="Toggle Subnavigation"
    >
      {isCollapsed ? <Icon icon={<Add />} size={15} /> : <Icon icon={<Minimize />} size={15} />}
    </button>
  );
};

ButtonCollapse.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool
};

export default ButtonCollapse;
