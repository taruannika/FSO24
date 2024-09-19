const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Parts = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);
  return <h3>Total of {total} exercises</h3>;
};

const Content = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Parts parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
};

const Course = ({ courses }) => {
  return (
    <>
      <Content courses={courses} />
    </>
  );
};

export default Course;
