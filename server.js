const express = require('express')
const bodyParser = require('body-parser')
const db = require('./query')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', db.getUsers)

app.get('/customers/:id', db.getUserByQuery)

app.get('/rows/:page', db.getUserByPage)

app.get('/info/:id', db.getInfoById)

app.get('/delete/:id', db.deleteUser)

app.listen(port, () => console.log(`Listening on port ${port}`))