const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Connect to mongoose
mongoose.connect('mongodb://easycode:easycode@ds125146.mlab.com:25146/easycode-testing-db', {
    useMongoClient: true
})
    .then(() => console.log('MongoDb connected'))
    .catch(error => console.log(error));


// Load User model
require('../models/Users');
const User = mongoose.model('users');


// Login form post
router.post('/login', (req, res, next) => {
    
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});