import exphbs from 'express-handlebars';
import express from 'express';
import bodyParser from 'body-parser';
import GreetingsFactory from './greetings.factory.js';
import  session from 'express-session';
import flash from 'connect-flash';
import pgPromise from 'pg-promise';
import Query from './service/query.js';
//import dotenv from 'env';


// Create Database Connection
const pgp = pgPromise();
const connectionString = "postgres://mandisa_codex:gX9hgC7FD2sanFJOAAXIEPNgLUVS7TDz@dpg-cjic647jbvhs738fq9g0-a.oregon-postgres.render.com/greetings_routesdata?ssl=true";
const db = pgp(connectionString);

let database = Query(db);
let app = express();
let greetingObject = GreetingsFactory(db);
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

app.get('/', async function (req, res) {
  let counter = await database.countAll();
  console.log(counter.count);
   res.render('home', {
    errorMsg: greetingObject.getError(),
    languageGreet: greetingObject.getGreet(),
    counts: await database.countAll(),
    resetmessage: greetingObject.getSuccessMessage(),
  });
});

app.get('/greeted', async function (req, res) {
    let names = await database.selectNames()

  res.render('users', {
    names
  });
});

app.get('/greeted/:name', async function (req, res) {
  let greetedName = req.params.name
  let result = await database.userAndCount(greetedName);
  
  res.render('count', {
    result,
     greetedName
  });
  
});

app.get('/reset', async function (req,res){
    greetingObject.reset();
    await database.deleteAllUsers()
    res.redirect('/');
});

app.post('/', async function (req, res) {
  let radioBtn = req.body.languageRadio;
  let nameInput = req.body.inputName;

  greetingObject.setError(nameInput, radioBtn);
  greetingObject.setUserName(nameInput);
  greetingObject.setLanguage(radioBtn);
  if (greetingObject.getError() === undefined) {
    await database.inserTable(nameInput);
  }
  res.redirect('/');
  
});

let PORT = process.env.PORT || 3002;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});