const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json())

const DB = process.env.DATABASE.replace(
    '<PASSWORD>', process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    if(!error) {
        console.log('Successfully connected to code_snippetsdb!')
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})