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
    technicians:[
        {
            id:'789',
            techName: 'Ahmad',
            email:'ahmad@gmail.com',
            jobs:[],
        },
        {
            id:'456',
            techName: 'Abed',
            email:'abed@gmail.com',
            jobs:[],
        }
    ],
    servers: [
        {
            id: '123',
            name: 'server1',
            kiosks:[
                {
                    id:'123',
                    macAddress:'kiosk1',
                    hotelName: 'Tel-Aviv Hotel',
                    good:false,
                    serverID:'123',
                    exceptions:[],
                },
                {
                    id:'124',
                    macAddress:'kiosk2',
                    hotelName: 'Tel-Aviv2 Hotel',
                    good:true,
                    serverID:'123',
                    exceptions:[],
                }

            ]
        },
        {
            id: '124',
            name: 'server2',
            kiosks:[
                {
                    id:'123',
                    macAddress:'kiosk1',
                    hotelName: 'Beersheva Hotel',
                    good:true,
                    serverID:'124',
                    exceptions:[

                            ],
                },
                {
                    id:'124',
                    macAddress:'kiosk2',
                    hotelName: 'Tel-Aviv Hotel',
                    good:true,
                    serverID:'124',
                    exceptions:[],
                }
            ]
        }

    ]
};

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
    res.send(database.users);
});

app.get('/users/getFree',(req,res)=>{
    res.json(database.technicians);
});

app.post('/users/assign',(req,res)=>{
    database.technicians.forEach((tech)=>{
       if (tech.id === req.body.id) {
           tech.jobs.push(req.body.kiosk);
           console.log(tech);
       }
    });

});

app.get('/servers/all',(req,res)=>{
   res.json(database.servers);
});

app.post('/signin', (req,res) => {
    if (req.body.email === database.users[0].email
        && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    }else{
        res.status(400).json('Error logging in');
    }
});

app.get('/users',(req,res)=>{
   res.json(database.users);
});

app.delete('');

app.post('/technician',(req,res) => {
    const {name,email,password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        type:'Technician',
    });
    res.json(database.users[database.users.length-1]);
});

app.listen(4000,() => {
    console.log('app is running on port 3000');
});
