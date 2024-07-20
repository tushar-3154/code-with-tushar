const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const orderitem = sequelize.define('orderitem', {
  id: {
    type: Sequelize.INTEGER,
    autoincrement: true,
    allownull: false,
    primarykey: true
  }
})


module.exports = orderitem;