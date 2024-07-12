const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const db = require("./util/database");
const errorcontroller = require("./controllers/error");
const Sequelize = require('./util/database');

const Product = require('./models/products');
const User = require('./models/user');

const app = express();
// const path = require('path');
// app.set("views", path.join(__dirname , "views"));

app.set("view engine", "ejs");
app.set("views", "views");
const adminroutes = require("./routes/admin.js");
const shoproutes = require("./routes/shop.js");
// const { Sequelize } = require("sequelize");
const Cart = require("./models/cart");
const Cartitem=require("./models/cart-item")


app.use((req,res,next)=>{
    User.findById(1)
    .then(user =>{
        req.user=user;
        next();

    })
    .catch(err => console.log(err));
})

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminroutes);
app.use(shoproutes);

app.use(errorcontroller.get404);

Product.belongsTo(User, { constraint: true, onDelete: 'CASECADE' })
User.hashMany(Product);
User.hashOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:Cartitem});
Product.belongsToMany(Cart,{through:Cartitem});
Sequelize
    .sync({ force: true })
    // .sync()
    .then(result => {
        return User.findById(1);

        // console.log(result);
        // app.listen(3000);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'MAX', email: 'test@test.com' })
        }
        return user;
    })
    .then(user => {
        console.log(user);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
// app.listen(3900);

// app.use("/", (req, res, next) => {
//     res.send("<h1>Hello from Express!</h1>");
//   });
// app.use((req, res, next) => {
//   console.log("in the middleware");
//   next(); //allows the  request to continue to the next middleware in line
// });
// app.use("/", (req, res, next) => {
//   console.log("this always runs");
//   next();
// });

// app.use("/add-product", (req, res, next) => {
//   res.send(
//     '<form action="/product" method="post"><input type="text" name ="title" ><button type="submit">Add Product</button></form>'
//   );
// });

// app.post("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });
