const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require("cors");
const knex = require('knex');
const {handleRegister} = require('./controllers/register');
const {handleSignIn} = require('./controllers/signin');
const {handleProfileGet} = require('./controllers/profile');
const {put} = require('./controllers/put');

const {handleSubmitTask} = require('./controllers/task.controller');
const {handleGetTask} = require('./controllers/task.controller');
const {handleMarkComplete} = require('./controllers/task.controller');
const {handleHeartFill} = require('./controllers/task.controller');
const {handleDueDate} = require('./controllers/task.controller');
const {hadleDeletetask} = require('./controllers/task.controller');
const { getImportantData } = require('./controllers/important.controller');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'danghuyhoang',
      password : '',
      database : 'to-do'
    }
  });

const PORT = process.env.PORT || 3000

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.json('success');
})

app.post('/signin', (req, res) => handleSignIn(req, res, db, bcrypt))

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));


// handle add task
app.post('/myday', (req, res) => handleSubmitTask(req, res, db))

app.get('/myday/:id', (req, res) => handleGetTask(req, res, db))


// handle complete
app.put('/myday/:id', (req, res) => handleMarkComplete(req, res, db))

// handle heart fill
app.put('/myday/:id/:taskid', (req, res) => handleHeartFill(req, res, db))

// handle due date
app.post('/myday/:id', (req, res) => handleDueDate(req, res, db))


// handle delete task
app.delete('/myday/:id/:taskid', (req, res) => hadleDeletetask(req, res, db))

// handle add important
app.get('/myday/important/:id', (req, res) => getImportantData(req, res, db))


app.get('/profile/:id', handleProfileGet(db))

app.put('/task', (req, res) => put(req, res, db))


app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})