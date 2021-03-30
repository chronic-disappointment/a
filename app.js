const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
require('./config/passport')(passport)
const expressSession = require('express-session');
const compression = require('compression');


let port = process.env.PORT || 7373;

const mainRouter = require('./routes/main');
const apiRouter = require('./routes/api');
const adminRouter = require('./routes/admin')
const loginRouter = require('./routes/login');

//mongodb connection
mongoose.connect('mongodb+srv://kadromnic:ml1999@cluster0.1x2xl.mongodb.net/articles?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true });
const db=mongoose.connection;
db.once('open',()=>{
    console.log('mongodb connected');
})
mongoose.set('toJSON', { virtuals: true });


//make the public folder available to public
app.use(express.static('public'));

//json res
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:false, limit:'50mb'}));

//compression
app.use(compression());

//ejs
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//css js
app.use(express.static(path.join(__dirname, 'views')));




// use express session  
app.use(expressSession({
    secret:'dsajfudshlfiuhasdouhifaiusdhfaisuhdfaiuhksdj',
    resave:true,
    saveUninitialized:true,
    cookie:{secure:false}
}));

//passport
app.use(passport.initialize());
app.use(passport.session());


app.listen(port,()=>{
    console.log(`listening port ${port}`)
})


app.use('/login',loginRouter);``
app.use('/admin',adminRouter);
app.use('/api',apiRouter);
app.use('/',mainRouter);