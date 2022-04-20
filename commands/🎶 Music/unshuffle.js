const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `unshuffle`,
  category: `🎶 Music`,
  aliases: [`unmix`, `oldshuffle`, `undoshuffle`, `oldqueue`, `us`],
  description: `Восстанавливает старую очередь`,
  usage: `unshuffle`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": true,
    "previoussong": false
  },
  type: "queue",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if no shuffle happened, return error
    if (!player.get(`beforeshuffle`))
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["unshuffle"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["music"]["unshuffle"]["variable2"]))
        ]
      });
    //clear teh Queue
    player.queue.clear();
    //now add every old song again
    for (const track of player.get(`beforeshuffle`))
      player.queue.add(track);
    //return success message
    return message.reply({
      embeds: [new MessageEmbed()
        .setTitle(eval(client.la[ls]["cmds"]["music"]["unshuffle"]["variable3"]))
        .setColor(es.color)
      ]
    });

  }
};
