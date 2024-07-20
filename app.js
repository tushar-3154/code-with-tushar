const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const errorcontroller = require("./controllers/error");
const User = require('./models/user');
const mongoose=require('mongoose');
const session=require('express-session')
const mongodbtore=require('connect-mongodb-session')(session);
const csrf=require('csurf');
const flash=require('connect-flash');
const multer=require('multer');

const mongodburi='mongodb+srv://solankitushar2177:FmUHqy9TaMngfXZR@products.cgsjav9.mongodb.net/shop';

const app = express();

const store=new mongodbtore({
    uri:mongodburi,
    collection:'sessions'
});

const csrfprotection=csrf();

const filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')

    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toString()+ '-' + file.originalname);
    }
});

const filefilter=(req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype ==='image/jpeg'){
    cb(null,true)
    }
    else{
    cb(null,false)
}

}

app.set("view engine", "ejs");
app.set("views", "views");

const adminroutes = require("./routes/admin.js");
const shoproutes = require("./routes/shop.js");
const authroutes=require("./routes/auth.js");
const { error } = require("console");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(multer({ storage :filestorage , fileFilter:filefilter}).single('image'))
app.use(express.static(path.join(__dirname, "public")));
app.use('/images',express.static(path.join(__dirname, "images")));

app.use(
    session({ 
        secret:'my secret', 
        resave:false,
         saveUninitialized:false,
          store:store
        }),
)

app.use(csrfprotection);
app.use(flash());

app.use((req,res,next)=>{
    res.locals.isAuthenticated=req.session.isLoggendIn;
    res.locals.csrfToken=req.csrfToken();
    next();
})

app.use((req, res, next) => {
    // throw new Error('Sync Dummy');

    if (!req.session.user) {
        return next();
      }
    User.findById(req.session.user._id)
        .then(user => {
            // throw new Error('Dummy');
            if(!user){
                return next();
            }
            req.user=user;
            next();
        })
        .catch(err => {
           next(new Error(err));
        });
});



app.use("/admin", adminroutes);
app.use(shoproutes);
app.use(authroutes);

app.get('/500',errorcontroller.get500);
app.use(errorcontroller.get404);

app.use((error,req,res,next)=>{
    // res.redirect('/500');
    res.status(500).render("500", {
        pagetitle: "Error!",
        path: "//500",
        isAuthenticated: req.session.isLoggedIn
      });
})

mongoose.connect(mongodburi)
.then((result) => {
    app.listen(3000);    
}).catch((err) => {
    console.log(err);
});




// const path = require("path");
// const express = require("express");
// const bodyparser = require("body-parser");
// // const mongoose = require('mongoosoe');
// const errorcontroller = require("./controllers/error");
// const mongoconnect = require("./util/database").mongoconnect;
// const User = require('./models/user')
// const app = express();
// // const path = require('path');
// // app.set("views", path.join(__dirname , "views"));

// app.set("view engine", "ejs");
// app.set("views", "views");
// const adminroutes = require("./routes/admin.js");
// const shoproutes = require("./routes/shop.js");
// // const { Sequelize } = require("sequelize");

// app.use(bodyparser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));


// app.use((req, res, next) => {
//     User.findById('6694b4081895f8627b4a8f02')
//     .then(user => {
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         next();
//       })
//       .catch(err => console.log(err));


//         })
    

// app.use("/admin", adminroutes);
// app.use(shoproutes);

// app.use(errorcontroller.get404);

// mongoconnect(() => {
//     // console.log(client);
//     app.listen(3000);

// })

