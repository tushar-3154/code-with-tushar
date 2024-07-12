const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const Cartitem=sequelize.define('cartitem',{
  id:{
    type:Sequelize.INTEGER  ,
    autoincrement:true,
    allownull:false,
    primarykey:true
  },
  quantity:Sequelize.INTEGER
})


module.exports=Cartitem;