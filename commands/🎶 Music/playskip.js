const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
module.exports = {
  name: `playskip`,
  category: `🎶 Music`,
  aliases: [`ps`],
  description: `Мгновенно воспроизводит песню с YouTube, что означает пропуск текущей дорожки и воспроизведение следующей песни.`,
  usage: `playskip <Song / URL>`,
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
          .setTitle(eval(client.la[ls]["cmds"]["music"]["playskip"]["variable1"]))
        ]
      });

    if (args.join("").includes("soundcloud")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.soundcloud} Soundcloudи затем ${emoji.msg.skip_track} переход к нему!`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `skiptrack:soundcloud`);
    } else if (args.join("").includes("spotify")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.spotify} Spotifyи затем ${emoji.msg.skip_track} переход к нему!`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `skiptrack:raw`);
    } else if (args.join("").includes("apple")) {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.apple} Apple-Musicи затем ${emoji.msg.skip_track} переход к нему!`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      playermanager(client, message, args, `skiptrack:raw`);
    } else {
      message.reply({
        embeds: [
          new MessageEmbed().setColor(es.color)
          .setTitle(`${emoji.msg.search} Поиск вашего запроса на ${emoji.msg.youtube} Youtubeи затем ${emoji.msg.skip_track} переход к нему!`)
          .setDescription(`\`\`\`${String(args.join(" ")).substr(0, 2000)}\`\`\``)
        ]
      })
      //play from YOUTUBE
      playermanager(client, message, args, `skiptrack:youtube`);
    }
  }
};
