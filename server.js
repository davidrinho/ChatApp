const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
const PORT = 3000 || process.env.PORT;

io.on('connection', (socket) => {
    // Whenever a user joins the chat
    socket.on('userJoin', (username) => {
        socket.username = username;
        io.emit('message', username + " has joined the chat!")
    });

    // Chat message from any user
    socket.on('chat message', (data) => {        
        io.emit('chat message', data);
    });


    //  Fires when user disconnects
    socket.on('disconnect', (username) => {
        console.log('a user has disconnected');
        io.emit('message', socket.username + " has disconnected")
    });
});


http.listen(PORT, () => {
    console.log("Listening on port 3000");
});