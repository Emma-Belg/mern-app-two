const express = require('express');

const BlogPost = require('../models/blogModelAndSchema')
const router = express.Router();

router.get("/test", (req, res) => {
    res.json({message: "Welcome to the application."});
});

router.post('/save', (req, res) => {
    console.log('Body:', req.body);
    const data = req.body;

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({
                msg: 'There was an internal server error.'
            });
            return;
        }

        return res.json({
            msg: 'Your data has been saved.'
        });
    })


});

router.get('/', (req, res) => {
    BlogPost.find({})
        .then((data) => {
            console.log('Data:', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error:', error)
        });
});

module.exports = router;