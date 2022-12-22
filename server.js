const express = require('express')
const app = express()

const http = require('http').createServer(app)

//env
const PORT = process.env.PORT || 3000
// const PORT = process.env.PORT || 'https://adda-19.herokuapp.com/';

http.listen(PORT, ()=>{
    console.log(` Listening on port ${PORT} `)
})

//accessing public file
app.use(express.static(__dirname + '/public'))
 
//route
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

// socket

const io = require('socket.io')(http)

io.on('connection', (socket) => {
        console.log("Connected...")
        socket.on('message', (msg)=>{
            socket.broadcast.emit('message', msg)
        })
});