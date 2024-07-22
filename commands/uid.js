const moment = require('moment-timezone');

module.exports = {
  name: "uid",
  role: 0,
  credits: "Mirai Team, converted to nashBot by Joshua Apostol",
  description: "Get the user's Facebook UID.",
  nashPrefix: false,
  usages: "{p}uid {p}uid @mention",
  cooldown: 5,
  aliases: ["id", "ui"],
  execute: async (api, event) => {
    try {
      if (Object.keys(event.mentions).length === 0) {
        if (event.messageReply) {
          const senderID = event.messageReply.senderID;
          const userInfo = await api.getUserInfo(senderID);
          const user = userInfo[senderID];
          const date = moment().tz("Asia/Manila").format('YYYY-MM-DD');
          const time = moment().tz("Asia/Manila").format('HH:mm:ss');

          const userResponse = `
𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢:

➥ 📛 Name: ${user.name}
➥ 🆔 User ID: ${senderID}
➥ 🌐 Profile URL: ${user.profileUrl}

𝗧𝗜𝗠𝗘𝗦𝗧𝗔𝗠𝗣:

➥ 📅 Date: ${date}
➥ ⏰ Time: ${time}

Have fun using it, enjoy! ❤️
          `;

          return api.sendMessage(userResponse, event.threadID);
        } else {
          const senderID = event.senderID;
          const userInfo = await api.getUserInfo(senderID);
          const user = userInfo[senderID];
          const date = moment().tz("Asia/Manila").format('YYYY-MM-DD');
          const time = moment().tz("Asia/Manila").format('HH:mm:ss');

          const userResponse = `
𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢:

➥ 📛 Name: ${user.name}
➥ 🆔 Your ID: ${senderID}
➥ 🌐 Profile URL: ${user.profileUrl}

𝗧𝗜𝗠𝗘𝗦𝗧𝗔𝗠𝗣:

➥ 📅 Date: ${date}
➥ ⏰ Time: ${time}

Have fun using it, enjoy! ❤️
          `;

          return api.sendMessage(userResponse, event.threadID);
        }
      } else {
        for (const mentionID in event.mentions) {
          const mentionName = event.mentions[mentionID];
          const userInfo = await api.getUserInfo(mentionID);
          const user = userInfo[mentionID];
          const date = moment().tz("Asia/Manila").format('YYYY-MM-DD');
          const time = moment().tz("Asia/Manila").format('HH:mm:ss');

          const userResponse = `
𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢:

➥ 📛 Name: ${mentionName.replace('@', '')}
➥ 🆔 User ID: ${mentionID}
➥ 🌐 Profile URL: ${user.profileUrl}

𝗧𝗜𝗠𝗘𝗦𝗧𝗔𝗠𝗣:

➥ 📅 Date: ${date}
➥ ⏰ Time: ${time}

Have fun using it, enjoy! ❤️
          `;

          api.sendMessage(userResponse, event.threadID);
        }
      }
    } catch (error) {
      console.error('Error executing command:', error);
      api.sendMessage('An error occurred while executing the command.', event.threadID);
    }
  }
};
