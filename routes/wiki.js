const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

// const wikiRouter = require('./wiki');
// const userRouter = require('./user');

// router.use('/wiki', wikiRouter);
// router.use('/user', userRouter);

router.get('/', function(req, res, next){
    res.redirect('/');
    // res.render('wikipage')
})

router.post('/', function(req, res, next){
    console.log(req.body);
    res.json(req.body);

    var page = Page.build({
        title : req.body.title,
        content : req.body.content
    });

    var newTitle = '';

    function urlFixer (title){
        console.log("Title is "+title);
        if(title.includes(" ")) {
            newTitle = title.replace(/\s+/g, '_');
            console.log("Title is now "+newTitle);
        }
        page.urlTitle = newTitle;
    }

    urlFixer(page.title);    
    page.save();
    res.redirect('/');
})

router.get('/add', function(req, res, next){
    res.render('addpage', { showform: true })
})

module.exports = router;
