var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/Wikistack');

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlphanumeric: true
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        isUrl: true,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, { getterMethods : { 
            route : function(){
            var title = '/wiki/'+this.getDataValue('urlTitle');
            return title;
        } 
    }});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    }
});

function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

Page.hook('beforeValidate', function(page, options) {
  page.urlTitle = generateUrlTitle(page.title);
});

module.exports = {
  Page: Page,
  User: User
};
