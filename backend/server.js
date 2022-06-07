const express = require('express');
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 8000;

const app = express()

app.use(express.json()) //for body -> raw (json)
app.use(express.urlencoded({extended: false})) // for body -> x-www-urlformencoded
//NOW WE CAN GET DATA FROM THE BODY ({name, email, password})

//ROUTING fa riferimento alla definizione di endpoint dell’applicazione (URI) e alla loro modalità di risposta alle richieste del client.

//GET method route
app.get('/', (req, res) => {
  // res.send('Hello')  //su postman effettua una richiesta get ad http://localhost:5000
  res.status(200).json({message: 'Welcome to the Support Desk API'})
})

// Routes
// in postman you'll get a "Register Route" response or "Login Route" if endpoint is /api/users/login
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)


app.listen(PORT, () => console.log(`Example app listening on ${PORT}`))