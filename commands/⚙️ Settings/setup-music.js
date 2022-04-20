var {
  MessageEmbed
} = require(`discord.js`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  MessageButton,
  MessageActionRow,
  MessageSelectMenu
} = require('discord.js')
module.exports = {
  name: "setup-music",
  category: "⚙️ Settings",
  aliases: ["setupmusic"],
  cooldown: 10,
  usage: "setup-music #Channel",
  description: "Настройка канала музыкальных запросов",
  memberpermissions: ["ADMINISTRATOR"],
  type: "music",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    //first declare all embeds
    var embeds = [
      new MessageEmbed()
      .setColor(es.color)
      .setTitle(`📃 Очередь __${message.guild.name}__`)
      .setDescription(`**В настоящее время есть __0 треков__ в очереди**`)
      .setThumbnail(message.guild.iconURL({
        dynamic: true
      })),
      new MessageEmbed()
      .setColor(es.color)
      .setFooter(es.footertext, message.guild.iconURL({
        dynamic: true
      }))
      .setImage(message.guild.banner ? message.guild.bannerURL({
        size: 4096
      }) : "https://media.discordapp.net/attachments/920742158888222754/944962578101190686/6c3e382db9a5ce5461a6f0796d5bd076.gif")
      .setTitle(`Начните слушать музыку, подключившись к голосовому каналу и отправив **URL на песню** или **Название песни** в этот канал!`)
      .setDescription(`> *Я поддерживаю <:Youtube:944355914868219904> Youtube, <:Spotify:944355914989834270> Spotify, <:soundcloud:944355914847248384> Soundcloud и прямые ссылки на MP3!*`)
    ]
    var Emojis = [
      "0️⃣",
      "1️⃣",
      "2️⃣",
      "3️⃣",
      "4️⃣",
      "5️⃣",
      "6️⃣",
      "7️⃣",
      "8️⃣",
      "9️⃣",
      "🔟",
      "🟥",
      "🟧",
      "🟨",
      "🟩",
      "🟦",
      "🟪",
      "🟫",
    ]
    //now we add the components!
    var components = [
      new MessageActionRow().addComponents([
        new MessageSelectMenu()
        .setCustomId("MessageSelectMenu")
        .addOptions(["Pop", "Strange-Fruits", "Gaming", "Chill", "Rock", "Jazz", "Blues", "Metal", "Magic-Release", "NCS | No Copyright Music", "Default"].map((t, index) => {
          return {
            label: t.substr(0, 25),
            value: t.substr(0, 25),
            description: `Загрузить музыкальный плейлист: "${t}"`.substr(0, 50),
            emoji: Emojis[index]
          }
        }))
      ]),
      new MessageActionRow().addComponents([
        new MessageButton().setStyle('PRIMARY').setCustomId('Skip').setEmoji(`⏭`).setLabel(`Пропустить`).setDisabled(),
        new MessageButton().setStyle('DANGER').setCustomId('Stop').setEmoji(`🏠`).setLabel(`Остановить`).setDisabled(),
        new MessageButton().setStyle('SECONDARY').setCustomId('Pause').setEmoji('⏸').setLabel(`Пауза`).setDisabled(),
        new MessageButton().setStyle('SUCCESS').setCustomId('Autoplay').setEmoji('🔁').setLabel(`Автопроигрывание`).setDisabled(),
        new MessageButton().setStyle('PRIMARY').setCustomId('Shuffle').setEmoji('🔀').setLabel(`Перемешать`).setDisabled(),
      ]),
      new MessageActionRow().addComponents([
        new MessageButton().setStyle('SUCCESS').setCustomId('Song').setEmoji(`🔁`).setLabel(`Повтор`).setDisabled(),
        new MessageButton().setStyle('SUCCESS').setCustomId('Queue').setEmoji(`🔂`).setLabel(`Очередь`).setDisabled(),
        new MessageButton().setStyle('PRIMARY').setCustomId('Forward').setEmoji('⏩').setLabel(`+10 сек`).setDisabled(),
        new MessageButton().setStyle('PRIMARY').setCustomId('Backward').setEmoji('⏪').setLabel(`-10 сек`).setDisabled(),
        new MessageButton().setStyle('PRIMARY').setCustomId('Lyrics').setEmoji('📝').setLabel(`Слова`).setDisabled(),
      ]),
    ]
    let channel = message.mentions.channels.first();
    if (!channel) return message.reply(":x: **Вы забыли упомянуть текстовый канал!**")
    //send the data in the channel
    channel.send({
      embeds,
      components
    }).then(msg => {
      client.musicsettings.set(message.guild.id, channel.id, "channel");
      client.musicsettings.set(message.guild.id, msg.id, "message");
      //send a success message
      return message.reply(`✅ **Успешно настроена музыкальная система в:** <#${channel.id}>`)
    });
  },
};
