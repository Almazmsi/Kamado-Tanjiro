# Kamado-Tanjiro
_**Музыкальный бот с использованием lavalink и discord.js v13**_

> Это [форк](https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js) так сказать основной репозитории бота, но со своими изменениями. То есть для личного использования, или для верификации чтобы быть популярным в дискорде. 

Сделан данный бот с помощью [Lavalink](https://github.com/freyacodes/Lavalink) и [Erela.js](https://erelajs-docs.netlify.app/docs/gettingstarted.html). Вы можете пригласить 2 вида ботов. Как мой так и данного владельца.

- Пригласить основного бота Tomato: [Lava Music](https://lava.milrato.dev/)

- Пригласить моего отредактированного бота: [Kamado-Tanjiro](https://discord.com/api/oauth2/authorize?client_id=949758120001929226&permissions=8&scope=bot%20applications.commands)


### **_Особенности:_**

- _Автоматическое возобновление_
- _Супер быстро и качественно благодаря LAVALINK_
- _Множество команд на основе музыки_
- _Пример системы Premium_
- _Все настраивается (вставки, язык и значения музыки по умолчанию, такие как: громкость, фильтр, эквалайзер, автовоспроизведение и многое другое)_
- _Dj-система_
- _10+ фильтров_
- _Стабильная и актуальная версия discord.js v13_
- _Поддержка 10 источников музыки + каналы сцены и нити_
- _Работает на любом vps, с публичными и частными Lavalink нодами_

### _Установка | Или инструкция для чайников_

> `1.` Установи [node.js v16.6+](https://nodejs.org/en) или выше
> 
> `2.` Скачай и распакуй данную репозиторию | или клонируй её самостоятельно `https://github.com/Almazmsi/Kamado-Tanjiro.git`
> 
> `3.` Установите все пакеты с помощью npm install | важные пакеты это `npm install discord.js@latest erela.js`
> 
> `4.` Заполните параметры, ПРАВИЛЬНО в botconfig/config.json!
> 
>`5.` [Скачай Lavalink](https://github.com/freyacodes/Lavalink/releases/download/3.4/Lavalink.jar) и скачай Java 13 (Java 11 рекомендована)
> 
> ㅤㅤㅤㅤㅤㅤ`5.1.` Поместите файл `lavalink.jar` в тот же репозиторий, что и файл `index.js` вашего бота, и, возможно, скорректируйте `application.yml` (и `config.json`).
> 
> ㅤㅤㅤㅤㅤㅤ`5.2.` Запустите файл Lavalink командой: `java -jar Lavalink.jar` Если вы используете vps хостинг на Linux, то тогда используйте команду `pm2 start java -jar Lavalink.jar` **Убедитесь что есть файл application.yml В противном случае он не будет работать!**
> 
> `6.` Запустите бота с помощью `node index.js` / `node .` / `npm start`

### _Примечание_
> Если бот будет некорректно запускаться или выдавать ошибки, то просто удалите файл `package.json` и пропишите в консоле `npm init`


### Что же тут было исправлено такого что я решил сделать форк? Ну и сразу ответы на вопросы будут, почему не работает то или это

### 1. Missing Intent
![unknown](https://user-images.githubusercontent.com/72695998/154854554-cd2a2153-9ac3-404a-80f6-089961568458.png)
![opera_UEYtDE9mtP](https://user-images.githubusercontent.com/72695998/154824780-f60958bd-859e-4163-baeb-d6df81b56719.png)

### 2. Lavalink not work (use server 02 and 03, but i don't know 01 server)

ㅤㅤ**02 server**
![Code_-_Insiders_To1xbiJfq9](https://user-images.githubusercontent.com/72695998/154824816-16789f10-43ac-4ee5-843e-41b1980af369.png)
ㅤㅤ**03 server**
![Code_-_Insiders_DyhJZx9X57](https://user-images.githubusercontent.com/72695998/154824822-3aa08caa-25db-4d19-9984-5d90ef711a34.png)

### 3. Missing Acces to use owner cmd

ㅤㅤ**copy**
![DiscordPTB_jNcZazBXhD](https://user-images.githubusercontent.com/72695998/154824867-a322c459-4c5a-4db0-82b1-0a2b83cd43f5.png)
ㅤㅤ**paste**
![Code_-_Insiders_kJXZf6a3fu](https://user-images.githubusercontent.com/72695998/154824877-b1c104df-5b68-4955-9621-e36218650e07.png)

### 4. Not work Spotify

ㅤㅤ**4.1 Go to https://developer.spotify.com/dashboard/ and Login**
![7CipoQqjy2](https://user-images.githubusercontent.com/72695998/154824967-f3fec104-d84c-42a4-ba61-c62b6e859f36.png)
ㅤㅤ**4.2  Accept terms**
![vwn85vIx20](https://user-images.githubusercontent.com/72695998/154825537-101dd0aa-fa19-4410-93c1-90ae3b87fe9a.png)
ㅤㅤ**4.3 Create new app**
![opera_X2ydndP6oK](https://user-images.githubusercontent.com/72695998/154825546-1b364316-8c24-4a0d-85d1-b581fb561ce9.png)
ㅤㅤ**4.4 Name app**
![opera_OfY6qNK7Lx](https://user-images.githubusercontent.com/72695998/154825550-f342cc81-2b0e-4632-b54e-a5f035a51a3c.png)
ㅤㅤ**4.5 Click Cliend Secret ID**
![opera_DJVfak6bf4](https://user-images.githubusercontent.com/72695998/154825644-caf12b52-657e-458d-8d94-f8813b7eb12e.png)
ㅤㅤ**4.6 Paste config.json**
![Code_-_Insiders_NzbW9QyM6X](https://user-images.githubusercontent.com/72695998/154825660-fd9888a3-1c11-48c5-b96f-1ea893415e5f.png)

### 5. Slash Command
ㅤㅤ**1. {prefix}deployslash**
![opera_NTAW4insKT](https://user-images.githubusercontent.com/72695998/154826441-d20ba40e-b992-4f23-9b73-a268458134d8.png)
ㅤㅤ**2. invite again**
https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot%20applications.commands ( ${user.id} - id bot)
![opera_3oBSwepmCz](https://user-images.githubusercontent.com/72695998/154826542-6a7a2cb7-c26f-44a0-8c8d-7996f02e0d5d.png)

### 6. Error queue command
`=== UNHANDLED REJECTION ===
Reason:  RangeError [EMBED_AUTHOR_NAME]: MessageEmbed author name must be a string.
    at Function.verifyString (/home/botdiscord/discord-js-lavalink-Music-Bot-erela-js/node_modules/discord.js/src/util/Util.js:416:41)
    at MessageEmbed.setAuthor (/home/botdiscord/discord-js-lavalink-Music-Bot-erela-js/node_modules/discord.js/src/structures/MessageEmbed.js:392:32)
    at Object.run (/home/botdiscord/discord-js-lavalink-Music-Bot-erela-js/commands/🎶 Music/queue.js:45:12)
    at module.exports (/home/botdiscord/discord-js-lavalink-Music-Bot-erela-js/events/guild/messageCreate.js:309:17)
=== UNHANDLED REJECTION ===`
_**Fix**_
ㅤㅤ**1. add k**
![Code_-_Insiders_U6wr2njs7s](https://user-images.githubusercontent.com/72695998/154825999-173f7497-ee79-4a66-870e-3eb1ead21670.png)
ㅤㅤ**2. add //**
![Code_-_Insiders_dIy2vSZMMa](https://user-images.githubusercontent.com/72695998/154826009-9f858289-6e62-454d-85a5-26ca8cdba046.png)
ㅤㅤ**3. reload cmd and enjoy**
![DiscordPTB_ILmZeMJdat](https://user-images.githubusercontent.com/72695998/154826022-6ef057ca-3f64-46fd-9283-f9e59584630a.png)

### 7. Error NP
`=== UNHANDLED REJECTION ===
Reason:  RangeError [EMBED_AUTHOR_NAME]: MessageEmbed author name must be a string.
    at Function.verifyString (/home/botdiscord/discord-js-lavalink-Music-Bot-erela-js/node_modules/discord.js/src/util/Util.js:416:41)
    at MessageEmbed.setAuthor (/home/botdiscord/discord-js-lavalink-Music-Bot-erela-js/node_modules/discord.js/src/structures/MessageEmbed.js:392:32)
    at Object.run (/home/botdiscord/discord-js-lavalink-Music-Bot-erela-js/commands/🎶 Music/nowplaying.js:31:8)
    at module.exports (/home/botdiscord/discord-js-lavalink-Music-Bot-erela-js/events/guild/messageCreate.js:309:17)
=== UNHANDLED REJECTION ===`
_**Fix**_
ㅤㅤ**1. add // 31-33**
![Code_-_Insiders_bl90NI1bWF](https://user-images.githubusercontent.com/72695998/154826099-1a0815ee-b508-402e-a412-9d30ac3a54e9.png)
ㅤㅤ**2. reload cmd and enjoy**
![DiscordPTB_ZTEhBrEJd5](https://user-images.githubusercontent.com/72695998/154826196-a05c4b0a-0f42-496d-8a62-5c9561f2e43d.png)

### 8. Error queuestatus
`
=== UNHANDLED REJECTION ===
Reason:  ReferenceError: createBar is not defined
    at eval (eval at run (/home/botdiscord/discord-js-lavalink-Music-Bot-erela-js/commands/🎶 Music/queuestatus.js:38:90), <anonymous>:1:40)
    at Object.run (/home/botdiscord/discord-js-lavalink-Music-Bot-erela-js/commands/🎶 Music/queuestatus.js:38:90)
    at module.exports (/home/botdiscord/discord-js-lavalink-Music-Bot-erela-js/events/guild/messageCreate.js:309:17)
=== UNHANDLED REJECTION ===
`
_**Fix**_
ㅤㅤ**1. add // 38**
![Code_-_Insiders_m8wc8IXVDT](https://user-images.githubusercontent.com/72695998/154826697-8ba791dd-7959-4d23-83a9-0fcd34932b3d.png)
ㅤㅤ**2. reload cmd and enjoy**
![DiscordPTB_YmBJYpzsXx](https://user-images.githubusercontent.com/72695998/154826708-9b93a6bf-d458-4798-b72b-c58ba9f86c0d.png)

### Недоработки или что надо сделать в будущем:

-  _Переписать его radio.js (Тут его нету ибо там багов как шелков._
-  _Дочинить слеш команды данного бота. Ведь у него они работают, но если брать исходник, то все идет по одному месту_

### Поддержка кодера:
_Вы можете мне пожертвовать или задонатить (как правильно я не знаю) на продвижение проектов этих и т.д. Ведь в данный момент я почти всех его ботов [Tomato6966](https://github.com/Tomato6966) перевёл на русский язык чтобы каждый пользователь из СНГ стран мог его себе взять._ 

На покушать: [Qiwi](https://qiwi.com/p/79061357548)
