const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { json } = require('body-parser');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
  client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success')
})

app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, bcrypt, db)})

app.get('/profile/:userId', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || portNumber, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})