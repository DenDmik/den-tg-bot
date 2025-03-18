require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { optionButtons, againOptions } = require('../options');

const token = process.env.TELEGRAM_TOKEN;
const webAppUrl = 'https://next-deploy-dun.vercel.app/';
const bot = new TelegramBot(token);
const chats = {};

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Я загадываю число от 0 до 9');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадайте цифру', optionButtons);
};

bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Получить информацию о пользователе' },
    { command: '/game', description: 'Игра угадай цифру' },
]);

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    if (msg.text === '/start') {
        await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/1.webp');
        return bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Перейти в Next-deploy project', web_app: { url: webAppUrl } }]
                ]
            }
        });
    }
    if (msg.text === '/info') {
        return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
    }
    if (msg.text === '/game') {
        return startGame(chatId);
    }
    return bot.sendMessage(chatId, 'не понял. Нажми команду из Menu');
});

bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    const chislo = chats[chatId];

    if (data === '/again') {
        return startGame(chatId);
    }
    if (data == chislo) {
        return await bot.sendMessage(chatId, `Вы угадали цифру ${data}`, againOptions);
    } else {
        return await bot.sendMessage(chatId, `Вы нажали кнопку ${data}, Вы не угадали цифру ${chats[chatId]}`, againOptions);
    }
});

module.exports = (req, res) => {
    if (req.method === 'POST') {
        bot.handleUpdate(req.body);
        res.status(200).send('Webhook received');
    } else {
        res.status(405).send('Method not allowed');
    }
};
