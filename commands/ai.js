const axios = require('axios');

module.exports = {
    name: 'ai',
    description: 'ahhh basta ai ok nayun',
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const input = args.join(' ');

        if (!input) {
            api.sendMessage(
                `Hello there!\n\nI am an AI developed by chatgpt malamang gago kaba?. I am here to assist you with any questions or tasks you may have.\n\nUsage: ai [your question]`,
                event.threadID,
                event.messageID
            );
            return;
        }

        api.sendMessage(`Processing your request...`, event.threadID, event.messageID);

        try {
            const { data } = await axios.get(`https://nash-api-end.onrender.com/gpt3?prompt=${encodeURIComponent(input)}`);
            
            if (!data || !data.result || !data.result.reply) {
                throw new Error('Ayaw mag response ang gago');
            }
            
            const response = data.result.reply;

            const options = { timeZone: 'Asia/Manila', hour12: true };
            const timeString = new Date().toLocaleString('en-US', options);

            const finalResponse = `𝙍𝙀𝙎𝙋𝙊𝙉𝘿 𝘼𝙄 🤖\n━━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${input}\n━━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${response}\n\n𝗣⃪𝗼⃪𝗴⃪𝗶⃪: ${timeString}\n\nMAKE YOUR OWN BOT HERE: https://nash-bot-v2.onrender.com`;
            api.sendMessage(finalResponse, event.threadID, event.messageID);
        } catch (error) {
            let errorMessage = 'An error occurred while processing your request, please try sending your question again.';
            
            if (error.response && error.response.data) {
                errorMessage = `API returned an error: ${error.response.data.message}`;
            } else if (error.message) {
                errorMessage = `Error: ${error.message}`;
            }
            
            api.sendMessage(errorMessage, event.threadID, event.messageID);
            console.error(error);
        }
    },
};