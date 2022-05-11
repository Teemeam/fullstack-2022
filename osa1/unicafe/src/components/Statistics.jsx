import React from 'react';

/* Components */
import { StatisticLine } from './StatisticLine.jsx';

export const Statistics = (props) => {
  const { good, neutral, bad } = props;
  return (
    <div>
      <h2>statistics</h2>
      { good > 0 || neutral > 0 || bad > 0
        ? <div>
          <StatisticLine text='good' value={ good }/>
          <StatisticLine text='neutral' value={ neutral }/>
          <StatisticLine text='bad' value={ bad }/>
          <StatisticLine text='all' value={ good + neutral + bad }/>
          <StatisticLine text='average' value={ (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad) }/>
          <StatisticLine text='positive' value={ `${ good / (good + neutral + bad) * 100 } %` }/>
        </div>
        : <div>
          <p>No feedback given</p>
        </div> }
    </div>
  );
};