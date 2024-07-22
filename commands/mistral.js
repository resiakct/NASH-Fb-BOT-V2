const axios = require('axios');

module.exports = {
  name: 'mistral',
  description: 'Sends a prompt to the Mistral API with the user\'s Facebook UID.',
  usage: '[ 💬 𝗨𝘀𝗮𝗴𝗲 💬 ]\n\n🔹 Example: [ 💬 ${prefix}mistral What is the weather like today? 💬 ]',
  nashPrefix: false,
  execute(api, event, args, prefix) {
    try {
      if (!args.length) {
        const usageMessage = `
🔮 𝗠𝗶𝘀𝘁𝗿𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 🔮

━━━━━━━━━━━━━━━━━━━
💬 𝗨𝘀𝗮𝗴𝗲 💬

🔹 ${prefix}mistral [prompt]

🔹 Example:
🔹 ${prefix}mistral who killed my heart?
━━━━━━━━━━━━━━━━━━━
        `;
        api.sendMessage(usageMessage, event.threadID);
        return;
      }

      const prompt = encodeURIComponent(args.join(' '));
      const senderID = event.senderID;
      const apiUrl = `https://nash-rest-api.vercel.app/mistral`;

      api.sendMessage('🔍 Processing your request...', event.threadID);

      axios.get(apiUrl, { params: { prompt, senderID } })
        .then(response => {
          const data = response.data;
          
          if (data && data.response) {
            const formattedResponse = `
🔮 𝗠𝗶𝘀𝘁𝗿𝗮𝗹'𝘀 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 🔮

━━━━━━━━━━━━━━━━━━━
${data.response}
━━━━━━━━━━━━━━━━━━━
            `;

            api.sendMessage(formattedResponse, event.threadID);
          } else {
            throw new Error('Invalid response format from API');
          }
        })
        .catch(error => {
          console.error('Error fetching Mistral data:', error.message || error);
          api.sendMessage('⚠️ An error occurred while fetching the Mistral data.', event.threadID);
        });
    } catch (error) {
      console.error('Error executing command:', error.message || error);
      api.sendMessage('⚠️ An error occurred while executing the command.', event.threadID);
    }
  },
};