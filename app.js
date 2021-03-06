//Add your requirements
var restify = require('restify');
var builder = require('botbuilder');

var appId = process.env.MICROSOFT_APP_ID || "Missing your app ID";
var appPassword = process.env.MICROSOFT_APP_PASSWORD || "Missing your app secret";

// Create bot and add dialogs
var bot = new builder.BotConnectorBot
({appId: process.env.MICROSOFT_APP_ID, appPassword: process.env.MICROSOFT_APP_PASSWORD});
bot.add('/', new builder.SimpleDialog( function (session) {
session.send('Hello World');
}));

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3000, function () {
console.log('%s listening to %s', server.name, server.url);
});

server.get('/', restify.serveStatic({
    directory: __dirname,
    default: '/index.html'
}));