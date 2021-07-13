const { MessageEmbed, MessageReaction } = require("discord.js");

module.exports = {
    name: 'ping',
    description: "Gets the latency of the bot!",
    autoDelete: "True",
    execute(message, args, Discord) {

        const timeTaken = Date.now() - message.createdTimestamp;
        const pingEmbed = new MessageEmbed()
        .setColor('#CCCC00')
        .setDescription(`🏓 Current Ping: ${timeTaken}ms.`);

        message.channel.send(pingEmbed);

    }
}
