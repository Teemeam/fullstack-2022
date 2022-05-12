import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [points, setPoints] = useState(new Uint8Array(7));
  const [selected, setSelected] = useState(0);

  const handleVote = () => {
    const copy = [ ...points ];
    copy[selected] += 1;
    setPoints(copy);
  }

  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * 7);
    setSelected(randomNumber);
  }

  const getAnecdoteWithMostVotes = () => {
    let copy = [ ...points ];
    copy.sort((a, b) => (a < b ? 1 : -1));
    const maxValue = copy[0];
    const maxIndex = points.findIndex((item) => item === maxValue);
    const anecdoteWithMostVotes = anecdotes[maxIndex];
    return (
      <>
        <p>{ anecdoteWithMostVotes }</p>
        <p>{ `has ${ maxValue } votes` }</p>
      </>
    );
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{ anecdotes[selected] }</p>
      <p>{ `has ${ points[selected] } votes` }</p>
      <button onClick={ () => handleVote() }>vote</button>
      <button onClick={ () => handleClick() }>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      { getAnecdoteWithMostVotes() }
    </div>
  )
}

export default App