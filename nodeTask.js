const express = require("express");
const app = express();

app.use(express.json());

//get
app.get("/", (req, res) => {
  res.send("Get method working well");
});

let todos = [];
//post
app.post("/todos", (req, res) => {
  todos.push(req.body);
  res.send(todos);
  console.log(req);
  res.status(204).end();
});
app.get("/todos", (req, res) => {
  res.json(todos);
});

//get with id
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => +todo.id === +id);
  if (!todo) {
    res.status(404).end();
    return;
  }
  res.json(todo);
});

//delete
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id != id);
  res.send(`user with id ${id} has been deleted`);
});
//patch
app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const new_data = req.body;
  console.log(new_data.title);
  for (let data of todos) {
    if (data.id == id) {
      if (new_data.title != null || undefined) data.title = new_data.title;
      return res
        .status(200)
        .json({ message: "Updated Succesfully", todos: data });
    }
  }
  res.status(404).json({ message: "Invalid Order Id" });
});

app.listen(3000);
