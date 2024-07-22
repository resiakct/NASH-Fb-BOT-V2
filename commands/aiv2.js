const axios = require('axios');

module.exports = {
  name: 'aiv2',
  description: 'Interact with AI (Artificial Intelligence)',
  usage: '[nashPrefix]ai [prompt]',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    const { threadID, senderID } = event;
    const prompt = args.join(" ");

    if (!prompt) {
      await api.sendMessage("ℹ️ | Please provide a prompt.", threadID);
      return;
    }

    try {
      await api.sendMessage("⌛ | Please wait while I process your request...", threadID);

      const response = await axios.get(`https://nash-rest-api.vercel.app/gpt-3_5-turbo?prompt=${encodeURIComponent(prompt)}`);
      
      if (response.status !== 200 || !response.data || !response.data.result || !response.data.result.reply) {
        throw new Error('Invalid response.');
      }

      const reply = response.data.result.reply;

      await api.sendMessage(reply, threadID);
    } catch (error) {
      console.error("Error interacting with AI:", error);
      await api.sendMessage("⛔ | An error occurred while interacting with AI. Please try again later.", threadID);
    }
  }
};