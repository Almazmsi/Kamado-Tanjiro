const {
  MessageEmbed,
} = require(`discord.js`);
var config = require(`${process.cwd()}/botconfig/config.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `deployslash`,
  type: "info",
  category: `👑 Owner`,
  aliases: ["deploy", "loadslash", "deployslashcommands", "deployslashcmds", "loadslashcommands", "loadslashcmds"],
  description: `Разверните и включите команды Slash этого бота! Либо глобально, либо только для одного сервера`,
  usage: `deployslash [GUILDID]`,
  cooldown: 360,
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    if (!config.ownerIDS.includes(message.author.id))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.user.username, es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL())
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable1"]))
        ]
      });
    let loadSlashsGlobal = true;
    let guildId = args[0];
    if (guildId) {
      let guild = client.guilds.cache.get(guildId);
      if (guild) {
        loadSlashsGlobal = false;
        guildId = guild.id;
      }
    }
    if (loadSlashsGlobal) {
      let themsg = await message.reply(`<a:649247676566601763:877451061038809179> **Попытка установить глобальные слеш команды в \`${client.guilds.cache.size} серверах\`...**`)
      client.application.commands.set(client.allCommands)
        .then(slashCommandsData => {
          themsg.edit(`**\`${slashCommandsData.size} Слеш команды\`** (\`${slashCommandsData.map(d => d.options).flat().length} под команды\`) загружены на  **сервера**\n> Эти сервера - те, кто пригласил меня с помощью **Приглашения с использованием слешей** от \`${prefix}invite\`\n> *Поскольку вы используете глобальные настройки, изменение команд может занять до 1 часа.!*`);
        }).catch(() => {});
    } else {
      let guild = client.guilds.cache.get(guildId);
      let themsg = await message.reply(`<a:649247676566601763:877451061038809179> **Попытка установить серверные слеш команды в \`${guild.name}\`...**`)
      await guild.commands.set(client.allCommands).then((slashCommandsData) => {
        themsg.edit(`**\`${slashCommandsData.size} Слещ команды\`** (\`${slashCommandsData.map(d => d.options).flat().length} по команды\`) загружены на **${guild.name}**\n> Эти сервера - те, кто пригласил меня с помощью **Приглашения с использованием слешей** от \`${prefix}invite\`\n> *Поскольку вы используете серверные настройки, изменение команд может занять до 1 часа.!*`);
      }).catch((e) => {
        console.log(e)
        themsg.edit(`**Не удалось загрузить команды слешей для ${guild.name}**\n\n**Вы пригласили меня с помощью этой ссылки на том сервере.?**\n> $https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot%20applications.commands`)
      });
    }
  },
};
