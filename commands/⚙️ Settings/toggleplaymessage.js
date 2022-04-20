const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: "toggleplaymessage",
  aliases: ["toggleplaymsg", "playmessage", "playmsg", "toggleprunning", "pruning", "prunning", "toggeldebug", "debug"],
  category: "⚙️ Settings",
  description: "Переключает playmessage (так же, как обрезка...). Если это правда, будет отправлено сообщение о воспроизведении нового трека, даже если ваш афк. Если false, сообщение не будет отправляться при воспроизведении нового трека! | По умолчанию: true или отправить новую информацию о треке.",
  usage: "toggleplaymessage",
  memberpermissions: ["ADMINISTRATOR"],
  type: "music",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //switch the state
    client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "pruning"), "pruning");
    //send information embed
    return message.reply({
      embeds: [new MessageEmbed()
        .setFooter(client.getFooter(es))
        .setTitle(eval(client.la[ls]["cmds"]["settings"]["togglepruning"]["variable1"]))
        .setDescription(eval(client.la[ls]["cmds"]["settings"]["togglepruning"]["variable2"]))
      ]
    });
  }
};
