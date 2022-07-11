const express = require('express')
const cors = require('cors')
const app = express();
const session = require('express-session')
const flash = require('connect-flash')
const morgan = require('morgan')

//  Not use in react
app.set('view engine', 'ejs')
//
 
require('dotenv').config();
const port = process.env.PORT || 3000

const { router } = require('./src/routes/routes')

// for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false })); 

app.use(express.static('public'));

app.use(cors());

app.use(morgan('dev'));

app.use(session({
    secret: 'enroll',
    resave: false,
    saveUninitialized: true,
  }))
app.use(flash());

app.use(express.static('public'));

app.use(router, cors({ origin: '*' }))

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
})

app.listen(port, () => {
    console.log(`Server is running on ${process.env.URL}:${process.env.PORT}`)
})