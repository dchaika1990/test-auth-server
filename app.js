const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid4');
const bcrypt = require('bcryptjs');

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

            if (!user) {
                res.status(404).send('User not found');
            } 

             // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(isMatch){

                    var id = uuid();
                    user.token = id;

                    user.save()
                        .then( user => {
                            res.status(200).send(id);
                        });

                } else{
                    res.status(404).send('Inccorect password!');
                }
            });

        })
        .catch( error => {
            res.status(404).send(error);
        })
});

app.post('/signup', (req, res, next) => {

    User.findOne({email: req.body.email})
        .then( user => {
            if ( user ) {
                res.status(404).send('User already exists!');
            } else {

                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                  
                      newUser.password = hash;
              
                      newUser.save()
                        .then(user => {
                            res.status(200).send('Success');
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    });    
                });
            }
        })

})

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