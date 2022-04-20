const {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  MessageSelectMenu
} = require("discord.js")
const {
  check_if_dj,
  autoplay,
  escapeRegex,
  format,
  duration,
  createBar,
  delay
} = require("../functions");
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require(`${process.cwd()}/handlers/playermanager`);
//we need to create the music system, somewhere...
module.exports = client => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton() && !interaction.isSelectMenu()) return;
    var {
      guild,
      message,
      channel,
      member,
      user
    } = interaction;
    if (!guild) guild = client.guilds.cache.get(interaction.guildId);
    if (!guild) return;
    const es = client.settings.get(guild.id, "embed")
    const ls = client.settings.get(guild.id, "language")
    const prefix = client.settings.get(guild.id, "prefix");
    var data = client.musicsettings.get(guild.id);
    const musicChannelId = data.channel;
    const musicChannelMessage = data.message;
    //if not setupped yet, return
    if (!musicChannelId || musicChannelId.length < 5) return;
    if (!musicChannelMessage || musicChannelMessage.length < 5) return;
    //if the channel doesnt exist, try to get it and the return if still doesnt exist
    if (!channel) channel = guild.channels.cache.get(interaction.channelId);
    if (!channel) return;
    //if not the right channel return
    if (musicChannelId != channel.id) return;
    //if not the right message, return
    if (musicChannelMessage != message.id) return;

    if (!member) member = guild.members.cache.get(user.id);
    if (!member) member = await guild.members.fetch(user.id).catch(() => {});
    if (!member) return;
    //if the member is not connected to a vc, return
    if (!member.voice.channel) return interaction.reply({
      ephemeral: true,
      content: ":x: **Please Connect to a Voice Channel first!**"
    })
    //now its time to start the music system
    if (!member.voice.channel)
      return interaction.reply({
        content: `<:error:951379674418782218> **Please join a Voice Channel first!**`,
        ephemeral: true
      })

    var player = client.manager.players.get(interaction.guild.id);
    //if not connected to the same voice channel, then make sure to connect to it!
    if (player && member.voice.channel.id !== player.voiceChannel)
      return interaction.reply({
        content: `<:error:951379674418782218> **Please join __my__ Voice Channel first! <#${player.voiceChannel}>**`,
        ephemeral: true
      })
    if (interaction.isButton()) {
      if (!player || !player.queue || !player.queue.current) {
        return interaction.reply({
          content: "<:error:951379674418782218> Nothing Playing yet",
          ephemeral: true
        })
      }
      //here i use my check_if_dj function to check if he is a dj if not then it returns true, and it shall stop!
      if (player && interaction.customId != `Lyrics` && check_if_dj(client, member, player.queue.current)) {
        return interaction.reply({
          embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(client.getFooter(es))
            .setTitle(`<:error:951379674418782218> **You are not a DJ and not the Song Requester!**`)
            .setDescription(`**DJ-ROLES:**\n${check_if_dj(client, interaction.member, player.queue.current)}`)
          ],
          ephemeral: true
        });
      }
      switch (interaction.customId) {
        case "Skip": {
          //if ther is nothing more to skip then stop music and leave the Channel
          if (!player.queue || !player.queue.size || player.queue.size === 0) {
            //if its on autoplay mode, then do autoplay before leaving...
            if (player.get("autoplay")) return autoplay(client, player, "skip");
            interaction.reply({
              embeds: [new MessageEmbed()
                .setColor(es.color)
                .setTimestamp()
                .setTitle(`⏹ **Stopped playing and left the Channel**`)
                .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                  dynamic: true
                })))
              ]
            })
            await player.destroy()
            //edit the message so that it's right!
            var data = generateQueueEmbed(client, guild.id, true)
            message.edit(data).catch((e) => {
              //console.log(e.stack ? String(e.stack).grey : String(e).grey)
            })
            return
          }
          //skip the track
          await player.stop();
          interaction.reply({
            embeds: [new MessageEmbed()
              .setColor(es.color)
              .setTimestamp()
              .setTitle(`⏭ **Skipped to the next Song!**`)
              .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                dynamic: true
              })))
            ]
          })
          //edit the message so that it's right!
          var data = generateQueueEmbed(client, guild.id)
          message.edit(data).catch((e) => {
            //console.log(e.stack ? String(e.stack).grey : String(e).grey)
          })
        }
        break;
      case "Stop": {
        //Stop the player
        interaction.reply({
          embeds: [new MessageEmbed()
            .setColor(es.color)
            .setTimestamp()
            .setTitle(`⏹ **Stopped playing and left the Channel**`)
            .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
              dynamic: true
            })))
          ]
        })
        if (player) {
          await player.destroy();
          //edit the message so that it's right!
          var data = generateQueueEmbed(client, guild.id, true)
          message.edit(data).catch((e) => {
            //console.log(e.stack ? String(e.stack).grey : String(e).grey)
          })
        } else {
          //edit the message so that it's right!
          var data = generateQueueEmbed(client, guild.id, true)
          message.edit(data).catch((e) => {
            //console.log(e.stack ? String(e.stack).grey : String(e).grey)
          })
        }
      }
      break;
      case "Pause": {
        if (!player.playing) {
          player.pause(false);
          interaction.reply({
            embeds: [new MessageEmbed()
              .setColor(es.color)
              .setTimestamp()
              .setTitle(`▶️ **Resumed!**`)
              .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                dynamic: true
              })))
            ]
          })
        } else {
          //pause the player
          player.pause(true);

          interaction.reply({
            embeds: [new MessageEmbed()
              .setColor(es.color)
              .setTimestamp()
              .setTitle(`⏸ **Paused!**`)
              .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
                dynamic: true
              })))
            ]
          })
        }
        //edit the message so that it's right!
        var data = generateQueueEmbed(client, guild.id)
        message.edit(data).catch((e) => {
          //console.log(e.stack ? String(e.stack).grey : String(e).grey)
        })
      }
      break;
      case "Autoplay": {
        //pause the player
        player.set(`autoplay`, !player.get(`autoplay`))
        interaction.reply({
          embeds: [new MessageEmbed()
            .setColor(es.color)
            .setTimestamp()
            .setTitle(`${player.get(`autoplay`) ? `<a:yes:945004422172385330> **Enabled Autoplay**`: `<:error:951379674418782218> **Disabled Autoplay**`}`)
            .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
              dynamic: true
            })))
          ]
        })
        //edit the message so that it's right!
        var data = generateQueueEmbed(client, guild.id)
        message.edit(data).catch((e) => {
          //console.log(e.stack ? String(e.stack).grey : String(e).grey)
        })
      }
      break;
      case "Shuffle": {
        //set into the player instance an old Queue, before the shuffle...
        player.set(`beforeshuffle`, player.queue.map(track => track));
        //shuffle the Queue
        player.queue.shuffle();
        //Send Success Message
        interaction.reply({
          embeds: [new MessageEmbed()
            .setColor(es.color)
            .setTimestamp()
            .setTitle(`🔀 **Shuffled ${player.queue.length} Songs!**`)
            .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
              dynamic: true
            })))
          ]
        })
        //edit the message so that it's right!
        var data = generateQueueEmbed(client, guild.id)
        message.edit(data).catch((e) => {
          //console.log(e.stack ? String(e.stack).grey : String(e).grey)
        })
      }
      break;
      case "Song": {
        //if there is active queue loop, disable it + add embed information
        if (player.queueRepeat) {
          player.setQueueRepeat(false);
        }
        //set track repeat to revers of old track repeat
        player.setTrackRepeat(!player.trackRepeat);
        interaction.reply({
          embeds: [new MessageEmbed()
            .setColor(es.color)
            .setTimestamp()
            .setTitle(`${player.trackRepeat ? `<a:yes:945004422172385330> **Enabled Song Loop**`: `<:error:951379674418782218> **Disabled Song Loop**`}`)
            .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
              dynamic: true
            })))
          ]
        })
        //edit the message so that it's right!
        var data = generateQueueEmbed(client, guild.id)
        message.edit(data).catch((e) => {
          //console.log(e.stack ? String(e.stack).grey : String(e).grey)
        })
      }
      break;
      case "Queue": {
        //if there is active queue loop, disable it + add embed information
        if (player.trackRepeat) {
          player.setTrackRepeat(false);
        }
        //set track repeat to revers of old track repeat
        player.setQueueRepeat(!player.queueRepeat);
        interaction.reply({
          embeds: [new MessageEmbed()
            .setColor(es.color)
            .setTimestamp()
            .setTitle(`${player.queueRepeat ? `<a:yes:945004422172385330> **Enabled Queue Loop**`: `<:error:951379674418782218> **Disabled Queue Loop**`}`)
            .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
              dynamic: true
            })))
          ]
        })
        //edit the message so that it's right!
        var data = generateQueueEmbed(client, guild.id)
        message.edit(data).catch((e) => {
          //console.log(e.stack ? String(e.stack).grey : String(e).grey)
        })
      }
      break;
      case "Forward": {
        //get the seektime variable of the user input
        var seektime = Number(player.position) + 10 * 1000;
        //if the userinput is smaller then 0, then set the seektime to just the player.position
        if (10 <= 0) seektime = Number(player.position);
        //if the seektime is too big, then set it 1 sec earlier
        if (Number(seektime) >= player.queue.current.duration) seektime = player.queue.current.duration - 1000;
        //seek to the new Seek position
        await player.seek(Number(seektime));
        interaction.reply({
          embeds: [new MessageEmbed()
            .setColor(es.color)
            .setTimestamp()
            .setTitle(`⏩ **Forwarded the song for \`10 Seconds\`!**`)
            .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
              dynamic: true
            })))
          ]
        })
        //edit the message so that it's right!
        var data = generateQueueEmbed(client, guild.id)
        message.edit(data).catch((e) => {
          //console.log(e.stack ? String(e.stack).grey : String(e).grey)
        })
      }
      break;
      case "Rewind": {
        var seektime = player.position - 10 * 1000;
        if (seektime >= player.queue.current.duration - player.position || seektime < 0) {
          seektime = 0;
        }
        //seek to the new Seek position
        await player.seek(Number(seektime));
        interaction.reply({
          embeds: [new MessageEmbed()
            .setColor(es.color)
            .setTimestamp()
            .setTitle(`⏪ **Rewinded the song for \`10 Seconds\`!**`)
            .setFooter(client.getFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({
              dynamic: true
            })))
          ]
        })
        //edit the message so that it's right!
        var data = generateQueueEmbed(client, guild.id)
        message.edit(data).catch((e) => {
          //console.log(e.stack ? String(e.stack).grey : String(e).grey)
        })
      }
      break;
      case "Lyrics": {

      }
      break;
      }
    }
    if (interaction.isSelectMenu()) {
      let link = "https://open.spotify.com/playlist/7bGO1IpfFVLXZBds6Ez5W0?si=ec9fb3aa13eb455c";
      if (interaction.values[0]) {
        //ncs | no copyrighted music
        if (interaction.values[0].toLowerCase().startsWith("n")) link = "https://open.spotify.com/playlist/7sZbq8QGyMnhKPcLJvCUFD";
        //remixes from Magic Release
        if (interaction.values[0].toLowerCase().startsWith("p")) link = "https://www.youtube.com/watch?v=NX7BqdQ1KeU&list=PLYUn4YaogdahwfEkuu5V14gYtTqODx7R2";
        //default
        if (interaction.values[0].toLowerCase().startsWith("d")) link = "https://open.spotify.com/playlist/4KnB84S323Gj33Z0PpYn07?si=df1a633c797f49cb";
        //N3ÜRØ
        if (interaction.values[0].toLowerCase().startsWith("re")) link = "https://youtube.com/playlist?list=PLD90qtg-Uz9RDC1GSCxdimkIZy-fwFOaV"
        //rock
        if (interaction.values[0].toLowerCase().startsWith("ro")) link = "https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U";
        //oldgaming
        if (interaction.values[0].toLowerCase().startsWith("o")) link = "https://www.youtube.com/watch?v=iFOAJ12lDDU&list=PLYUn4YaogdahPQPTnBGCrytV97h8ABEav"
        //gaming
        if (interaction.values[0].toLowerCase().startsWith("g")) link = "https://open.spotify.com/playlist/4a54P2VHy30WTi7gix0KW6";
        //Charts
        if (interaction.values[0].toLowerCase().startsWith("cha")) link = "https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl"
        //Nightcore
        if (interaction.values[0].toLowerCase().startsWith("chi")) link = "https://youtube.com/playlist?list=PLLPPSrq_wguKQ2EL_-drEiyPgGuYoSTex";
        //Jazz
        if (interaction.values[0].toLowerCase().startsWith("j")) link = "https://open.spotify.com/playlist/37i9dQZF1DXbITWG1ZJKYt";
        //blues
        if (interaction.values[0].toLowerCase().startsWith("b")) link = "https://open.spotify.com/playlist/37i9dQZF1DXd9rSDyQguIk";
        //Lofi-Girl
        if (interaction.values[0].toLowerCase().startsWith("s")) link = "https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM?si=a6d1a35edd194b4d";
        //magic-release
        if (interaction.values[0].toLowerCase().startsWith("ma")) link = "https://www.youtube.com/watch?v=WvMc5_RbQNc&list=PLYUn4Yaogdagvwe69dczceHTNm0K_ZG3P"
        //Drift Phonk
        if (interaction.values[0].toLowerCase().startsWith("me")) link = "https://open.spotify.com/playlist/7bGO1IpfFVLXZBds6Ez5W0?si=ec9fb3aa13eb455c";
        //Phonk
        if (interaction.values[0].toLowerCase().startsWith("h")) link = "https://open.spotify.com/playlist/7bGO1IpfFVLXZBds6Ez5W0?si=ec9fb3aa13eb455c";
      }
      interaction.reply({
        embeds: [new MessageEmbed()
          .setColor(es.color)
          .setAuthor(client.getAuthor(`Loading '${interaction.values[0] ? interaction.values[0] : "Default"}' Music Mix`, "https://imgur.com/xutrSuq.gif", link))
          .setTitle(eval(client.la[ls]["cmds"]["music"]["playmusicmix"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["music"]["playmusicmix"]["variable2"]))
          .addField(eval(client.la[ls]["cmds"]["music"]["playmusicmix"]["variablex_3"]), eval(client.la[ls]["cmds"]["music"]["playmusicmix"]["variable3"]))
          .setFooter(client.getFooter(es))
        ]
      })
      //play the SONG from YOUTUBE
      playermanager(client, {
        guild,
        member,
        author: member.user,
        channel
      }, Array(link), `song:youtube`, interaction, "songoftheday");
    }

  })
  //this was step 1 now we need to code the REQUEST System...


  client.on("messageCreate", async message => {
    if (!message.guild) return;
    var data = client.musicsettings.get(message.guild.id);
    const musicChannelId = data.channel;
    //if not setupped yet, return
    if (!musicChannelId || musicChannelId.length < 5) return;
    //if not the right channel return
    if (musicChannelId != message.channel.id) return;
    //Delete the message once it got sent into the channel, bot messages after 5 seconds, user messages instantly!
    if (message.author.id === client.user.id) {
      await delay(5000);
      if (!message.deleted) {
        message.delete().catch((e) => {
          console.log(e)
        })
      }
    } else {
      if (!message.deleted) {
        message.delete().catch((e) => {
          console.log(e)
        })
      }
    }
    if (message.author.bot) return; // if the message  author is a bot, return aka ignore the inputs
    const prefix = client.settings.get(message.guild.id, "prefix")
    //get the prefix regex system
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`); //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    var args;
    var cmd;
    if (prefixRegex.test(message.content)) {
      //if there is a attached prefix try executing a cmd!
      const [, matchedPrefix] = message.content.match(prefixRegex); //now define the right prefix either ping or not ping
      args = message.content.slice(matchedPrefix.length).trim().split(/ +/); //create the arguments with sliceing of of the rightprefix length
      cmd = args.shift().toLowerCase(); //creating the cmd argument by shifting the args by 1
      if (cmd || cmd.length === 0) return // message.reply("<:error:951379674418782218> **Please use a Command Somewhere else!**").then(msg=>{setTimeout(()=>{try{msg.delete().catch(() => {});}catch(e){ }}, 3000)})

      var command = client.commands.get(cmd); //get the command from the collection
      if (!command) command = client.commands.get(client.aliases.get(cmd)); //if the command does not exist, try to get it by his alias
      if (command) //if the command is now valid
      {
        return // message.reply("<:error:951379674418782218> **Please use a Command Somewhere else!**").then(msg=>{setTimeout(()=>{try{msg.delete().catch(() => {});}catch(e){ }}, 3000)})
      }
    }
    //getting the Voice Channel Data of the Message Member
    const {
      channel
    } = message.member.voice;
    //if not in a Voice Channel return!
    if (!channel) return message.reply("<:error:951379674418782218> **Пожалуйста зайдите в голосовой канал!**").then(msg => {
      setTimeout(() => {
        try {
          msg.delete().catch(() => {});
        } catch (e) {}
      }, 5000)
    })
    //get the lavalink erela.js player information
    const player = client.manager.players.get(message.guild.id);
    //if there is a player and the user is not in the same channel as the Bot return information message
    if (player && channel.id !== player.voiceChannel) return message.reply(`<:error:951379674418782218> **Пожалуйста зайдите в  __мой__ голосовой канал! <#${player.voiceChannel}>**`).then(msg => {
      setTimeout(() => {
        try {
          msg.delete().catch(() => {});
        } catch (e) {}
      }, 3000)
    })
    else {
      return playermanager(client, message, message.content.trim().split(/ +/), "request:song");
    }
  })


}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
function generateQueueEmbed(client, guildId, leave) {
  const guild = client.guilds.cache.get(guildId)
  if (!guild) return;
  const es = client.settings.get(guild.id, "embed")
  const ls = client.settings.get(guild.id, "language")
  var embeds = [
    new MessageEmbed()
    .setColor(es.color)
    .setTitle(`📃 Очередь сервера __${guild.name}__`)
    .setDescription(`**В настоящее время играет __0 треков__ в очереди**`)
    .setThumbnail(guild.iconURL({
      dynamic: true
    })),
    new MessageEmbed()
    .setColor(es.color)
    .setFooter(client.getFooter(es))
    .setImage(guild.banner ? guild.bannerURL({
      size: 4096
    }) : "https://media.discordapp.net/attachments/920742158888222754/944962578101190686/6c3e382db9a5ce5461a6f0796d5bd076.gif")
    .setTitle(`Начните слушать музыку, подключившись к голосовому каналу и отправив **URL на песню** или **Название песни** в этот канал!`)
      .setDescription(`> *Я поддерживаю <:Youtube:944355914868219904> Youtube, <:Spotify:944355914989834270> Spotify, <:soundcloud:944355914847248384> Soundcloud и прямые ссылки на MP3!*`)
  ]
  const player = client.manager.players.get(guild.id);
  if (!leave && player && player.queue && player.queue.current) {
    embeds[1].setImage(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setFooter(client.getFooter(`Запросил: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
        dynamic: true
      })))
      .addField(`${emoji.msg.time} Длинна: `, `\`${format(player.queue.current.duration).split(" | ")[0]}\` | \`${format(player.queue.current.duration).split(" | ")[1]}\``, true)
      .addField(`${emoji.msg.song_by} Автор: `, `\`${player.queue.current.author}\``, true)
      .addField(`${emoji.msg.repeat_mode} Длинна очереди: `, `\`${player.queue.length} треков\``, true)
      .setAuthor(client.getAuthor(`${player.queue.current.title}`, "https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif", player.queue.current.uri))
    delete embeds[1].description;
    delete embeds[1].title;
    //get the right tracks of the current tracks
    const tracks = player.queue;
    var maxTracks = 10; //tracks / Queue Page
    //get an array of quelist where 10 tracks is one index in the array
    var songs = tracks.slice(0, maxTracks);
    embeds[0] = new MessageEmbed()
    .setTitle(`📃 Очередь сервера __${guild.name}__  -  [ ${player.queue.length} треков ]`)
    .setColor(es.color)
    .setDescription(String(songs.map((track, index) => `**\` ${++index}. \` ${track.uri ? `[${track.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${track.uri})` : track.title}** - \`${track.isStream ? `Прямая трансляция` : format(track.duration).split(` | `)[0]}\`\n> *Запросил: __${track.requester.tag}__*`).join(`\n`)).substr(0, 2048));
    if(player.queue.length > 10)
      embeds[0].addField(`**\` N. \` *${player.queue.length > maxTracks ? player.queue.length - maxTracks : player.queue.length} другие треки ...***`, `\u200b`)
    embeds[0].addField(`**\` 0. \` __Текущий трек__**`, `**${player.queue.current.uri ? `[${player.queue.current.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${player.queue.current.uri})` : player.queue.current.title}** - \`${player.queue.current.isStream ? `Прямая трансляция` : format(player.queue.current.duration).split(` | `)[0]}\`\n> *Запросил: __${player.queue.current.requester.tag}__*`)
  }
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
  var musicmixMenu = new MessageSelectMenu()
    .setCustomId("MessageSelectMenu")
    .addOptions(["NCS | No Copyright Music", "Lofi-Girl", "Gaming", "Nightcore", "Rock", "Jazz", "Blues", "Metal", "Phonk", "N3URO", "Default"].map((t, index) => {
      return {
        label: t.substr(0, 25),
        value: t.substr(0, 25),
        description: `Загрузить музыкальный плейлист: "${t}"`.substr(0, 50),
        emoji: Emojis[index]
      }
    }))
  var stopbutton = new MessageButton().setStyle('DANGER').setCustomId('Stop').setEmoji(`🏠`).setLabel(`Остановить`).setDisabled()
  var skipbutton = new MessageButton().setStyle('PRIMARY').setCustomId('Skip').setEmoji(`⏭`).setLabel(`Пропустить`).setDisabled();
  var shufflebutton = new MessageButton().setStyle('PRIMARY').setCustomId('Shuffle').setEmoji('🔀').setLabel(`Перемешать`).setDisabled();
  var pausebutton = new MessageButton().setStyle('SECONDARY').setCustomId('Pause').setEmoji('⏸').setLabel(`Пауза`).setDisabled();
  var autoplaybutton = new MessageButton().setStyle('SUCCESS').setCustomId('Autoplay').setEmoji('🔁').setLabel(`Автопроигрывание`).setDisabled();
  var songbutton = new MessageButton().setStyle('SUCCESS').setCustomId('Song').setEmoji(`🔁`).setLabel(`Повтор песни`).setDisabled();
  var queuebutton = new MessageButton().setStyle('SUCCESS').setCustomId('Queue').setEmoji(`🔂`).setLabel(`Повтор очереди`).setDisabled();
  var forwardbutton = new MessageButton().setStyle('PRIMARY').setCustomId('Forward').setEmoji('⏩').setLabel(`+10 секунд`).setDisabled();
  var rewindbutton = new MessageButton().setStyle('PRIMARY').setCustomId('Rewind').setEmoji('⏪').setLabel(`-10 секунд`).setDisabled();
  var lyricsbutton = new MessageButton().setStyle('PRIMARY').setCustomId('Lyrics').setEmoji('📝').setLabel(`Текст`).setDisabled();
  if (!leave && player && player.queue && player.queue.current) {
    skipbutton = skipbutton.setDisabled(false);
    shufflebutton = shufflebutton.setDisabled(false);
    stopbutton = stopbutton.setDisabled(false);
    songbutton = songbutton.setDisabled(false);
    queuebutton = queuebutton.setDisabled(false);
    forwardbutton = forwardbutton.setDisabled(false);
    rewindbutton = rewindbutton.setDisabled(false);
    autoplaybutton = autoplaybutton.setDisabled(false)
    pausebutton = pausebutton.setDisabled(false)
    if (player.get("autoplay")) {
      autoplaybutton = autoplaybutton.setStyle('SECONDARY')
    }
    if (!player.playing) {
      pausebutton = pausebutton.setStyle('SUCCESS').setEmoji('▶️').setLabel(`Возобновить`)
    }
    if (!player.queueRepeat && !player.trackRepeat) {
      songbutton = songbutton.setStyle('SUCCESS')
      queuebutton = queuebutton.setStyle('SUCCESS')
    }
    if (player.trackRepeat) {
      songbutton = songbutton.setStyle('SECONDARY')
      queuebutton = queuebutton.setStyle('SUCCESS')
    }
    if (player.queueRepeat) {
      songbutton = songbutton.setStyle('SUCCESS')
      queuebutton = queuebutton.setStyle('SECONDARY')
    }
  }
  //now we add the components!
  var components = [
    new MessageActionRow().addComponents([
      musicmixMenu
    ]),
    new MessageActionRow().addComponents([
      skipbutton,
      stopbutton,
      pausebutton,
      autoplaybutton,
      shufflebutton,
    ]),
    new MessageActionRow().addComponents([
      songbutton,
      queuebutton,
      forwardbutton,
      rewindbutton,
      lyricsbutton,
    ]),
  ]
  return {
    embeds,
    components
  }
}
module.exports.generateQueueEmbed = generateQueueEmbed;
