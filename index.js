import exphbs from 'express-handlebars';
import express from 'express';
import bodyParser from 'body-parser';
import GreetingsFactory from './greetings.factory.js';

let app = express();
let greetingObject = GreetingsFactory();

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
    name: req.params.name});
  //res.redirect('/greeted');
});

app.post('/greet', function (req, res) {
  greetingObject.greet(req.body.inputName, req.body.billItemType);
  res.redirect('/');
});

let PORT = process.env.PORT || 3002;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});