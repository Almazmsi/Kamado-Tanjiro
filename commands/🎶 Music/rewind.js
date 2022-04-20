const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  createBar,
  format,
  handlemsg
} = require(`${process.cwd()}/handlers/functions`);
module.exports = {
  name: `rewind`,
  category: `🎶 Music`,
  aliases: [`seekbackwards`, `rew`],
  description: `Переход определенное количество секунд назад`,
  usage: `rewind <Duration in Seconds>`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": true,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    if (!args[0])
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["rewind"]["variable1"]))
        ]
      });
      
    let seektime = player.position - Number(args[0]) * 1000;
    if (seektime >= player.queue.current.duration - player.position || seektime < 0) {
      seektime = 0;
    }
    //seek to the right time
    player.seek(Number(seektime));
    //send success message
    return message.reply({
      embeds: [new MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["music"]["rewind"]["variable2"]))
        .addField(`${emoji.msg.time} Progress: `, createBar(player))
        .setColor(es.color)
      ]
    });
  }
};
