const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
module.exports = {
  name: `playskipsc`,
  category: `🎶 Music`,
  aliases: [`pssc`, `playskipsoundcloud`],
  description: `Мгновенно воспроизводит песню из soundcloud, что означает пропуск текущей дорожки и воспроизведение следующей песни.`,
  usage: `playskipsc <Song / URL>`,
  parameters: {
    "type": "music",
    "activeplayer": false,
    "check_dj": true,
    "previoussong": false
  },
  type: "song",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //if no args return error
    if (!args[0])
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["playskipsc"]["variable1"]))
        ]
      });
    if (args.join("").includes("yout")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.youtube} Youtube и затем ${emoji.msg.skip_track} переход к нему!`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `skiptrack:youtube`);
    } else if (args.join("").includes("spotify")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.spotify} Spotify и затем ${emoji.msg.skip_track} переход к нему!`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `skiptrack:raw`);
    } else if (args.join("").includes("apple")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.apple} Apple-Music и затем ${emoji.msg.skip_track} переход к нему!`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `skiptrack:raw`);
    } else {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.soundcloud} Soundcloud и затем ${emoji.msg.skip_track} переход к нему!`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      //play from YOUTUBE
      playermanager(client, message, args, `skiptrack:soundcloud`);
    }
  }
};
