# facebook_messenger_bot
facebook messenger echo bot using Node.js

Steps

1. Create a Facebook App and Page

Create a new Facebook App and Page or use existing ones. Go to the App Dashboard and under Product Settings click "Add Product" and select "Messenger."


2. Setup Webhook

In the Webhooks section, click "Setup Webhooks."


Enter a URL for a webhook, enter a Verify Token and select messages and messaging_postbacks under Subscription Fields.


At your webhook URL, add code for verification. Your code should look for the Verify Token and respond with the challenge sent in the verification request. Click Verify and Save in the New Page Subscription to call your webhook with a GET request.

In the sample app, this method is defined in bot.js:

app.get('/webhook', function (req, res) {
	    if (req.query['hub.verify_token'] === 'myBotVerifyToken') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

3. Get a Page Access Token

In the Token Generation section, select your Page. A Page Access Token will be generated for you. Copy this Page Access Token. Note: The generated token will NOT be saved in this UI. Each time you select that Page a new token will be generated. However, any previous tokens created will continue to function.


4. Subscribe the App to the Page

In the Webhooks section, you can subscribe the webhook for a specific page.


5. Receive Messages

Now that the subscription is completed, we need to listen for POST calls at our webhook. All callbacks will be made to this webhook.

In our sample app, we handle the all of them. For echoing messages, we look for the event.message and  event.message.text and call the sendMessage function.

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

5. create a node.js file and install all the necessary packages (included in the bot.js). 

6. Run the bot.js node file.

6. start conversation with the bot. It will echo back the message you enter and send on the messenger.


