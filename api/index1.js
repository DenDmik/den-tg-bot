import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api';
const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP
const url = process.env.API_URL;
const port = process.env.PORT

const bot = new TelegramBot(token,{
    webHook:{
        port:port
    }
});

 bot.setWebHook(`https://den-tg-bot.vercel.app/bot${token}`)


 const start = async ()=>{
   await bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/music', description: 'Музыка'},
    ])}
      
   start()
 
    
    bot.on('message',async (msg) => {
        console.log(msg.from.username)
        const text = msg.text
      const chatId = msg.chat.id;

     if(msg.text ==='/start'){
 await bot.sendSticker(chatId,'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/1.webp')
 await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Перейти в Next-deploy project', web_app: {url: webAppUrl}}]
            ]
        }
    })

     } else if(msg.text === '/info') {
     bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
    } else
     
   if(msg.text === '/music'){
    bot.sendAudio(chatId,'https://muz8.z3.fm/1/50/dskarlatti_-_sonata_b-moll__k27_l449_(zf.fm).mp3?download=force')
    } else   bot.sendMessage(chatId, 'неизвестная команда смотри в Menu')
   })
///////////////////////////////////////////////////
// import 'dotenv/config';
// import express from 'express';
// import TelegramBot from 'node-telegram-bot-api';

// const token = process.env.TOKEN;
// const webAppUrl = process.env.WEB_APP;
// const url = process.env.API_URL;
// const port = process.env.PORT || 3000;

// // Create Express app
// const app = express();
// app.use(express.json());

// // Initialize bot with webhook configuration
// const bot = new TelegramBot(token, {
//   webHook: true
// });

// // Commands configuration
// const commands = [
//   { command: '/start', description: 'Начальное приветствие' },
//   { command: '/info', description: 'Получить информацию о пользователе' },
//   { command: '/music', description: 'Музыка' }
// ];

// // Initialize bot
// async function initializeBot() {
//   try {
//     // Set webhook
//     const webhookUrl = `${url}/bot${token}`;
//     await bot.setWebHook(webhookUrl);
//     console.log('Webhook set successfully');

//     // Set commands
//     await bot.setMyCommands(commands);
//     console.log('Commands set successfully');
//   } catch (error) {
//     console.error('Error initializing bot:', error);
//     process.exit(1);
//   }
// }

// // Message handler
// bot.on('message', async (msg) => {
//   try {
//     const chatId = msg.chat.id;
//     const text = msg.text;
//     console.log(`Received message from ${msg.from.username}: ${text}`);

//     switch (text) {
//       case '/start':
//         await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/1.webp');
//         await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
//           reply_markup: {
//             inline_keyboard: [
//               [{text: 'Перейти в Next-deploy project', web_app: {url: webAppUrl}}]
//             ]
//           }
//         });
//         break;

//       case '/info':
//         await bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
//         break;

//       case '/music':
//         await bot.sendAudio(chatId, 'https://muz8.z3.fm/1/50/dskarlatti_-_sonata_b-moll__k27_l449_(zf.fm).mp3?download=force');
//         break;

//       default:
//         await bot.sendMessage(chatId, 'неизвестная команда смотри в Menu');
//     }
//   } catch (error) {
//     console.error('Error handling message:', error);
//     await bot.sendMessage(msg.chat.id, 'Произошла ошибка при обработке команды');
//   }
// });

// // Error handler
// bot.on('error', (error) => {
//   console.error('Bot error:', error);
// });

// // Webhook error handler
// bot.on('webhook_error', (error) => {
//   console.error('Webhook error:', error);
// });

// // Initialize the bot and start the server
// app.listen(port, async () => {
//   console.log(`Server is running on port ${port}`);
//   await initializeBot();
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'ok' });
// });

// // Handle webhook endpoint
// app.post(`/bot${token}`, (req, res) => {
//   bot.processUpdate(req.body);
//   res.sendStatus(200);
// });
