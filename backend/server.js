const express = require('express')
const dotenv = require('dotenv')
const chats = require('./data/data')
const connectDB = require('./config/db')
const app = express()
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config()

connectDB()

app.use(express.json())   // to accept the JSON data from frontend

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

// app.get('/api/chat', (req,res) => {
//     res.send(chats)
// })

// app.get('/api/chat/:id', (req,res) => {
//     // console.log(req.params.id)
//     const particularChat = chats.find((e) => {
//         return e._id === req.params.id
//     })
//     res.send(particularChat)
// })

app.listen(port, () => {
    console.log(`Chat app listening on port ${port} !`)
})