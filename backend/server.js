const express = require('express')
const dotenv = require('dotenv')
const chats = require('./data/data')
const app = express()

dotenv.config()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/chat', (req,res) => {
    res.send(chats)
})

app.get('/api/chat/:id', (req,res) => {
    // console.log(req.params.id)
    const particularChat = chats.find((e) => {
        return e._id === req.params.id
    })
    res.send(particularChat)
})

app.listen(port, () => {
    console.log(`Chat app listening on port ${port} !`)
})