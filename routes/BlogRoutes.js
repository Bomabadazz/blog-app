const express = require('express')
const passport = require('passport');
const BlogController = require('../controllers/blogController');

const blogRouter = express.Router();

blogRouter.post('/', passport.authenticate('jwt', { session: false  }), BlogController.createBlog)

blogRouter.get('/:blogId', BlogController.getBlog)

blogRouter.get('/', BlogController.getBlogs)

blogRouter.patch('/:id',passport.authenticate('jwt', { session: false  }), BlogController.updateBlog)

blogRouter.delete('/:id',passport.authenticate('jwt', { session: false  }), BlogController.deleteBlog)


module.exports = blogRouter;