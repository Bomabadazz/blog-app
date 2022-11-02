const express = require('express')
const BlogController = require('../controllers/orderController');

const blogRouter = express.Router();

blogRouter.post('/', BlogController.createOrder)

blogRouter.get('/:blogId', BlogController.getOrder)

blogRouter.get('/', BlogController.getOrders)

blogRouter.patch('/:id', BlogController.updateOrder)

blogRouter.delete('/:id', BlogController.deleteOrder)


module.exports = blogRouter;