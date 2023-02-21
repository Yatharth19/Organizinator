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

// app.get('/', (req, res) => {
//     // res.send('<h1>hi</h1>')
//     res.render('./auth/login', {
//         pageTitle: 'Login'
//     })
// });

// app.get('/dashboard', (req, res) => {
//     res.render('./auth/dashboard', {
//         pageTitle: 'Dashboard'
//     })
// });

// app.get('/register', (req, res) => {
//     res.render('./auth/register', {
//         pageTitle: 'Register'
//     })
// });

// app.get('/todo', (req, res) => {
//     res.render('./functionalities/todo', {
//         pageTitle: 'To-do'
//     });
// });

// app.get('/roadmap', (req, res) => {
//     res.render('./functionalities/roadmap', {
//         pageTitle: 'Roadmap'
//     });
// });

// app.get('/success-failure', (req, res) => {
//     res.render('./functionalities/success-failure', {
//         pageTitle: 'Success-Failure'
//     });
// });

// app.get('/targets', (req, res) => {
//     res.render('./functionalities/targets', {
//         pageTitle: 'Targets'
//     });
// });

// app.get('/thoughts', (req, res) => {
//     res.render('./functionalities/thoughts', {
//         pageTitle: 'Thoughts'
//     });
// });


const port = process.env.PORT || 3000

connectDB(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
})


// const start = async() => {
//     try{
//         // console.log(process.env.MONGO_URI)
//         await mongoConnect(process.env.MONGO_URI)
//         app.listen(port, () => {
//             console.log(`Server is running on http://localhost:${port}`);
//         })
//     }catch(error){
//         console.log(error);
//     }
// }

// start();