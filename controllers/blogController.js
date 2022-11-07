const { BlogModel } = require('../models')
const moment = require('moment');

exports.createBlog = async (req, res) => {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const blog = await BlogModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
    return res.json({ status: true, blog })
}

exports.getBlog = async (req, res) => {
    const { blogId } = req.params;
    const blog = await BlogModel.findById(blogId)

    if (!blog) {
        return res.status(404).json({ status: false, blog: null })
    }

    return res.json({ status: true, blog })
}

exports.getBlogs  = async (req, res) => {
    const { query } = req;

    const { 
        created_at, 
        state, 
        blog = 'asc', 
        blog_by = 'created_at', 
        page = 1, 
        per_page = 20 
    } = query;

    const findQuery = {};

    if (created_at) {
        findQuery.created_at = {
            $gt: moment(created_at).startOf('day').toDate(), 
            $lt: moment(created_at).endOf('day').toDate(),
        }
    } 

    if (state) {
        findQuery.state = state;
    }

    const sortQuery = {};

    const sortAttributes = blog_by.split(',')

    for (const attribute of sortAttributes) {
        if (blog === 'asc' && blog_by) {
            sortQuery[attribute] = 1
        }
    
        if (blog === 'desc' && blog_by) {
            sortQuery[attribute] = -1
        }
    }


    const blogs = await BlogModel
    .find(findQuery)
    .sort(sortQuery)
    .skip(page)
    .limit(per_page)

    return res.status(200).json({ status: true, blogs })
}

exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const blog = await BlogModel.findById(id)

    if (!blog) {
        return res.status(404).json({ status: false, blog: null })
    }

    if (state < blog.state) {
        return res.status(422).json({ status: false, blog: null, message: 'Invalid operation' })
    }

    blog.state = state;

    await blog.save()

    return res.json({ status: true, blog })
}

exports.deleteBlog = async (req, res) => {
    const { id } = req.params;

    const blog = await BlogModel.deleteOne({ _id: id})

    return res.json({ status: true, blog })
}
