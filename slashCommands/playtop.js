const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
const { handlemsg } = require(`${process.cwd()}/handlers/functions`);
    module.exports = {
  name: `playtop`,
  category: `Song`,
  aliases: [`ptop`, `pt`],
  description: `Добавляет песню с заданным названием/адресом в начало очереди`,
  usage: `playtop <link/query>`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "check_dj": true,
    "previoussong": false
  },
  options: [ 
		{"String": { name: "what_song", description: "Какую песню/плейлист вы хотите вохпроизвести? <LINK/SEARCH-QUERY>", required: true }}, 
	],
  run: async (client, interaction, cmduser, es, ls, prefix, player, message) => {
    
    //
    if (!client.settings.get(message.guild.id, "MUSIC")) {
      return interaction.reply({ephemeral: true, embeds: [new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.disabled.title)
        .setDescription(handlemsg(client.la[ls].common.disabled.description, {prefix: prefix}))
      ]});
    }
    try{
      let args = [interaction.options.getString("what_song")]
      if(!args[0]) args = [interaction.options.getString("song")]
      //Send information
      interaction.reply({content: `Searching and attempting to play: **${args[0]}** from <:Youtube:840260133686870036> \`Youtube\`!`})
      //Play the song from youtube
      return playermanager(client, message, args, `playtop:youtube`, interaction);
    } catch (e) {
      console.log(String(e.stack).dim.bgRed)
    }
  }
};
