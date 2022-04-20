const {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `equalizer`,
  category: `👀 Filter`,
  aliases: [`eq`, "eqs", "seteq", "setequalizer"],
  description: `Изменяет эквалайзер`,
  usage: `bassboost <music/bassboost/earrape>`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    let level = `none`;
    if (!args.length || (!client.eqs[args[0].toLowerCase()] && args[0].toLowerCase() != `none`))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(eval(client.la[ls]["cmds"]["filter"]["equalizer"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["filter"]["equalizer"]["variable2"]))
        ]
      });
    level = args[0].toLowerCase();
    switch (level) {
      case `music`:
        player.set("eq", "🎵 Music");
        player.setEQ(client.eqs.music);
        break;
      case `pop`:
        player.set("eq", "🎙 Pop");
        player.setEQ(client.eqs.pop);
        break;
      case `electronic`:
      case `electro`:
      case `techno`:
        player.set("eq", "💾 Electronic");
        player.setEQ(client.eqs.electronic);
        break;
      case `classical`:
      case `classic`:
      case `acustics`:
        player.set("eq", "📜 Classical");
        player.setEQ(client.eqs.classical);
        break;
      case `rock`:
      case `metal`:
        player.set("eq", "🎚 Metal");
        player.setEQ(client.eqs.rock);
        break;
      case `full`:
      case `ful`:
        player.set("eq", "📀 Full");
        player.setEQ(client.eqs.full);
        break;
      case `light`:
        player.set("eq", "💿 Light");
        player.setEQ(client.eqs.light);
        break;
      case `gaming`:
      case `game`:
      case `gam`:
        player.set("eq", "🕹 Gaming");
        player.setEQ(client.eqs.gaming);
        break;
      case `music`:
        player.set("eq", "🎵 Music");
        player.setEQ(client.eqs.music);
        break;
      case `bassboost`:
        player.set("eq", "🎛 Bassboost");
        player.setEQ(client.eqs.bassboost);
        break;
      case `earrape`:
        player.set("eq", "🔈 Earrape");
        player.setVolume(player.volume + 50);
        player.setEQ(client.eqs.earrape);
        break;
    }
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setTitle(eval(client.la[ls]["cmds"]["filter"]["equalizer"]["variable3"]))
        .setDescription(eval(client.la[ls]["cmds"]["filter"]["equalizer"]["variable4"]))
      ]
    });
  }
};
