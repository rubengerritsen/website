import styled from '@emotion/styled';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const ListItem = ({ location, item }) => {
  return <ListItemLink to={location.pathname + item.url}>{item.title}</ListItemLink>;
};

const ListItemLink = styled(Link)`
  display: inline-block;
  padding: 0.2rem 0;
  width: 100%;
  color: ${p => p.theme.colors.text};
  text-decoration: none;
`;

ListItem.propTypes = {
  location: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default ListItem;
