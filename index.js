const express = require("express");
const bodyparser = require("body-parser");
const jsonfile = require("jsonfile");
const db = require("./db/db.json");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/posts", (req, res) => {
  res.json(db);
});

app.get("/posts/:id", (req, res) => {
  let id = req.params.id;
  let post = db.find((post) => (post.id = id));
  if (!post) {
    res.json({ message: "not found any post related to your id" });
  } else {
    res.json(post);
  }
});

app.get("/posts-author/:author", (req, res) => {
  let author = req.params.author;
  let posts = db.find((posts) => posts.author == author);
  if (!posts) {
    res.json({ message: "not found any post related to your id" });
  } else {
    res.json(posts);
  }
});

app.get("/postform", (req, res) => {
  res.sendFile("views/postform.html", { root: __dirname });
});

app.get("/updateform", (req, res) => {
  res.sendFile("views/updateform.html", { root: __dirname });
});

app.post("/newpost", (req, res) => {
  const newPost = {
    id: db.length + 1,
    title: req.body.titel,
    content: req.body.content,
    category: req.body.category,
    tags: req.body.tags.split(","),
  };
  db.push(newPost);
  jsonfile.writeFile("./db/db.json", db, (err) => {
    if (err) {
      console.error(err);
      res.json({ message: "Error writing to db" });
    } else {
      res.json({
        message: `post added sucessfully! your post id is ${newPost.id}`,
      });
    }
  });
});

app.post("/updatepost", (req, res) => {
  let id = req.body.id;
  let post = db.find((post) => post.id == id);
  if (!post) {
    res.status(404).json({ message: "not found" });
  } else {
    post.title = req.body.titel;
    post.content = req.body.content;
    post.category = req.body.category;
    post.tags = req.body.tags.split(",");
    jsonfile.writeFile("./db/db.json", db, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message: "error writing to db",
        });
      } else {
        res.json({
          message: `post update success your id is ${id}`,
        });
      }
    });
  }
});

app.get("/deletepost/:id", (req, res) => {
  let id = req.params.id;
  let post = db.find((post) => post.id == id);

  if (!post) {
    res.status(404).json;
  } else {
    let index = db.indexOf(post);
    db.splice(index, 1);
    jsonfile.writeFile("./db/db.json", db, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message: "error writing to db",
        });
      } else {
        res.json({
          message: `post delete success your id is ${id}`,
        });
      }
    });
  }
});

app.listen(port, () => {
  console.log(`server is runing in port :${port}`);
});
