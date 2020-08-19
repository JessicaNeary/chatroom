const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid = require('uuid-v4');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http)

var PORT = process.env.PORT || 3040;

app.use(bodyParser.json())
app.use(cors());

let rooms = {
    1: {
        name: "The room",
        id: 1,
        users: {
            3: { name: "Tom", id: 3, admin: true }
        }
    }
};
let chatLog = {};

app.post('/rooms', (req, res) => {
    const newUser = {
        ...req.body,
        admin: true
    }
    const newRoom = {
        name: req.query.name,
        id: uuid(),
        users: {
            [newUser.id]: newUser,
        }
    };
    
    rooms[newRoom.id] = newRoom;
    chatLog[newRoom.id] = [];

    res.json({ room: newRoom, userId: newUser.id });
})

// app.post('/room/:id', (req, res) => {
//     const room = rooms[req.params.id]
//     room.users.push(req)
//     const response = {
//         ...room,
//         chats: chatLog[req.params.id]
//     }

//     res.json(response);
// });

io.on('connection', (socket) => {
    socket.on('join-room', ({roomId, user}) => {
      const room = rooms[roomId]
      const newUser = {
        ...user,
        admin: false
    }
      room.users[newUser.id] = newUser
      const response = {
          room,
          chats: chatLog[roomId],
          userId: newUser.id
      }
      io.sockets.emit('get-room', response);
    });

    socket.on('leave-room', ({ roomId, userId }) => {
        delete rooms[roomId].users[userId]
        io.sockets.emit('get-room', { room: rooms[roomId]});
    })
  });

http.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});