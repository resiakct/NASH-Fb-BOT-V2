const axios = require('axios');

module.exports = {
  name: 'scrape',
  description: 'Scrapes content from the provided URL.',
  usage: '<url>',
  nashPrefix: false,
  execute(api, event, args, prefix) {
    try {
      if (args.length === 0) {
        api.sendMessage(`🌐 𝗨𝘀𝗮𝗴𝗲: '${prefix}scrape <url>' 🌐\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲: '${prefix}scrape https://example.com'`, event.threadID);
        return;
      }

      const url = encodeURIComponent(args.join(' '));
      const apiUrl = `https://nash-rest-api.vercel.app/scrape?url=${url}`;

      api.sendMessage('🌐 𝗣𝗹𝗲𝗮𝘀𝗲 𝗪𝗮𝗶𝘁, 𝘀𝗰𝗿𝗮𝗽𝗶𝗻𝗴 𝗰𝗼𝗻𝘁𝗲𝗻𝘁...', event.threadID);

      axios.get(apiUrl)
        .then(response => {
          const { headers, title } = response.data;
          
          const formattedHeaders = Object.entries(headers)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');

          api.sendMessage(`
🌐 𝗦𝗰𝗿𝗮𝗽𝗲 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 🌐

━━━━━━━━━━━━━━━━━━━
𝗧𝗶𝘁𝗹𝗲: ${title}
━━━━━━━━━━━━━━━━━━━
𝗛𝗲𝗮𝗱𝗲𝗿𝘀:
${formattedHeaders}
━━━━━━━━━━━━━━━━━━━
          `, event.threadID);
        })
        .catch(error => {
          console.error('Error scraping content:', error);
          api.sendMessage('⚠️ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱 𝘄𝗵𝗶𝗹𝗲 𝘀𝗰𝗿𝗮𝗽𝗶𝗻𝗴 𝗰𝗼𝗻𝘁𝗲𝗻𝘁.', event.threadID);
        });
    } catch (error) {
      console.error('Error executing command:', error);
      api.sendMessage('⚠️ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱 𝘄𝗵𝗶𝗹𝗲 𝗲𝘅𝗲𝗰𝘂𝘁𝗶𝗻𝗴 𝘁𝗵𝗲 𝗰𝗼𝗺𝗺𝗮𝗻𝗱.', event.threadID);
    }
  },
};