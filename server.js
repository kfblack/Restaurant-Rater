const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {Storage} = require("@google-cloud/storage");
const logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
require('dotenv').config();
require("./config/database");
require("./config/passport");

const indexRouter = require('./routes/index');
const restaurantRouter = require('./routes/restaurants');
const reviewsRouter = require("./routes/reviews");
const commentsRouter = require("./routes/comments");

const storage = new Storage({
  keyFilename: `./assets/restaurant-rater-408717-aa329d5c86a8.json`,
})

const bucketName = 'restaurant_image'
const bucket = storage.bucket(bucketName)

bucket.upload(
  "./assets/maydanpic.jpeg",
  {
    destination: "bucket/maydanpic.jpeg",
  },
  function (err, file) {
    if (err) {
      console.error(`Error uploading image maydanpic.jpeg: ${err.message}`)
    } else {
      console.log(`Image maydanpic.jpeg uploaded to ${bucketName}.`)

        // file.makePublic(async function (err) {
        // if (err) {
        //   console.error(`Error making file public: ${err}`)
        // } else {
        //   console.log(`File ${file.name} is now public.`)
        //   const publicUrl = file.publicUrl()
        //   console.log(`Public URL for ${file.name}: ${publicUrl}`)
        // }
        // })
    }
  }
)



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

app.use('/', indexRouter);
app.use('/restaurants', restaurantRouter);
app.use("/", reviewsRouter);
app.use("/comments", commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
