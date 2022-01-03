const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = 3000;

const socketServer = new WebSocket.Server({ port: 3030 });

const messages = ['Start Chatting!'];

socketServer.broadcast = function broadcast(data) {
    socketServer.clients.forEach((client) => {
        console.log('IT IS GETTING INSIDE CLIENTS');
        console.log(client);
        // The data is coming in correctly
        console.log(data);
        client.send(data);
    });
}

// socket server start for listening from user 
socketServer.on('connection', (socketClient) => {
    console.log('connected');
    console.log('Number of clients: ', socketServer.clients.size);

    var second = 0;

    setInterval(() => {
        // send data from server to client
    socketClient.send(JSON.stringify(second++));
    }, 1000)

    // get response from client
    socketClient.on('message', (receivedMessage) => {
        //  send message to client on his recieved message
        socketServer.broadcast('ye le bhai');
        console.log('Received: ' + receivedMessage)
    });    
    
    socketClient.send('You successfully connected to the websocket.');
});

//  start server and listen on port
app.listen(port, () => {
    console.log(`listening http://localhost:${port}`);
});
