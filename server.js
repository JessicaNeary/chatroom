const express = require('express');
const cors = require('cors');
const uuid = require('uuid-v4');

const app = express();

app.use(cors());

let rooms = {};
let chatLog = {};
let users = {};

app.get('/rooms', (req, res) => {
    const newRoom = {
        name: req.query.name,
        id: uuid()
    };
    
    rooms[newRoom.id] = newRoom;
    chatLog[newRoom.id] = [];

    res.json(newRoom);
})

app.get('/room/:id', (req, res) => {
    const response = {
        ...rooms[req.params.id],
        chats: chatLog[req.params.id]
    }

    res.json(response);
});

var PORT = process.env.PORT || 3040;

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});