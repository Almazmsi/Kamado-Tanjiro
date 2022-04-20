//The Module
const {
  Permissions
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`)
const settings = require(`${process.cwd()}/botconfig/settings.json`);
module.exports = async (client, guild) => {
  client.logger(`Покинул сервер: ${guild.name} (${guild.id}) | Участники: ${guild.memberCount} | Текущее среднее количество участников/серверов: ${Math.floor(client.guilds.cache.filter((e) => e.memberCount).reduce((a, g) => a + g.memberCount, 0) / client.guilds.cache.size)}`.red)
  if (!settings[`show-serverjoins`]) return;
  if (!guild || guild.available === false) return
  let theowner = "NO OWNER DATA! ID: ";
  await guild.fetchOwner().then(({
    user
  }) => {
    theowner = user;
  }).catch(() => {})
  let embed = new MessageEmbed()
    .setColor("RED")
    .setTitle(`👋 Покинул сервер`)
    .addField("Информация про сервер", `>>> \`\`\`${guild.name} (${guild.id})\`\`\``)
    .addField("Информация про владельца сервера", `>>> \`\`\`${theowner ? `${theowner.tag} (${theowner.id})` : `${theowner} (${guild.ownerId})`}\`\`\``)
    .addField("Количество участников", `>>> \`\`\`${guild.memberCount}\`\`\``)
    .addField("Количество серверов на которых находится бот", `>>> \`\`\`${client.guilds.cache.size}\`\`\``)
    .addField("Покинуть сервер:", `>>> \`\`\`${config.prefix}leaveserver ${guild.id}\`\`\``)
    .setThumbnail(guild.iconURL({
      dynamic: true
    }));
  for (const owner of config.ownerIDS) {
    client.users.fetch(owner).then(user => {
      user.send({
        embeds: [embed]
      }).catch(() => {})
    }).catch(() => {});
  }
}


