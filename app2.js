const express = require("express");
const bodyparser = require("body-parser");
const { engine } = require("express-handlebars");

const app = express();
const users = [];

// Configure Handlebars as the template engine
app.engine("hbs", engine({ defaultLayout: "main-layout", extname: "hbs" }));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.render("index", { pagetitle: "Add User" });
});

app.get("/users", (req, res, next) => {
  res.render("users", {
    pagetitle: "User",
    users: users,
    hasuser: users.length > 0,
  });
});

app.post("/add-user", (req, res, next) => {
  users.push({ name: req.body.username });
  res.redirect("/users");
});

app.listen(3400, () => {
  console.log("Server is running on port 3400");
});

// const express = require("express");
// // const http = require("http");
// const bodyparser = require("body-parser");

// const expressHbs = require("express-handlebars");

// const app = express();
// const users = [];

// app.engine("hbs", expressHbs({ defaultLayout: "main-layout", extname: "hbs" }));
// app.set("view engine", "hbs");
// // const path = require("path");
// // app.set("views", path.join(__dirname, "views"));
// // app.set("view engine", "pug");
// app.set("views", "views");

// // app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: false }));
// app.get("/", (req, res, next) => {
//   res.render("index", { pagetitle: "Add User" });
// });

// app.get("/users", (req, res, next) => {
//   res.render("users", {
//     pagetitle: "user",
//     users: users,
//     hasuser: users.length > 0,
//   });
// });

// app.post("/add-user", (req, res, next) => {
//   users.push({ name: req.body.username });
//   res.redirect("/users");
// });
// // const server = http.createServer(app);
// app.listen(3400);
