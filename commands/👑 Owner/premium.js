const {
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require(`discord.js`);
const config = require(`${process.cwd()}/botconfig/config.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `premium`,
  category: `👑 Owner`,
  description: `Requests Premium for this Server`,
  usage: `premium`,
  memberpermissions: [`ADMINISTRATOR`],
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    if (client.premium.get("global", "guilds").includes(message.guild.id)) {
      return message.reply(`❌ **Этот сервер уже имеет статус \`PREMIUM-GUILD\`**`)
    }
    let theowner = "Нету информации про владельца сервера! ID: ";
    await message.guild.fetchOwner().then(({
      user
    }) => {
      theowner = user;
    }).catch(() => {})
    let embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`✅ Новый сервер хочет получить **премиум статус**`)
      .addField("Информация об сервере", `>>> \`\`\`${message.guild.name} (${message.guild.id})\`\`\``)
      .addField("Владелец сервера", `>>> \`\`\`${theowner ? `${theowner.tag} (${theowner.id})` : `${theowner} (${message.guild.ownerId})`}\`\`\``)
      .addField("Количество участников", `>>> \`\`\`${message.guild.memberCount}\`\`\``)
      .addField("Запросил:", `>>> \`\`\`${message.author.tag} (${message.author.id})\`\`\``)
      .setThumbnail(message.guild.iconURL({
        dynamic: true
      }))
      .setFooter(client.getFooter(`${message.author.id}-${message.guild.id}`, message.author.displayAvatarURL({
        dynamic: true
      })))
    for (const owner of config.ownerIDS) {
      client.users.fetch(owner).then(user => {
        user.send({
          embeds: [embed],
          components: [
            new MessageActionRow().addComponents([
              new MessageButton().setStyle("SUCCESS").setEmoji("✅").setCustomId("PREMIUM-ACCEPT").setLabel("Принять"),
              new MessageButton().setStyle("DANGER").setEmoji("❌").setCustomId("PREMIUM-DENY").setLabel("Отказать")
            ])
          ]
        }).catch(() => {});
      }).catch(() => {});
    }
    return message.reply(`✅ **Подана заявка на премиум сервер**`)
  }
};
