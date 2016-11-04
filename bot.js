/*Start of file app.js to run Facebook BOT code in https*/
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
var request = require('request');
var app = require('express')();

var httpsOption = {
   ca: fs.readFileSync('---path----/CACert.crt'), //mention the path of the CA
   key  : fs.readFileSync('----path------/key.pem'),//mention the path of the key
   cert : fs.readFileSync('-----path-------/crt.pem') //mention the path of the certificate
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  }
);

app.get('/', function (req, res) {
	console.log("yes");
   res.send('Welcome to Zerch Bot application!');
});


//this function validates the created webhook
//make sure that you use the same verify token which you have mentioned in the facebook webhook configuration.

app.get('/webhook', function (req, res) {
	    if (req.query['hub.verify_token'] === 'myBotVerifyToken') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

// this is a sample echo method which echoes the message you type 

app.post('/Webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            sendMessage(event.sender.id, {text: "Echo: " + event.message.text});
        }
    }
    res.sendStatus(200);
});


//this a function to send messages

function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: ''}, //In the Token Generation section, select your Page. A Page Access Token will be generated for you. Copy the Page Access Token and paste it here. 
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

https.createServer(httpsOption, app).listen(443, function () {
   console.log('Bot application Started on https on port 443!');
});
/*End of file of app.js */

