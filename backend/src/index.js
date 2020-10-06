const express = require("express");
const app = express();
const knex = require("./knex");
const getErrorResponse = require("./utils/getErrorResponse");

app.use(express.json());

app.get("/api/contacts", async (req, res) => {
  const contacts = await knex("contacts").select();

  res.json(contacts);
});

app.post("/api/contacts", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newContact = await knex("contacts")
      .insert({ name, email, phone })
      .returning("*");
    res.status(201).json(newContact[0]);
  } catch (error) {
    const errorResponse = getErrorResponse(error);

    res.status(400).json(errorResponse);
  }
});

app.put("/api/contacts/:id", async (req, res) => {
  const { name, email, phone } = req.body;

  const { id } = req.params;

  try {
    const updatedContact = await knex("contacts")
      .where("id", "=", id)
      .update({ name, email, phone })
      .returning("*");

    res.json(updatedContact[0]);
  } catch (error) {
    const errorResponse = getErrorResponse(error);

    res.status(400).json(errorResponse);
  }
});

app.delete("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;

  await knex("contacts").where("id", "=", id).delete();

  res.status(200).send();
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
