const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = process.env.PORT || 3000;

async function start () {
    try {
        await mongoose.connect( "mongodb+srv://lumbago:Gleb1iPad@cluster0.kq2qy.mongodb.net/WeWatchMobile?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        } );

        app.listen(PORT, () => console.log(`Hi - ${PORT}`));
    } catch ( e ) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}
start();


