const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 5000;

// app.use(express.static(path.join(__dirname, '../build')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'))
// });

async function start () {
    try {
        await mongoose.connect( config.get('mongoUri'), {
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


