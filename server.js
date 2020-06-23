const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid = require('uuid-v4');

const app = express();

app.use(bodyParser.json())
app.use(cors());

let rooms = {};
let chatLog = {};

app.post('/rooms', (req, res) => {
    const newRoom = {
        name: req.query.name,
        id: uuid(),
        users: [req.body]
    };
    
    rooms[newRoom.id] = newRoom;
    chatLog[newRoom.id] = [];

    res.json(newRoom);
})

app.post('/room/:id', (req, res) => {
    const room = rooms[req.params.id]
    room.users.push(req)
    const response = {
        ...room,
        chats: chatLog[req.params.id]
    }

    res.json(response);
});

var PORT = process.env.PORT || 3040;

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});