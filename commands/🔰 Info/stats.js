const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  getRandomInt,
  handlemsg
} = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "stats",
  category: "🔰 Info",
  aliases: ["musicstats"],
  cooldown: 10,
  usage: "stats",
  description: "Показывает статистику музыки, например, количество команд, сыгранных песен и т. д.",
  type: "server",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    let global = client.stats.get("global");
    let guild = client.stats.get(message.guild.id);
    message.reply({
      embeds: [new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null).setFooter(client.getFooter(es))
        .addField(client.la[ls].cmds.info.stats.field1.title, handlemsg(client.la[ls].cmds.info.stats.field1.value, {
          allcommands: Math.ceil(global.commands * [...client.guilds.cache.values()].length / 10)
        }), true)
        .addField(client.la[ls].cmds.info.stats.field2.title, handlemsg(client.la[ls].cmds.info.stats.field2.value, {
          allsongs: Math.ceil(global.songs * [...client.guilds.cache.values()].length / 10)
        }), true)
        .addField(eval(client.la[ls]["cmds"]["info"]["stats"]["variablex_1"]), eval(client.la[ls]["cmds"]["info"]["stats"]["variable1"]))
        .addField(client.la[ls].cmds.info.stats.field3.title, handlemsg(client.la[ls].cmds.info.stats.field3.value, {
          guildcommands: guild.commands
        }), true)
        .addField(client.la[ls].cmds.info.stats.field4.title, handlemsg(client.la[ls].cmds.info.stats.field4.value, {
          guildsongs: guild.songs
        }), true)
        .setTitle(handlemsg(client.la[ls].cmds.info.stats.title, {
          botname: client.user.username
        }))
      ]
    });
  }
}
