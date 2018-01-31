const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const { Page } = require('../models');


router.get('/', function(req, res, next){
    // res.redirect('/');
    Page.findAll().then(function(pages) {
        res.render('index', {
            pages: pages
        });
    })

    // res.render('index');
})

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

// Page.belongsTo(User, {as: 'author'});

module.exports = router;
