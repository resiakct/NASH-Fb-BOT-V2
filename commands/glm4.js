const axios = require('axios');

module.exports = {
  name: 'glm4',
  description: 'Glm4 Ai',
  usage: '[nashPrefix]glm4 [message]',
  nashPrefix: true,
  execute: async (api, event, args, prefix) => {
    const message = args.join(' ');
    if (!message) {
      await api.sendMessage('Usage: glm4 [message].', event.threadID);
      return;
    }

    await api.sendMessage('Please Wait Glm4 is Responding...', event.threadID);

    try {
      const response = await axios.get(`https://nash-api-end.onrender.com/glm4?message=${encodeURIComponent(message)}`);
      const { fullResponse } = response.data;

      const formattedResponse = `
${fullResponse}
      `;

      await api.sendMessage(formattedResponse, event.threadID);
    } catch (error) {
      console.error('Error fetching or sending the response:', error);
      await api.sendMessage('An error occurred while fetching the response.', event.threadID);
    }
  }
};