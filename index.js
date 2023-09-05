import exphbs from 'express-handlebars';
import express from 'express';
import bodyParser from 'body-parser';
import GreetingsFactory from './greetings.factory.js';
import  session from 'express-session';
import flash from 'connect-flash';
import pgPromise from 'pg-promise';

// Create Database Connection
const pgp = pgPromise();
const connectionString = "postgres://mandisa_codex:gX9hgC7FD2sanFJOAAXIEPNgLUVS7TDz@dpg-cjic647jbvhs738fq9g0-a.oregon-postgres.render.com/greetings_routesdata?ssl=true";
const db = pgp(connectionString);

let app = express();
let greetingObject = GreetingsFactory(db);
//const data = query(database);

// initialise session middleware - flash-express depends on it
app.use(session({
  secret : "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


//configure handlebars
const handlebarSetup = exphbs.engine({
  partialsDir: "./views/partials",
  viewPath: './views',
  layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', async function (req, res) {
  res.render('home', {
    message: greetingObject.getMessage(),
    //errorMsg: greetingObject.getError(),
    counts: await greetingObject.getNameCount(),
    resetmessage: greetingObject.getResetMessage(),
  });
});

app.get('/greeted', async function (req, res) {
  let names = await greetingObject.getNamesGreeted();
  res.render('users', {
    names
  });
  
});

app.get('/greeted/:name', async function (req, res) {
  let result = await greetingObject.getGreetedCount(req.params.name);
  console.log(result);
  res.render('count', {
    count: result,
    name: req.params.name,
  });
});

app.get('/reset', async function (req,res){
    await greetingObject.reset();
    res.redirect('/');
});

app.post('/greet', async function (req, res) {
  await greetingObject.greet(req.body.inputName, req.body.languageRadio);
  res.redirect('/');
  
});

let PORT = process.env.PORT || 3002;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});