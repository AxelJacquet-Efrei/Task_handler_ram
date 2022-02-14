// server
const express           = require('express');
const app               = express();
const exphbs            = require('express-handlebars');
const server            = require('https').createServer(app);

// fs
const fs                = require('fs');

// config
const config            = require('./config/main.json');

// engine
app.engine('hbs', exphbs.engine({
    helpers: {
        json: function (context) { return JSON.stringify(context); }
    }
}));
app.set('view engine', 'hbs');

require('./controllers/example.controllers.js')(app);

const routes = fs.readdirSync('./routes').filter(file => file.endsWith('.js'));

for (const file of routes) {
	require(`./routes/${file}`)(app);
}

server.listen(config.server.port, () => {
    console.log('Website started! (%s:%i)', config.server.host, config.server.port);
});
