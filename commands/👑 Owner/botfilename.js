var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
var {
  databasing, isValidURL
} = require(`${process.cwd()}/handlers/functions`);
module.exports = {
  name: "botfilename",
  category: "👑 Owner",
  aliases: ["originalbotname"],
  cooldown: 5,
  usage: "botfilename",
  type: "info",
  description: "If we ask you for the Original Bot name or when you ordered it you can execute this Command to find it out!",
  run: async (client, message, args, cmduser, text, prefix) => {
  
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
        return message.channel.send({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.getFooter(es))
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["botfilename"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["owner"]["botfilename"]["variable2"]))
        ]});
    try {
      let clientapp = client.application ? await client.application.fetch().catch(e=>false) : false;
      let guild = client.guilds.cache.get("836175905244184576")
      message.channel.send({content : `> **Путь:**
\`\`\`yml
${process.cwd()}
\`\`\`
> **Сервер:**
\`\`\`yml
${String(Object.values(require(`os`).networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family===`IPv4` && !i.internal && i.address || []), [])), [])).split(".")[3]}
\`\`\`
> **Команда:**
\`\`\`yml
pm2 list | grep "${String(String(process.cwd()).split("/")[String(process.cwd()).split("/").length - 1]).toLowerCase()}" --ignore-case
\`\`\`
${clientapp ? `
> **Информация по приложению:**
\`\`\`yml
Ссыдлка: https://discord.com/developers/applications/${client.user.id}
Имя: ${clientapp.name} 
${clientapp.owner.discriminator ? "Владелец: " + clientapp.owner.tag : "Команда: " + clientapp.owner.name + "\n |-> Участники: " + clientapp.owner.members.map(uid=>`${uid.user.tag}`).join(", ")  + "\n |-> Владелец команды: " + `${guild.members.cache.get(clientapp.owner.ownerId) && guild.members.cache.get(clientapp.owner.ownerId).user ? guild.members.cache.get(clientapp.owner.ownerId).user.tag : clientapp.owner.ownerId }`} 
Иконка: ${clientapp.iconURL()}
Публичный бот: ${clientapp.botPublic ? "✅": "❌"} (Только по приглашению владельца)
\`\`\`
> **Про меня:**
\`\`\`yml
${clientapp.description ? clientapp.description : "❌ Описание отсутсвует!"}
\`\`\``
: ""}
`})
          } catch (e) {
      console.log(String(e.stack).dim.bgRed)
      return message.channel.send({embeds :[new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["owner"]["botfilename"]["variable3"]))
      ]});
    }
  },
};