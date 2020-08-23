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
        },
        admin: 3,
        chatLog: []
    }
};

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
        },
        admin: newUser.id,
        chatLog: [],
    };
    
    rooms[newRoom.id] = newRoom;

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
      if (!room) {
          socket.emit('room-not-found');
          console.log('room not found')
      }
      else {
        const newUser = {
            ...user,
            admin: false
        }
        room.users[newUser.id] = newUser
        const response = {
            room,
            userId: newUser.id
        }
        console.log(room)
        io.sockets.emit('get-room', response);
      }
    });

    socket.on('leave-room', ({ roomId, userId }) => {
        if (rooms[roomId]) {
            delete rooms[roomId].users[userId]
            io.sockets.emit('get-room', { room: rooms[roomId]});
        }
    })

    socket.on('send-message', ({ roomId, message }) => {
        const newMessage = {
            ...message,
            user: {
                ...message.user,
                admin: rooms[roomId].admin === message.user.id
            },
            id: uuid()
        }
        rooms[roomId].chatLog.push(newMessage);
        console.log(rooms[roomId].chatLog)
        io.sockets.emit('get-message', {roomId, message: newMessage});
    })
  });

http.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});