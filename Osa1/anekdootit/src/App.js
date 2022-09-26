import { useState } from 'react'
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const BestAnecdote = ({ title, bestAnecdote, anecdotes }) => {
  return (
    <div>
      <h1> {title} </h1>
      {anecdotes[bestAnecdote]} 
    </div>
  )
}
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 
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
  const [selected, setSelected] = useState(0)
  const [vote, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [bestAnecdote, setbestAnecdote] = useState(0)
  const handleNext = () => {
    setSelected(randomInteger(0, anecdotes.length - 1))
  }
  const handleVote = () => {
    const copy = {...vote}
    copy[selected] += 1
    setVotes(copy)
    if (copy[selected] > vote[bestAnecdote]) {
      setbestAnecdote(selected)
    }
  }
  return (
    <div>
      <h1> Anecdote of the day </h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button handleClick={handleVote} text='vote'/>
      <Button handleClick={handleNext} text='next anecdote'/>
      <BestAnecdote title='Anecdote with most votes' bestAnecdote={bestAnecdote} anecdotes={anecdotes} />
        has {vote[bestAnecdote]} votes
    </div>
  )
}
export default App