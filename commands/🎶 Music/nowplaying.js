const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`${process.cwd()}/handlers/functions`);
module.exports = {
  name: `nowplaying`,
  category: `🎶 Music`,
  aliases: [`np`, "trackinfo"],
  description: `Показывает подробную информацию о текущей песне`,
  usage: `nowplaying`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if no current song return error
    if (!player.queue.current)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["nowplaying"]["variable1"]))
        ]
      });
    const embed = new MessageEmbed()
      //.setAuthor(client.getFooter(`Current song playing:`, message.guild.iconURL({
        //dynamic: true
      //})))
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL(player.queue.current.uri)
      .setColor(es.color)
      .setTitle(eval(client.la[ls]["cmds"]["music"]["nowplaying"]["variable2"]))
      .addField(`${emoji.msg.time} Прогресс: `, createBar(player))
      .addField(`${emoji.msg.time} Длинна: `, `\`${format(player.queue.current.duration).split(" | ")[0]}\` | \`${format(player.queue.current.duration).split(" | ")[1]}\``, true)
      .addField(`${emoji.msg.song_by} Автор: `, `\`${player.queue.current.author}\``, true)
      .addField(`${emoji.msg.repeat_mode} Длинна очереди: `, `\`${player.queue.length} Songs\``, true)
      .setFooter(client.getFooter(`Запросил: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
        dynamic: true
      })))
    //Send Now playing Message
    return message.reply({
      embeds: [embed]
    });
  }
};

