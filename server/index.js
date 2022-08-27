const express = require('express')
const cors = require('cors')
const app = express();
const session = require('express-session')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

require('dotenv').config();
const port = process.env.PORT || 3000

// ROUTES
const userRoutes = require("./src/routes/userRoutes");
const chatRoutes = require("./src/routes/chatRoutes");

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use(morgan('dev'))

app.use(cors());

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.use(express.static('public'));

app.use("/api/user", userRoutes, cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept"
}));

app.use("/api/chat", chatRoutes, cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept"
}))

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
})

app.listen(port, () => {
    console.log(`Server is running on ${process.env.URL}:${process.env.PORT}`)
})