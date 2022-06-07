const express = require('express');
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 8000;

const app = express()

//ROUTING fa riferimento alla definizione di endpoint dell’applicazione (URI) e alla loro modalità di risposta alle richieste del client.

//GET method route
app.get('/', (req, res) => {
  // res.send('Hello')  //su postman effettua una richiesta get ad http://localhost:5000
  res.status(200).json({message: 'Welcome to the Support Desk API'})
})

// Connect endpoint to userRoutes
// in postman you'll get a "Register Route" response or "Login Route" if endpoint is /api/users/login
app.use('/api/users', require('./routes/userRoutes'))


app.listen(PORT, () => console.log(`Example app listening on ${PORT}`))