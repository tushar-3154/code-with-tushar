const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

const mongoconnect = (callback) => {

  MongoClient.connect('mongodb+srv://solankitushar2177:FmUHqy9TaMngfXZR@products.cgsjav9.mongodb.net/?retryWrites=true&w=majority&appName=products'
  )
  
    .then(client => {
      console.log('Connected');
      _db=client.db();
      callback(client);
    })
    .catch(err => {
      console.log(err);
    })
}
const getdb=()=>{
  if(_db){
    return _db;
  }
  throw 'no database found';
}
exports.mongoconnect=mongoconnect;
exports.getdb=getdb;