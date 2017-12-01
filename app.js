const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
var uuid = require('uuid4');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to mongoose
mongoose.connect('mongodb://easycode:easycode@ds125146.mlab.com:25146/easycode-testing-db', {
    useMongoClient: true
})
    .then(() => console.log('MongoDb connected'))
    .catch(error => console.log(error));


// Load User model
require('./models/Users');
const User = mongoose.model('users');


// Login form post
app.post('/login', (req, res, next) => {

    User.findOne({email: req.body.email})
        .then(user => {
            var id = uuid();
            user.token = id;

            if (req.body.email === user.email && req.body.password === user.password){
                user.save()
                    .then( user => {
                        res.sendStatus(200).send(id);
                    });
            } else {
                res.sendStatus(404).send('Incorrect email or password');
            }
        })
        .catch( error => {
            res.sendStatus(404).send('User not found');
        })
});
// Home page
app.post('/home', (req, res, next) => {
    User.findOne({token: req.body.token})
        .then( user => {
            res.send(user.name);
        })
        .catch(error => {
            res.sendStatus(404).send("Token not found!");
        })
});
// test route
app.get('/test', (req, res, next) => {
   res.send('App is working!!');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});