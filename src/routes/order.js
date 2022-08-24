const express = require('express')
const router = express.Router()
const Order = require('../models/order')

// /orders

// middleware 
router.use((req, res, next) => {
  console.log("Request recieved")
  next()
})

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200)
    res.json(orders)
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

// Get one order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({id: req.params.id}).exec()
    if (order) {
      res.status(200)
      res.json(order)
    } else {
      res.status(404).json({message: "Order not found"})
    }   
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

// Get order by date
router.get('/:type/:date', async (req, res) => {
  try{
    const orders = await Order.find({type: req.params.type, date: req.params.date})
    const order = await Order.findOne({type: req.params.type, date: req.params.date}).exec()
    if (order) {
      res.status(200)
      res.json({
        "type": orders[0].type,
        "count": orders.length,
        "orders": orders.map(order=> order.id),
        "related_customers": [...new Set (orders.map(order=> order.customer))]
      })
    } else {
      res.status(404).json({message: "Orders not found"})
    }   
  } catch (e) {
    res.status(500).json({message: e.message})
  }
})

// Post new order
router.post('/', async (req, res) => {
  const orders = await Order.find()
  const date =  new Date()
  const full_date = date.toISOString().split('T')[0].replaceAll('-', '')

  const order = new Order({
    id: orders.length + 1,
    title: req.body.title,
    date: req.body.date || full_date, //If date exists use custom date, else set todays date
    type: req.body.type,
    customer: req.body.customer
  })

  try {
    await order.save();
    res.status(201).json(order)
  } catch(e) {
    res.status(400).json({message: e.message})
  }
})

// Delete all orders
router.delete('/', async (req, res) => {
    await Order.deleteMany({})
    res.status(204)
    res.json({message: "Order's deleted"})
})

module.exports = router