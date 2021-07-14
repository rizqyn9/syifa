require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const cookieParser = require("cookie-parser");
const MongoDBStore = require('connect-mongodb-session')(session)
const {auth} = require('./src/middlewares/isAuth')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const flash = require('connect-flash')
const bodyParser = require('body-parser')

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL


//! Rooutes
const auth_Routes = require('./src/routes/auth-route') 
const inAktif_Routes = require('./src/routes/inAktif-route')
const edit_Routes = require('./src/routes/edit-route')
const admin_Routes =require('./src/routes/admin-route')
const kategori_Routes = require('./src/routes/kategori-route')
const user_Routes =require('./src/routes/user-route')
const inTest_Routes = require('./src/routes/test-route')
const Kategori = require('./src/models/category')
const open_Routes = require('./src/routes/open-route')
const pinjam_Routes =require('./src/routes/pinjam-route')



// ! Connect to DB
mongoose.connect(DB_URL,{useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true , useFindAndModify: true})
    .then(()=> console.log("Database Connected"))
    .catch(err => console.log(err))

const store = new MongoDBStore({
    uri : DB_URL,
    collection: "session"
})

// ! Middleware
app.use(flash());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser());

// ! Template Engines
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressLayout)

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
    session({
        key: "user_sid",
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge:1000 * 60 * 60 * 24 // 1 Day
        },
    })
);

app.use('/auth',auth_Routes)

app.get('/dashboard', auth , async (req,res,next)=> {
    // console.log(req.session.user);
    // console.log(req.body);
    try {
        const total =  await Kategori.countDocuments()
        res.render('pages/dashboard',{
            userDetail : req.session.user,
            admin : req.body.Admin,
            totalKategori : total,
            title : "Dashboard",
            nav : "dashboard"
        })
        
    } catch (error) {
        console.log(error);
    }
})

app.use('/kategori', auth, kategori_Routes)
app.use('/open', auth, open_Routes)
app.use('/admin', auth, admin_Routes )
app.use('/inaktif',auth, inAktif_Routes)
app.use('/data',auth, edit_Routes)
app.use('/user',auth, user_Routes)
app.use('/pinjam', auth, pinjam_Routes)
app.use('/test', inTest_Routes)

app.use('/',(req,res,next) => {
    res.redirect('/auth')
})

app.listen(PORT, () => {
    console.log(`Running on : http://localhost:${PORT}`)
})
