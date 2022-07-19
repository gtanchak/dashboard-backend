const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3500

const app = express()

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

const one = (req, res, next) => {
    console.log("one")
    next()
}

const two = (req, res, next) => {
    console.log("two")
    next()
}

const three = (req, res, next) => {
    console.log("three")
    res.send('Finished')
}

app.get('/chain(.html)?', [one, two, three])


app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))