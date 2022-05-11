import React from 'react';

export const StatisticLine = (props) => {
  const { text, value } = props;
  return <p>{ `${ text } ${ value }` }</p>;
};