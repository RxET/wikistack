'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const models = require('./models');
const chalk = require('chalk');
// like an api... ish.
const routes = require('./routes');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


nunjucks.configure('views', {noCache : true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/', routes);


models.db.sync(
    {force : true}
)
.then(function () {
    app.listen(3000, function () {
        console.log(chalk.blue('Server is listening on port 3000!'));
        chalk
    });
})
.catch(console.error);


// app.use(express.static(path.join(__dirname, '/public')));

