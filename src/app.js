// path node core module
const path = require('path');

const fs = require('fs');
const https = require('https');
// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.programwithnish.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.programwithnish.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.programwithnish.com/chain.pem', 'utf8');
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


// require module for cookies :
const cookieParser = require('cookie-parser');

//express
const express = require('express');
const app = express();

// express-handlebars template scripting
const exphbs = require('express-handlebars');

//database 
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//for managing external configuration
const dotenv = require('dotenv');

console.log(__dirname);
dotenv.config();

//router file import
const router = require('./router')


var hbs = exphbs.create({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      section: function(name, options) { 
        if (!this._sections) this._sections = {};
          this._sections[name] = options.fn(this); 
          return null;
        }
    }    
  });

//middleware functions
app.use(express.urlencoded({extended: false}));
app.use(express.json() );
app.use(express.static('public'));
app.engine('hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(cookieParser('some_secret_1234'));

//router
app.use('/',router);


//connecting to database
mongoose.connect(process.env.DB_CONNECT, 
{ useUnifiedTopology: true, useNewUrlParser: true  },
() =>console.log("connected to DB"));


// app.listen(80,() => {

// console.log('server listening 80');
 
// });

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(80, () => {
	console.log('HTTPS Server running on port 443');
});