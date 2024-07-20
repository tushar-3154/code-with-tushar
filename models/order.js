const mongoose=require('mongoose');
const products = require('./products');
const user = require('./user');
// const { MongoOIDCError } = require('mongodb');
const Schema=mongoose.Schema;

const oredrschema=new Schema({
    products:[
        {
            product:{type:Object ,required:true},
            quntity:{type:Number,required:true}

        }
    ],
    user:{
        name:{
            type:String,
            required:true
        },
        userid:{
            type:Schema.Types.ObjectId,
            // type:String,
            required:true,
            ref:'User'
        }
    }
});
module.exports=mongoose.model('order',oredrschema);