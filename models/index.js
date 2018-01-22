var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging : false
});

function urlFixer (title){
        // console.log("Title is "+title);
        if(title) {
            return title.replace(/\s+/g, '_').replace(/\W/g,'');
            // console.log("Title is now "+newTitle);
        } else {
            return Math.random().toString(36).substring(2,7);
        }
        // page.urlTitle = newTitle;
    }


const Page = db.define('page', {
    title : {type : Sequelize.STRING, allowNull : false},
    urlTitle : {type : Sequelize.STRING, allowNull : false, isURL : true},
    content : {type : Sequelize.TEXT, allowNull : false},
    status : {type : Sequelize.ENUM('open', 'closed')},
    date : {type : Sequelize.DATE, defaultValue : Sequelize.NOW} 
    }, 
    { getterMethods: { route() { return '/wiki/' + this.urlTitle.type; } }
})

Page.hook('beforeValidate', (page) => {
    page.urlTitle = urlFixer(page.title);
})
const User = db.define('user', {
    name : {type : Sequelize.STRING, allowNull : false},
    email : {type : Sequelize.STRING, allowNull : false, validate : {isEmail : true}}
})

module.exports = {
    Page : Page,
    User : User,
    db : db
}