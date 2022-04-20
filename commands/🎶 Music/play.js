const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
module.exports = {
  name: `play`,
  category: `🎶 Music`,
  aliases: [`p`],
  description: `Запускает песню с ютуба`,
  usage: `play <Song / URL>`,
  parameters: {
    "type": "music",
    "activeplayer": false,
    "previoussong": false
  },
  type: "queuesong",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if no args return error
    if (!args[0])
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["play"]["variable1"]))
        ]
      });
    if (args.join("").includes("soundcloud")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.soundcloud} Soundcloud`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `song:soundcloud`);
    } else if (args.join("").includes("spotify")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.spotify} Spotify`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `song:raw`);
    } else if (args.join("").includes("apple")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.apple} Apple-Music`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `song:raw`);
    } else {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.youtube} Youtube`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      //play from YOUTUBE
      playermanager(client, message, args, `song:youtube`);
    }
  }
};
