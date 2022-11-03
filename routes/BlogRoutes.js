const express = require('express')
const BlogController = require('../controllers/blogController');

const blogRouter = express.Router();

blogRouter.post('/', BlogController.createBlog)

blogRouter.get('/:blogId', BlogController.getBlog)

blogRouter.get('/', BlogController.getBlogs)

blogRouter.patch('/:id', BlogController.updateBlog)

blogRouter.delete('/:id', BlogController.deleteBlog)


module.exports = blogRouter;