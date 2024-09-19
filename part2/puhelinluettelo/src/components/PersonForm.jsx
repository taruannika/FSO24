const PersonForm = ({
  newName,
  handleNewName,
  phoneNumber,
  handlePhoneNumber,
  addPerson,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={phoneNumber} onChange={handlePhoneNumber} />
      </div>
      <div>
        <button onClick={addPerson} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
