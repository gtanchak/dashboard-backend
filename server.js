const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3500
const {logger} = require('./middleware/logEvents')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
 
const app = express()

// built in middleware for urlencoded
app.use(express.urlencoded({extended: false}))

// built in middleware for json
app.use(express.json())

// for static files
app.use(express.static(path.join(__dirname, '/public')))

app.use(logger)

// cross origin resource sharing
const whitList = ["https://www.google.com/", "http://localhost:3500/"]

const corsOptions = {
    origin: (origin, callback) => {
        if(!whitList.includes(origin)) {
            callback(null, true)
        }
        else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(errorHandler)

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))