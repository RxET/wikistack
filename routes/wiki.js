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
    // console.log(req.body);
    // res.json(req.body);

    var page = Page.build({
        title : req.body.title,
        content : req.body.content
    });

    page.save().then(instance => res.redirect(instance.urlTitle)).catch(next);
})

router.get('/add', function(req, res, next){
    res.render('addpage', { showform: true })
})

router.get('/:urlTitle', (req, res, next) => {
    // res.send('hit dynamic route at ' + req.params.urlTitle);

    Page.findOne( {
        where: {
            urlTitle: req.params.urlTitle
        }
    }).then(function(page) {
        res.render('wikipage', {
            page: page
        })
    }).catch(next);
    // res.render('wikipage', {urlTitle : req.params.urlTitle });
})

module.exports = router;
