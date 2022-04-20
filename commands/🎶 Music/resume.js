const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `resume`,
  category: `🎶 Music`,
  aliases: [`r`],
  description: `Возобновляет текущую приостановленную песню`,
  usage: `resume`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": true,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if its playing then return error
    if (player.playing)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["resume"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["music"]["resume"]["variable2"]))
        ]
      });
    //pause the player
    player.pause(false);
    //send success message
    message.react(emoji.react.resume).catch(() => {})
  }
};
