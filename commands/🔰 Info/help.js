const {
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  MessageSelectMenu
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  duration,
  handlemsg
} = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Показывает информацию про все команды или одну конкретную",
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix, player, es, ls) => {
    if (args[0]) {
      const embed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null);
      const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
      var cat = false;
      if (!cmd) {
        cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
      }
      if (!cmd && (!cat || cat == null)) {
        return message.reply({
          embeds: [embed.setColor(es.wrongcolor).setDescription(handlemsg(client.la[ls].cmds.info.help.noinfo, {
            command: args[0].toLowerCase()
          }))]
        });
      } else if (cat) {
        var category = cat;
        const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
        const embed = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
          .setThumbnail(client.user.displayAvatarURL())
          .setTitle(`💿 Подробная информация о: \`${cat.name}\``)
          .setFooter(client.getFooter("Нет пользовательской информации для ", client.user.displayAvatarURL()));
        let embeds = allotherembeds_eachcategory();
        if (cat == "🔰 Информация")
          return message.reply({
            embeds: [embeds[0]]
          })
        if (cat == "🎶 Музыка")
          return message.reply({
            embeds: [embeds[1]]
          })
        if (cat == "👀 Фильтры")
          return message.reply({
            embeds: [embeds[2]]
          })
        if (cat == "💰 Премиум")
          return message.reply({
            embeds: [embeds[3]]
          })
        if (cat == "⚙️ Настройки")
          return message.reply({
            embeds: [embeds[4]]
          })
        if (cat == "👑 Владелец")
          return message.reply({
            embeds: [embeds[5]]
          })
        embed.setDescription(`:x: Информация об этой категории не найдена`)
        return message.reply({
          embeds: [embed]
        })
      }
      if (cmd.name) embed.addField("**💿 Имя команды**", `\`${cmd.name}\``);
      if (cmd.name) embed.setTitle(`💿 Подробная информация о: \`${cmd.name}\``);
      if (cmd.description) embed.addField("**💿 Описание**", `\`\`\`${cmd.description}\`\`\``);
      if (cmd.aliases) try {
        embed.addField("**💿 Сокращение**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
      } catch {}
      if (cmd.cooldown) embed.addField("**💿 Медленный режим**", `\`\`\`${cmd.cooldown} секунд\`\`\``);
      else embed.addField("**💿 Стандартный медленный режим**", `\`\`\`1 секунда\`\`\``);
      if (cmd.usage) {
        embed.addField("**💿 Использовать**", `\`\`\`${prefix}${cmd.usage}\`\`\``);
        embed.setFooter(client.getFooter("Syntax: <> = required, [] = optional", es.footericon));
      }
      return message.reply({
        embeds: [embed]
      });
    } else {
      let button_back = new MessageButton().setStyle('SUCCESS').setCustomId('1').setEmoji("833802907509719130").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.back))
      let button_home = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("🏠").setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.home))
      let button_forward = new MessageButton().setStyle('SUCCESS').setCustomId('3').setEmoji('832598861813776394').setLabel(handlemsg(client.la[ls].cmds.info.help.buttons.forward))
      let menuOptions = [{
          label: "Обзор",
          value: "Overview",
          emoji: "833101995723194437",
          description: "Мой обзор меня!"
        },
        {
          label: "Информация",
          value: "Information",
          emoji: "🔰",
          description: "Команды для обмена информацией"
        },
        {
          label: "Музыка",
          value: "Music",
          emoji: "🎶",
          description: "Команды для воспроизведения музыки / добавить фильтр"
        },
        {
          label: "Фильтры",
          value: "Filter",
          emoji: "👀",
          description: "Команды для добавления фильтров к музыке"
        },
        {
          label: "Премиум",
          value: "Premium",
          emoji: "💰",
          description: "Команды для Премиум сервера"
        },
        {
          label: "Настройки",
          value: "Settings",
          emoji: "⚙️",
          description: "Команды для изменения настроек сервера"
        },
        {
          label: "Владелец",
          value: "Owner",
          emoji: "👑",
          description: "Команды для управления ботом"
        },
      ];
      let menuSelection = new MessageSelectMenu()
        .setCustomId("MenuSelection")
        .setPlaceholder("Нажмите на меня, чтобы просмотреть страницу(ы) Help-Menu-Category")
        .setMinValues(1)
        .setMaxValues(5)
        .addOptions(menuOptions.filter(Boolean))
      let buttonRow = new MessageActionRow().addComponents([button_back, button_home, button_forward])
      let SelectionRow = new MessageActionRow().addComponents([menuSelection])
      const allbuttons = [buttonRow, SelectionRow]
      //define default embed
      let OverviewEmbed = new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setFooter(client.getFooter("Обзор страницы\n" + client.user.username, client.user.displayAvatarURL()))
        .setTitle(`Информация о __${client.user.username}__`)
        .addField(":muscle: **__Мои возможности__**",
          `>>> :notes: Я продвинутый музыкальный бот, который использует <:Spotify:944355914989834270>, **Музыкальную настройку канала** с участием **Аудио фильтрации**
:video_game: Уникальная система музыкальных запросов и многое другое!`)
        .addField(":question: **__Так как же мной пользоватся?__**",
          `>>> \`${prefix}setup-music #Channel\` Чтобы создать музыкальную систему, подключитесь к **Голосовому каналу** и введите желаемую песню!

но вы также можете сделать \`${prefix}play <songname/urlsong>\` без настройки!`)
        .addField(":chart_with_upwards_trend: **__Моя статистика:__**",
          `>>> :gear: **${client.commands.map(a=>a).length} команд**
:file_folder: on **${client.guilds.cache.size} серверов**
⌚️ **${duration(client.uptime).map(i=> `\`${i}\``).join("︲")} время работы бота**
📶 **\`${Math.floor(client.ws.ping)}ms\` Задержка**`)


      //Send message with buttons
      let helpmsg = await message.reply({
        content: `***Нажмите на  __кнопки__ чтобы переходить на другую страницу***`,
        embeds: [OverviewEmbed],
        components: allbuttons
      }).catch(e => {
        console.log(e.stack ? String(e.stack).grey : String(e).grey)
        return message.reply(`:x: Я не могу отправить help? Возможно, мне не хватает разрешения на **Embed Links**`).catch(() => {})
      });
      var edited = false;
      var embeds = [OverviewEmbed]
      for (const e of allotherembeds_eachcategory(true))
        embeds.push(e)
      let currentPage = 0;

      //create a collector for the thinggy
      const collector = helpmsg.createMessageComponentCollector({
        filter: (i) => (i.isButton() || i.isSelectMenu()) && i.user && i.message.author.id == client.user.id,
        time: 180e3
      });
      //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
      collector.on('collect', async b => {
        try {
          if (b.isButton()) {
            if (b.user.id !== message.author.id)
              return b.reply({
                content: handlemsg(client.la[ls].cmds.info.help.buttonerror, {
                  prefix: prefix
                }),
                ephemeral: true
              });

            //page forward
            if (b.customId == "1") {
              //b.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
              if (currentPage !== 0) {
                currentPage -= 1
              } else {
                currentPage = embeds.length - 1
              }
            }
            //go home
            else if (b.customId == "2") {
              //b.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
              currentPage = 0;
            }
            //go forward
            else if (b.customId == "3") {
              //b.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
              if (currentPage < embeds.length - 1) {
                currentPage++;
              } else {
                currentPage = 0
              }
            }
            await helpmsg.edit({
              embeds: [embeds[currentPage]],
              components: allbuttons
            }).catch(e => {})
            b.deferUpdate().catch(e => {})


          }
          if (b.isSelectMenu()) {
            //b.reply(`***Going to the ${b.customId.replace("button_cat_", "")} Page***, *please wait 2 Seconds for the next Input*`, true)
            //information, music, admin, settings, voice, minigames, nsfw
            let index = 0;
            let vembeds = []
            let theembeds = [OverviewEmbed, ...allotherembeds_eachcategory()];
            for (const value of b.values) {
              switch (value.toLowerCase()) {
                case "overview":
                  index = 0;
                  break;
                case "information":
                  index = 1;
                  break;
                case "music":
                  index = 2;
                  break;
                case "filter":
                  index = 3;
                  break;
                case "premium":
                  index = 4;
                  break;
                case "settings":
                  index = 5;
                  break;
                case "owner":
                  index = 6;
                  break;
              }
              vembeds.push(theembeds[index])
            }
            b.reply({
              embeds: vembeds,
              ephemeral: true
            });
          }
        } catch (e) {
          console.log(e.stack ? String(e.stack).grey : String(e).grey)
          console.log(String(e).italic.italic.grey.dim)
        }
      });

      collector.on('end', collected => {
        //array of all disabled buttons
        let d_buttonRow = new MessageActionRow().addComponents([button_back.setDisabled(true), button_home.setDisabled(true), button_forward.setDisabled(true)])
        const alldisabledbuttons = [d_buttonRow]
        
        if (!edited) {
          edited = true;
          helpmsg.edit({
            content: handlemsg(client.la[ls].cmds.info.help.timeended, {
              prefix: prefix
            }),
            embeds: [helpmsg.embeds[0]],
            components: alldisabledbuttons
          }).catch((e) => {})
        }
      });
    }

    function allotherembeds_eachcategory(filterdisabled = false) {
      //ARRAY OF EMBEDS
      var embeds = [];

      //INFORMATION COMMANDS
      var embed0 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🔰 Info").size}\`] 🔰 Информационные команды 🔰`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🔰 Info").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Подкатегории команд:**__")
        .addField(`<:Discord:944391580159197204> **Команды, связанные с сервером**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "server").sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField(`<:Discord_bot:944391580071129168> **Команды, связанные с ботом**`, ">>> " + client.commands.filter((cmd) => cmd.category === "🔰 Info" && cmd.type === "bot").sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed0)

      //MUSIC COMMANDS type: song, queue, queuesong, bot
      var embed3 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "🎶 Music").size}\`] 🎶 Музыкальные команды 🎶`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "🎶 Music").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Подкатегории команд:**__")
        .addField("📑 **Queue Commands**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type?.includes("queue")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("<a:play:944391875815669760> **Музыкальные команды**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type?.includes("song")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("<:Discord_bot:944391580071129168> **Команды бота**", "> " + client.commands.filter((cmd) => cmd.category === "🎶 Music" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed3)

      //FILTER COMMANDS
      var embed4 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "👀 Filter").size}\`] 👀 Команды фильтра 👀`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "👀 Filter").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
      embeds.push(embed4)

      //CUSTOM QUEUE COMMANDS
      var embed5 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "💰 Premium").size}\`] 💰 Премиум`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "💰 Premium").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Подкатегории команд:**__")
        .addField("<:Discord_bot:944391580071129168> **Команды, связанные с ботом**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("🎶 **Команды, связанные с музыкой**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type?.includes("music")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed5)

      //Settings
      var embed8 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").size}\`] ⚙️ Команды настроек ⚙️`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Подкатегории команд:**__")
        .addField("<:Discord_bot:944391580071129168> **Команды, связанные с ботом**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("🎶 **Команды, связанные с музыкой**", "> " + client.commands.filter((cmd) => cmd.category === "⚙️ Settings" && cmd.type?.includes("music")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed8)

      //Owner
      var embed9 = new MessageEmbed()
        .setTitle(`[\`${client.commands.filter((cmd) => cmd.category === "👑 Owner").size}\`] 👑 Команды владельца 👑`)
        .setDescription(`> *${client.commands.filter((cmd) => cmd.category === "👑 Owner").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}*`)
        .addField("\u200b", "__**Подкатегории команд:**__")
        .addField("<:Discord:944391580159197204> **Информация и управление**", "> " + client.commands.filter((cmd) => cmd.category === "👑 Owner" && cmd.type?.includes("info")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
        .addField("<:Discord_bot:944391580071129168> **Настройте бота**", "> " + client.commands.filter((cmd) => cmd.category === "👑 Owner" && cmd.type?.includes("bot")).sort((a, b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲"))
      embeds.push(embed9)

      return embeds.map((embed, index) => {
        return embed
          .setColor(es.color)
          .setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
          .setFooter(client.getFooter(`Страница ${index + 1} / ${embeds.length}\nЧтобы просмотреть описания и информацию о командах, введите: ${config.prefix}help [название команды]`, client.user.displayAvatarURL()));
      })
    }

  }
}