const express = require('express')
const cors = require('cors')
const app = express();
const session = require('express-session')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

require('dotenv').config();
const port = process.env.PORT || 3000

// IMPORT ROUTES
const userRoutes = require("./src/routes/userRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const { socketConf } = require("./src/routes/socketioConfig.js")

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Configuration
app.use(express.static('public'));

app.use(morgan('dev'))

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept"
}));

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.use(express.static('public'));

// ROUTES
app.use("/api/user", userRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/message", messageRoutes);

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
})

// Server
const server = app.listen(port, () => {
    console.log(`Server is running on ${process.env.URL}:${process.env.PORT}`)
})

// Socket IO
const io = require("socket.io")(server, {
    pingTimeout : 60000,
    cors : {
        origin: "*",
    },
});

io.on("connection", socketConf);