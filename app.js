const path = require('path')
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session); //to create and use sessions
const { connectDB } = require('./database/mongodb');

const app = express();
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const roadmapRoutes = require('./routes/roadmap');
const thoughtsRoutes = require('./routes/thoughts');
const queueRoutes = require('./routes/queue');
const sfRoutes = require('./routes/success-failures')

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoStore({
    uri: process.env.MONGO_URI,
    collection: 'session'       //to store the session in a collection named sessions
});

app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.use(bodyParser.urlencoded({ extended: false }));    //for receiving through HTML forms
// app.use(bodyParser.json());  //for postman
app.use('/', authRoutes);   //for login and register
app.use('/todo', todoRoutes);
app.use('/roadmap', roadmapRoutes);
app.use('/thoughts', thoughtsRoutes);
app.use('/queue', queueRoutes);
app.use('/success-failures', sfRoutes);
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000

connectDB(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
})
