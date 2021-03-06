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


// Map global prmise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect('mongodb://easycode:easycode@ds125146.mlab.com:25146/easycode-testing-db', {
    useMongoClient: true
})
    .then(() => console.log('MongoDb connected'))
    .catch(error => console.log(error));


// Load User model
require('./models/Users');
const User = mongoose.model('users');

// Load Task model
require('./models/Tasks');
const Task = mongoose.model('tasks');

// Login form post
app.post('/login', (req, res, next) => {

    User.findOne({email: req.body.email})
        .then(user => {

            if (!user) {
                res.status(404).send('User not found');
            } 

             // Match password
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
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
});

// Registration 
app.post('/signup', (req, res, next) => {

    User.findOne({email: req.body.email})
        .then( user => {
            if ( user ) {
                res.status(404).send('User already exists!');
            } else {

                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    token: uuid()
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                  
                      newUser.password = hash;
              
                      newUser.save()
                        .then(user => {
                            res.status(200).send(user.token);
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    });    
                });
            }
        })
});

// Home page
app.post('/verify', (req, res, next) => {
    User.findOne({token: req.body.token})
        .then( user => {
            if( !user ) {
                res.status(404).send("Token not found!");
            }

            res.status(200).send(user.name);
        })
});

// Get all tasks
app.get('/tasks', (req, res, next) => {
    Task.find({})
        .sort({date: 'desc'})
        .then( tasks => {
            if( !tasks.length ) {
                res.status(404).send("Task not found!");
            }

            res.status(200).send(tasks);
        })
});

// Remove task by id
app.post('/remove:id', (req, res, next) => {
    Task.remove({_id: req.params.id})
        .then( tasks => {
            res.status(200).send(tasks);
        })
});

// Create new task
app.post('/create-task', (req, res, next) => {

    let newTask = new Task({
        title: req.body.title,
        description: req.body.description,
    });

    newTask.save()
        .then(task => {
            res.status(200).send(task);
        })
        .catch(error => {
            res.status(200).send(error);
        });

});

// Edit  task
app.post('/edit-task', (req, res, next) => {

    Task.findOne({_id: req.body.id})
        .then( task => {

            if ( !task ) {
                res.send(404).send('Task not found!');
            }

            task.title = req.body.title;
            task.description = req.body.description;
            task.date = Date.now();

            task.save()
                .then( task => {
                    res.status(200).send('Edit success!');
                })
                .catch( error => {
                    res.status(404).send(error);
                })

        })


});


// test route
app.get('/test', (req, res, next) => {
   res.send('App is working!!!');
});



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});