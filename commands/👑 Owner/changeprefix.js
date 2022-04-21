const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`${process.cwd()}/botconfig/config.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const fs = require("fs")
module.exports = {
  name: `changeprefix`,
  category: `👑 Owner`,
  type: "bot",
  description: `Позволяет изменять префикс бота ГЛОБАЛЬНО (если у сервера нет других настроек).)`,
  usage: `changeprefix <NEW PREFIX>`,
  memberpermissions: [`ADMINISTRATOR`],
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.getFooter(es))
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["changename"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["owner"]["changename"]["variable2"]) + `\n\nЕсли вы хотите изменить настройки для **этого сервера**, то введите команду \`${prefix}prefix <newprefix>\``)
        ]
      });
    //if no args return error
    if (!args[0])
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor).setFooter(client.getFooter(es))
          .setTitle(eval(client.la[ls]["cmds"]["settings"]["prefix"]["variable1"]))
          .setDescription(`Current global Prefix: \`${config.prefix}\``)
        ]
      });
    //if there are multiple arguments
    if (args[1])
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor).setFooter(client.getFooter(es))
          .setTitle(eval(client.la[ls]["cmds"]["settings"]["prefix"]["variable3"]))
        ]
      });
    //if the prefix is too long
    if (args[0].length > 5)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor).setFooter(client.getFooter(es))
          .setTitle(eval(client.la[ls]["cmds"]["settings"]["prefix"]["variable4"]))
        ]
      });
    let status = config;
    status.prefix = args[0];
    fs.writeFile(`./botconfig/config.json`, JSON.stringify(status, null, 3), (e) => {
      if (e) {
        console.log(e.stack ? String(e.stack).dim : String(e).dim);
        return message.channel.send({
          embeds: [new MessageEmbed()
            .setFooter(client.getFooter(es))
            .setColor(es.wrongcolor)
            .setTitle(client.la[ls].common.erroroccur)
            .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
          ]
        })
      }
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setFooter(client.getFooter(es))
          .setColor(es.color)
          .setTitle(`👍 Успешное изменение префикса`)
          .setDescription(`**Чтобы изменить его в этом сервере, используйте: \`${prefix}prefix <newprefix>\`**`)
        ]
      })
    });
  }
};
