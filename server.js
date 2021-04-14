const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Use CORS
app.use(cors())

const PORT = process.env.PORT || 3000;

async function start () {
    try {
        await mongoose.connect( config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        } );

        app.listen(PORT, () => console.log(`Hi - server started on port ${PORT}`));
    } catch ( e ) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}
start();


