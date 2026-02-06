const fs = require("fs");
const path = require("path");

async function sendGallery(bot, chatId, galleryPath, batchSize = 10) {

    try {

        if (!fs.existsSync(galleryPath)) {

            throw new Error("Gallery folder not found");

        }

        const files = fs.readdirSync(galleryPath);

        const images = files.filter(file =>
            file.endsWith(".jpg") ||
            file.endsWith(".png") ||
            file.endsWith(".jpeg")
        );

        if (images.length === 0) {

            await bot.sendMessage(chatId, "هیچ تصویری پیدا نشد");

            return;

        }

        await bot.sendMessage(chatId, `تعداد ${images.length} تصویر پیدا شد`);

        let batch = [];

        for (let i = 0; i < images.length; i++) {

            const filePath = path.join(galleryPath, images[i]);

            batch.push({
                type: "photo",
                media: filePath
            });

            if (batch.length === batchSize || i === images.length - 1) {

                await bot.sendMediaGroup(chatId, batch);

                batch = [];

            }

        }

        await bot.sendMessage(chatId, "ارسال کامل شد");

    }
    catch (error) {

        await bot.sendMessage(chatId, "خطا: " + error.message);

    }

}

module.exports = sendGallery;
