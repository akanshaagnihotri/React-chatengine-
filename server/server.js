  const Pusher = require('pusher');
  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const app = express();
  const pusher = new Pusher({
    appId: '522965',
    key: 'bd745946701981a075e9',
    secret: '85e4679abbc6b405ed8b',
    cluster: 'ap2',
    encrypted: false,
    auth: {
      headers: {
       'Access-Control-Allow-Origin': "SOME_CSRF_TOKEN"
      }
    } 
  });
 
  let totalChats=[
    {name: 'ServerBot', message: "Welcome to React implementation of Pusher"},
    {name: 'ServerBot', message: "Let's Get Started"}
  ];
  let totalUser=[{name:'ServerBot', date: '23:00:00'}];

  app.use(cors());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
 
  app.post('/addMessage', (req,res) => {
    const payload = req.body;
    console.log("Payload is ", payload)
    totalChats.push(payload);
    pusher.trigger('pusher-chatroom', 'addedMessage', payload);
    res.send(payload);
  });

  app.post('/addUser',(req,res)=>{
    const payload=req.body;
    totalUser.push(payload);
    console.log("Adding Payload",totalUser)
    pusher.trigger('pusher-chatroom','addedUser',payload);
    res.send(payload);
  });

  app.get('/getUsers',(req,res)=>{
    res.send(totalUser);
  });

  app.get('/getChat',(req,res)=>{
    res.send(totalChats);
  });

  app.listen(2000, () => 
  console.log('Listening at ' + 2000));