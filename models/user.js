const Sequalize=require('sequelize');

const sequalize=require('../util/database');

const User=sequalize.define('user',{
    id:{
        type:Sequalize.INTEGER,
        autoincrement:true,
        allownull:false,
        primarykey:true


    },
    name:Sequalize.STRING,
    email:Sequalize.STRING
})
module.exports=User;