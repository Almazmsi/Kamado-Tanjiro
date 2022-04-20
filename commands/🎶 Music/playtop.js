const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
module.exports = {
  name: `playtop`,
  category: `Song`,
  aliases: [`ptop`, `pt`],
  description: `Добавляет песню с заданным названием/url в начало очереди`,
  usage: `playtop <link/query>`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": true,
    "previoussong": false
  },
  type: "queue",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if no args added return error message if allowed to send an embed
    if (!args[0])
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["playtop"]["variable1"]))
        ]
      });
    if (args.join("").includes("soundcloud")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.soundcloud} Soundcloud а затем добавить его в начало очереди`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `playtop:soundcloud`);
    } else if (args.join("").includes("spotify")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.spotify} Spotify а затем добавить его в начало очереди`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `playtop:raw`);
    } else if (args.join("").includes("apple")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.apple} Apple-Music а затем добавить его в начало очереди`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `playtop:raw`);
    } else {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.youtube} Youtube а затем добавить его в начало очереди`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      //play from YOUTUBE
      playermanager(client, message, args, `playtop:youtube`);
    }
  }
};
