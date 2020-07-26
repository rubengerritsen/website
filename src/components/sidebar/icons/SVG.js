import styled from '@emotion/styled';
import React from 'react';

const SVG = ({ children, viewBox }) => (
  <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
    {children}
  </StyledSVG>
);

const StyledSVG = styled.svg`
  fill: $dark-body-font;
  &:hover,
  &:focus {
    fill: $dark-primary;
  }
`;

export default SVG;
