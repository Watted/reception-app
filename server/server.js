const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'Mohammed',
            password:'1234',
            email: 'wattk308@gmail.com',
            type: 'SYS_ADMIN',
        },
        {
            id: '456',
            name:'Abed',
            password:'1234',
            email:'abed@gmail.com',
            type:'TECH'
        },
        {
            id: '789',
            name:'Ahmad',
            password:'1234',
            email:'ahmad@gmail.com',
            type:'TECH'
        },

    ],
    technicians:[
        {
            id:'789',
            techName: 'Ahmad',
            email:'ahmad@gmail.com',
            jobs:[],
            password:"1234"
        },
        {
            id:'456',
            techName: 'Abed',
            email:'abed@gmail.com',
            jobs:[],
            password:"1234"
        }
    ],
    servers: [
        {
            id: '123',
            name: 'server1',
            status: "RED",
            kiosks:[
                {
                    id: '123',
                    macAddress: 'kiosk1',
                    hotelName: 'Tel-Aviv Hotel',
                    good: false,
                    serverID: '123',
                    exceptions: [
                        {
                            exceptionDisc: 'RED1', exType: "RED", date: "8/10/2018"
                        },
                        {
                            exceptionDisc: 'RED2', exType: "RED", date: "8/10/2018"
                        },
                        {
                            exceptionDisc: 'RED3', exType: "RED", date: "8/10/2018"
                        },
                        {
                            exceptionDisc: 'YELLOW1', exType: "YELLOW", date: "8/10/2018"
                        },
                        {
                            exceptionDisc: 'YELLOW2', exType: "YELLOW", date: "8/10/2018"
                        },
                    ],
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
            status: "GREEN",
            kiosks:[
                {
                    id:'123',
                    macAddress:'kiosk1',
                    hotelName: 'Beersheva Hotel',
                    good:true,
                    serverID:'124',
                    exceptions:[],
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

//users Controller
app.post('/auth/signin/:email',(req,res)=>{
    const {email} = req.params;
    database.users.forEach((user)=>{
        if (user.email===email && user.password === req.body.password){
            res.json(user);
            return;
        }
    })
});

//server controller
app.get('/servers/all',(req,res)=>{
    res.json(database.servers);
});

//technicians controller
app.post('/users/assign/:techID/:macAddress/:problem/:date',(req,res)=>{
    const {techID,macAddress,problem,date} = req.params;
    database.technicians.forEach((tech)=>{
       if (tech.id === techID) {
           tech.jobs.push({macAddress:macAddress,problem:problem,date:date});
           return;
       }
    });

});

app.get('/users/all',(req,res)=>{
   res.json(database.technicians);
});

app.post("users/addTech/:techName/:email",(req,res)=>{
    const {techName,email} = req.params;
    database.users.push({id:'1212',
        name:techName,
        password:req.body.password,
        email:email,type:'Tech'});

    database.technicians.push({
        id:'0000',
        techName: techName,
        email:email,
        jobs:[],
        password:req.body.password
    })
});




app.delete('/users/delete/:techId',(req,res)=>{
    const {techId} = req.params;
    const index = database.users.findIndex(user=>{
       return user.id === techId;
    });
    const index1 = database.technicians.findIndex(tech=>{
       return tech.id === techId;
    });
    database.users = database.users.filter((row,j)=>j!==index);
    database.technicians = database.technicians.filter((row,j)=>j!==index1);
    res.json(database.users,database.technicians);
});

app.get('/users/:email',(req,res)=>{
    const {email} = req.params;
    database.technicians.forEach((tech)=>{
        if (tech.email === email) {
            res.json(tech.jobs);
        }
    })
});

app.post('/users/updateKiosk/:email/:problem/:macAdd/:date',(req,res)=>{
    const {email,problem,macAdd,date} = req.params;
    database.technicians.forEach(tech=>{
        if (tech.email === email) {
            const index = tech.jobs.findIndex(job => {
                return job.problem === problem && job.macAddress === macAdd && job.date === date;
            });
            tech.jobs = tech.jobs.filter((row,j)=>j!==index);
        }
    });
});

app.listen(4000,() => {
    console.log('app is running on port 3000');
});
