const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
const { handlemsg } = require(`${process.cwd()}/handlers/functions`);
    module.exports = {
  name: `search`,
  category: `🎶 Music`,
  aliases: [`search`],
  description: `Ищет песню на YouTube`,
  usage: `search <Song / URL>`,
  cooldown: 5,
  parameters: {
    "type": "music",
    "activeplayer": false,
    "previoussong": false
  },
  options: [ 
		{"String": { name: "what_song", description: "Какую песню / плейлист вы хотите найти? <LINK/SEARCH-QUERY>", required: true }}, 
	],
  run: async (client, interaction, cmduser, es, ls, prefix, player, message) => {
    
    //
    if (!client.settings.get(message.guild.id, "MUSIC")) {
      return message.reply({embeds :[new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.disabled.title)
        .setDescription(handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
      ]});
    }
    try {
      
      let args = [interaction.options.getString("what_song")]
      if(!args[0]) args = [interaction.options.getString("song")]
      //if no args return error
      if (!args[0])
        return interaction.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["music"]["search"]["variable1"]))
        ]});
      //search the song for YOUTUBE
      playermanager(client, message, args, `search:youtube`, interaction);
    } catch (e) {
      console.log(String(e.stack).dim.bgRed)
      return interaction.reply({embeds : [new MessageEmbed()
        .setColor(es.wrongcolor)

        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["music"]["search"]["variable2"]))
      ]});
    }
  }
};

