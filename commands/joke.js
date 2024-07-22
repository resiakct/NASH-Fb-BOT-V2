const axios = require("axios");

module.exports = {
    name: "joke",
    description: "Get a random joke",
    aliases: [],
    cooldown: 5,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const { threadID, messageID } = event;

        const apiUrl = "https://nash-rest-api.vercel.app/joke";

        try {
            const response = await axios.get(apiUrl);
            const joke = response.data.joke;

            if (!joke) {
                return api.sendMessage("ayaw lagie mo response bay no", threadID, messageID);
            }

            api.sendMessage(joke, threadID, messageID);
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while fetching joke. Please try again later.", threadID, messageID);
        }
    }
};
