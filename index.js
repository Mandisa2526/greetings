import exphbs from 'express-handlebars';
import express from 'express';
import bodyParser from 'body-parser';
import GreetingsFactory from './greetings.factory.js';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';




let app = express();
const connectionString = process.env.DATABASE_URL || "postgres://mandisa_codex:gX9hgC7FD2sanFJOAAXIEPNgLUVS7TDz@dpg-cjic647jbvhs738fq9g0-a.oregon-postgres.render.com/greetings_routesdata?ssl=true";
const pgpInstant = pgPromise();
//const database = pgp(connectionString);
let greetingObject = GreetingsFactory();
//const data = query(database);


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

app.get('/', function (req, res) {
  res.render('home', {
    message: greetingObject.getMessage(),
    errorMsg: greetingObject.getError(),
    counts: greetingObject.getNameCount(),
    resetmessage: greetingObject.getResetMessage(),
    
  });
});
app.get('/greeted', function (req, res) {

  res.render('users', { names: greetingObject.getNamesGreeted() })
});

app.get('/greeted/:name', function (req, res) {

  res.render('count', {
    count: greetingObject.getGreetedCount(req.params.name),
    name: req.params.name,

  });
  //res.redirect('/greeted');
});
//async
app.post('/greet', async function (req, res) {
  greetingObject.greet(req.body.inputName, req.body.languageRadio);
  res.redirect('/');
  
});

let PORT = process.env.PORT || 3002;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});