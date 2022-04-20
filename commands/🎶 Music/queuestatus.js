const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `queuestatus`,
  category: `🎶 Music`,
  aliases: [`qs`, `queueinfo`, `status`, `queuestat`, `queuestats`, `qus`],
  description: `Показывает текущий статус очереди`,
  usage: `queuestatus`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  type: "queue",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //toggle autoplay
    let embed = new MessageEmbed()
    embed.setTitle(eval(client.la[ls]["cmds"]["music"]["queuestatus"]["variable1"]))
    embed.setDescription(eval(client.la[ls]["cmds"]["music"]["queuestatus"]["variable2"]))
    embed.addField(`${emoji.msg.raise_volume} Громкость`, `\`\`\`${player.volume}%\`\`\``, true)
    embed.addField(`${emoji.msg.repeat_mode} Длинна очереди: `, `\`\`\`${player.queue.length} треков\`\`\``, true)
    embed.addField(`📨 Обрезка: `, `\`\`\`${client.settings.get(message.guild.id, "playmsg") ? `✅ Включена` : `❌ Выключена`}\`\`\``, true)

    embed.addField(`${emoji.msg.autoplay_mode} Повтор песни: `, `\`\`\`${player.trackRepeat ? `✅ Включен` : `❌ Выключен`}\`\`\``, true)
    embed.addField(`${emoji.msg.autoplay_mode} Повтор очереди: `, `\`\`\`${player.queueRepeat ? `✅ Включен` : `❌ Выключен`}\`\`\``, true)
    embed.addField(eval(client.la[ls]["cmds"]["music"]["queuestatus"]["variablex_3"]), eval(client.la[ls]["cmds"]["music"]["queuestatus"]["variable3"]), true)

    embed.addField(`${emoji.msg.equalizer} Эквалайзер: `, `\`\`\`${player.get("eq")}\`\`\``, true)
    embed.addField(`🎛 Фильтр: `, `\`\`\`${player.get("filter")}\`\`\``, true)
    embed.addField(`:clock1: AFK режим`, `\`\`\`PLAYER: ${player.get("afk") ? `✅ Включен` : `❌ Выключен`}\`\`\``, true)

    embed.setColor(es.color)

    embed.addField(eval(client.la[ls]["cmds"]["music"]["queuestatus"]["variablex_4"]), eval(client.la[ls]["cmds"]["music"]["queuestatus"]["variable4"]))
    if (player.queue && player.queue.current) {
   //   embed.addField(eval(client.la[ls]["cmds"]["music"]["queuestatus"]["variablex_5"]), eval(client.la[ls]["cmds"]["music"]["queuestatus"]["variable5"]))
    }
    message.reply({
      embeds: [embed]
    });
  }
};

