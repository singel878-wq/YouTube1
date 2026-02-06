const TelegramBot = require("node-telegram-bot-api");

const config = require("./config");

const sendGallery = require("./utils/sender");

const bot = new TelegramBot(config.BOT_TOKEN, {
    polling: true
});

console.log("Bot started");

bot.onText(/\/start/, async (msg) => {

    await bot.sendMessage(msg.chat.id,

        "ربات حرفه‌ای آماده است\n\n" +
        "/gallery - ارسال تصاویر"

    );

});

bot.onText(/\/gallery/, async (msg) => {

    const chatId = msg.chat.id;

    await bot.sendMessage(chatId, "در حال پردازش...");

    await sendGallery(

        bot,
        chatId,
        config.GALLERY_PATH,
        config.MAX_BATCH

    );

});

bot.on("polling_error", console.error);
