import { useState } from "react";

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const setNextAnecdote = () => {
    let randomAnecdote;
    do {
      randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    } while (selected === randomAnecdote);

    setSelected(randomAnecdote);
  };

  const vote = () => {
    const pointsCopy = [...points];
    pointsCopy[selected] += 1;
    setPoints(pointsCopy);
  };

  return (
    <div>
      <h1>anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button onClick={vote} text="vote" />
      <Button onClick={setNextAnecdote} text="next anecdote" />

      <h1>anecdote with most votes</h1>
      {points.every((point) => point === 0) ? (
        <p>no votes yet. Start voting anecdotes</p>
      ) : (
        <Anecdote
          anecdote={anecdotes[points.indexOf(Math.max(...points))]}
          votes={Math.max(...points)}
        />
      )}
    </div>
  );
};

export default App;
