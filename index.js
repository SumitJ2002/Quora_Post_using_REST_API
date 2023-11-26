const express = require("express");
const { copyFileSync } = require("fs");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
// Parsing the static file like css and js
app.use(express.urlencoded({ extended: true }));

let posts = [
  {
    id: uuidv4(),
    username: "sumitjaiswar",
    content: "Hello my name is sumit jaiswar",
  },
  {
    id: uuidv4(),
    username: "harshkamble",
    content: "Hello my name is harsh kamble",
  },
  {
    id: uuidv4(),
    username: "virendrakalwar",
    content: "Hello my name is virendra kalwar",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.listen(port, () => {
  console.log(`Your app is listening on ${port}`);
});
