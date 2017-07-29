const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');


// ***************  Demo of app sequencing ***************
//app.use((req, res, next) => { 
//    req.message = 'This message made it!';
//    next();
//});
//
//app.use((req, res, next) => { 
//    console.log(req.message);
//    next();
//});

// *************** Error generator of testing error handler ************
//app.use((req, res, next) => { 
//    console.log("Hello");
//    const err = new Error('Oh noes!');
//    err.status = 500;
//    next(err);
//});

app.use((req, res, next) => { 
    console.log("world");
    next();
});

app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
      res.render('index', { name });
    } else {
      res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
  res.render('card', { prompt: "Who is buried in Grant's tomb?", hint: "Think about whose tomb it is." });
});

app.get('/hello', (req, res) => {
  //res.render('hello', { name: req.cookies.username });
  // res.render('hello');
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/hello', (req, res) => {
  // send the cookie to the browser after form submission
  res.cookie('username', req.body.username);
  //res.render('hello', { name: req.body.username });
  // redirect to index page
  res.redirect('/');
});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});

app.get('/sandbox', (req, res) => {
    res.render('sandbox');
});

