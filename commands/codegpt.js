const axios = require('axios');

module.exports = {
  name: 'codegpt',
  description: 'Get detailed programming answers from CodeGPT.',
  usage: '[ 🔍 𝗨𝘀𝗮𝗴𝗲 🔍 ]\n\n🔹 Example: [ 🔍 {prefix}codegpt ask Node.js ]',
  nashPrefix: false,
  execute(api, event, args, prefix) {
    try {
      if (args.length < 2) {
        const usageMessage = `
🔍 𝗖𝗼𝗱𝗲𝗚𝗣𝗧 🔍

━━━━━━━━━━━━━━━━━━━
🔹 𝗨𝘀𝗮𝗴𝗲 🔹

🔹 Command: ${prefix}codegpt [type] [lang] [query]

🔹 Example: ${prefix}codegpt ask Node.js How to create a REST API?

━━━━━━━━━━━━━━━━━━━
        `;
        api.sendMessage(usageMessage, event.threadID);
        return;
      }

      const [type, lang, ...queryParts] = args;
      const query = encodeURIComponent(queryParts.join(' '));
      const apiUrl = `https://nash-rest-api.vercel.app/codegpt?type=ask&lang=${lang}&q=${query}`;

      api.sendMessage('🔍 Fetching answer from CodeGPT...', event.threadID);

      axios.get(apiUrl)
        .then(response => {
          const data = response.data;
          if (data && data.status) {
            const codegptResponse = `
🔍 𝗖𝗼𝗱𝗲𝗚𝗣𝗧'𝘀 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 🔍

━━━━━━━━━━━━━━━━━━━
${data.result}
━━━━━━━━━━━━━━━━━━━
            `;
            api.sendMessage(codegptResponse, event.threadID);
          } else {
            api.sendMessage('No answer found for the provided query.', event.threadID);
          }
        })
        .catch(error => {
          console.error('ayaw mag res bay HAHAHA:', error.message || error);
          api.sendMessage('⚠️ An error occurred while fetching the answer from CodeGPT.', event.threadID);
        });
    } catch (error) {
      console.error('Error executing command:', error.message || error);
      api.sendMessage('⚠️ An error occurred while executing the command.', event.threadID);
    }
  },
};