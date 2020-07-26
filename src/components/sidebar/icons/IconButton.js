import styled from '@emotion/styled';
import React from 'react';
import Icon from './Icon';

const IconButton = ({ onClick, label, icon, size }) => {
  return (
    <StyledIconButton type="button" onClick={onClick} aria-label={label} title={label}>
      <Icon icon={icon} size={size} />
    </StyledIconButton>
  );
};

const StyledIconButton = styled.button`
  color: $dark-body-font;
  cursor: pointer;
  font-size: 0.8rem;
  @include light-mode {
    color: $light-body-font;
  }
`;

export default IconButton;
