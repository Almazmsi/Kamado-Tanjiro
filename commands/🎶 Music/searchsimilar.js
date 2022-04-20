const playermanager = require(`${process.cwd()}/handlers/playermanager`);
module.exports = {
  name: `searchsimilar`,
  category: `🎶 Music`,
  aliases: [`searchs`, `searchrelated`, `searchr`],
  description: `Ищет похожую песню текущего трека!`,
  usage: `searchsimilar`,
  parameters: {
    "type": "music",
    "activeplayer": true,
    "previoussong": false
  },
  type: "queue",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //adds/plays it
    playermanager(client, message, Array(`https://www.youtube.com/watch?v=${player.queue.current.identifier}&list=RD${player.queue.current.identifier}`), `similar:search`);
  }
};
