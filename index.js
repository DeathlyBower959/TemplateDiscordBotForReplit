// Keep alive | This just keeps the discord bot always on as replit goes to sleep after 5 minutes
const { Client } = require("discord.js");
const keepAlive = require('./server.js');
const c = new Client({ disableEveryone: true });

// Requires the discord library
const Discord = require('discord.js');

// Creates a new Discord Client
const bot = new Discord.Client();

// Requires file system library
const fs = require('fs');

// New command collection
bot.commands = new Discord.Collection();

// Prefix
prefix = "PREFIX"

let array = []

// Assigns names to all commands so we can call them later
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    let a = file.split(".")
    array.push(a[0].toLowerCase())
    bot.commands.set(command.name, command);
}

// Runs when bot is online
bot.once('ready', () => {
    console.log('Bot is online!');
    console.log('-------------------------')
    bot.user.setActivity('description', {
      type: 'PLAYING'
    });
});

// Runs when the bot detects a message was sent
bot.on('message', message => {
  
  // Makes sure message sent isnt by a bot or that the message starts with prefix
  if (message.author.bot || !message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  
  // My command handler :D
  for (var i = 0; i < commandFiles.length; i++) {
        if (command == array[i]) {
            bot.commands.get(command).execute(message, args, Discord, bot);
            if (bot.commands.get(command).autoDelete.toLowerCase() == "true") {
                message.delete();
            }
        }
    }
});

keepAlive();
bot.login(process.env.TOKEN);
