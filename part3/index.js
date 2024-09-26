const express = require("express");
require("dotenv").config();
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Locelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> <br> <p>${date}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    return res.status(200).json(person);
  }
  return res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name or number missing" });
  }
  const nameExists = persons.find((person) => person.name === body.name);
  if (nameExists) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  const maxId =
    persons.length > 0
      ? Math.max(...persons.map((person) => Number(person.id)))
      : 0;

  const person = {
    name: body.name,
    number: body.number,
    id: maxId + 1,
  };

  persons = [...persons, person];
  res.status(200).json(person);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
