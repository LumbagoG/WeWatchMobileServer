const http = require('http');   
const express = require('express');
const app = express();
const server = http.createServer(app)
const config = require('config');
const mongoose = require('mongoose');

// "mongoUri": "mongodb+srv://lumbago:Gleb1iPad@cluster0.kq2qy.mongodb.net/WeWatchMobile?retryWrites=true&w=majority"

//Import CORS
const cors = require('cors');

//Import Socet
const io = require('socket.io')(server);

//Use CORS
app.use(cors());
app.options('*', cors());

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PORT = process.env.PORT || 3000;

async function start () {
    try {
        await mongoose.connect( config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        } );

        server.listen(PORT, () => console.log(`Hi - server started on port ${PORT}`));

        //Socet.io connection settings  
        io.on('connection', (socket) => {
            console.log('User has been connected')

            socket.on('chat message', (msg) => {
                console.log('message: ' + msg);
                
                io.emit('chat message', {
                    message: msg
                });
            });
        
            socket.on('disconnect', () => { 
                console.log('User disconnected');
            });
        })

    } catch ( e ) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}
start();


