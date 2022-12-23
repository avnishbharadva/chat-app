const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const app = express()
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config()

connectDB()

app.use(express.json())   // to accept the JSON data from frontend

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Chat app listening on port ${port} !`)
})