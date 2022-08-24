const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  id: Number,
  title: String,
  date: String,
  type: String,
  customer: String
})

module.exports = mongoose.model('Order', orderSchema)