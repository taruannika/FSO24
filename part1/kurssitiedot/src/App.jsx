const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);

  return <div>Number of exercises {total}</div>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const { name, parts } = course;

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
