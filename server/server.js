const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'Mohammed',
            password:'momo',
            email: 'wattk308@gmail.com',
            type: 'Technician',
        },
        {
            id: '456',
            name:'Abed',
            password:'abed',
            email:'abed@gmail.com',
            type:'Technician'
        },
        {
            id: '789',
            name:'Ahmad',
            password:'ahmad',
            email:'ahmad@gmail.com',
            type:'Technician'
        },

    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }

    ]
};

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
    res.send(database.users);
});

app.post('/signin', (req,res) => {
    if (req.body.email === database.users[0].email
        && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    }else{
        res.status(400).json('Error logging in');
    }
});

app.listen(4000,() => {
    console.log('app is running on port 3000');
});
