module.exports = {
    name: "fbreact",
    description: "basta auto react sya ganun HAHAHA",
    nashPrefix: false,
    execute: async (api, event) => {
        const introduction = `Hey everyone my name is NASHBOT! Are you tired of manually reacting to posts on Facebook? Try out this Auto FB Reaction app! It automatically reacts to posts for you, making your Facebook experience more convenient and enjoyable.\n\nClick here to check it out: [https://www.apkfiles.com/apk-615022/autoreact]`;
        api.sendMessage(introduction, event.threadID);
    }
};
