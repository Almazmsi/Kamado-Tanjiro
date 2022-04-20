const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: "toggleunknowncommandinfo",
  aliases: ["toggleunknowncmdinfo", "toggleunknowninfo", "unknowncmdinfo", "unknowninfo", "unknowncommandinfo"],
  category: "⚙️ Settings",
  description: "Переключает, должен ли бот отправить вам информационное сообщение, когда команда НЕ НАЙДЕНА",
  usage: "toggleunknowncommandinfo",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "unkowncmdmessage"), `unkowncmdmessage`);
    return message.reply({
      embeds: [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setFooter(client.getFooter(es))
        .setTitle(eval(client.la[ls]["cmds"]["settings"]["toggleunknowncommandinfo"]["variable1"]))
        .setDescription(`${client.settings.get(message.guild.id, "unkowncmdmessage") ? "Теперь я отправлю информацию, когда команда не будет найдена" : "Я не буду отправлять информацию о неизвестных командах"}`.substr(0, 2048))
      ]
    });
  }
};
