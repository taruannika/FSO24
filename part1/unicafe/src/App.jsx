import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, allClicks }) => {
  const average = (good - bad) / allClicks;
  const positive = (good / allClicks) * 100;

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={allClicks} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const allClicks = good + neutral + bad;

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood((prev) => prev + 1)} text="good" />
      <Button onClick={() => setNeutral((prev) => prev + 1)} text="neutral" />
      <Button onClick={() => setBad((prev) => prev + 1)} text="bad" />
      <h1>statistics</h1>
      {allClicks <= 0 && <p>no feedback given</p>}
      {allClicks > 0 && (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          allClicks={allClicks}
        />
      )}
    </div>
  );
};

export default App;
