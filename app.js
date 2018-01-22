'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const models = require('./models');
const chalk = require('chalk');
const routes = require('./routes');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/', routes);

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache : true});

app.use(morgan('dev'));

models.db.sync({force : true})
.then(function () {
    app.listen(3000, function () {
        console.log(chalk.blue('Server is listening on port 3000!'));
        chalk
    });
})
.catch(console.error);


// app.use(express.static(path.join(__dirname, '/public')));

