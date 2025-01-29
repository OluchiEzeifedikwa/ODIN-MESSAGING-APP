const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require("node:path");
const app = express();
const jwt = require('jsonwebtoken');
const passportjs = require('./passport');
const authLogin = require('./auth/routes/loginRouter');
const authSignup = require('./auth/routes/signupRouter');
const messageRouter = require('./messagingApp/routes/messageRouter');
const profileRouter = require('./messagingApp/routes/profileRouter');
const { cookieJwtAuth } = require('./cookieJWTAuth');
const addRouter = require('./auth/routes/addRouter')
const addController = require('./auth/controllers/addController')
const cookieParser = require('cookie-parser')

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'jok',
    // store: sessionStore,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(authLogin);
app.use(authSignup);
app.use(addRouter);
app.use(profileRouter);
app.use(cookieParser());
app.use(messageRouter);
app.use("/images", express.static("images"));




app.get('/', (req, res) => {
  res.render('../messagingApp/views/index');
})


app.get('/add', (req, res) => {
  res.render('../auth/views/welcome');
})

app.post('/add', cookieJwtAuth, addController.addControl)
  

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server listening at ${PORT}`)
})



