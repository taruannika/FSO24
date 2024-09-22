const Person = ({ person, deletePerson }) => {
  const { name, number } = person;

  return (
    <p>
      {name} {number}
      <button onClick={() => deletePerson(person.id)}>Delete</button>
    </p>
  );
};

export default Person;
