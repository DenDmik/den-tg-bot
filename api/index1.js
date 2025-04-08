import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'
const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP
const url = process.env.API_URL;
const port = process.env.PORT

const bot = new TelegramBot(token);
 bot.setWebHook(`https://den-tg-bot.vercel.app/bot${token}`)
const app = new Koa()
const router = new Router()
router.post('/bot',(ctx)=>{
    const{body}= ctx.request
    bot.processUpdate(body)
    ctx.status = 200
}
)
app.use(bodyParser)
app.use(router.routes())
app.listen(port,()=>{`Server started at port ${port}`})

//  bot.setWebHook(`https://den-tg-bot.vercel.app/bot${token}`)


//  const start = async ()=>{
//    await bot.setMyCommands([
//         {command: '/start', description: 'Начальное приветствие'},
//         {command: '/info', description: 'Получить информацию о пользователе'},
//         {command: '/music', description: 'Музыка'},
//     ])}
      
//    start()
///////////////////////////////////////


/////////////////////////////////////////////////////////////////
const start = async () => {
    try {
        // Устанавливаем вебхук
        await bot.setWebHook(`https://den-tg-bot.vercel.app/bot${token}`);
        
        // Устанавливаем команды
        await bot.setMyCommands([
            {command: '/start', description: 'Начальное приветствие'},
            {command: '/info', description: 'Получить информацию о пользователе'},
            {command: '/music', description: 'Музыка'},
        ]);
        
        console.log('Bot successfully initialized');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}
 start()
    ///////////////////////////////////////////////////////////
//     bot.on('message',async (msg) => {
//         console.log(msg.from.username)
//         const text = msg.text
//       const chatId = msg.chat.id;

//      if(msg.text ==='/start'){
//  await bot.sendSticker(chatId,'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/1.webp')
//  await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
//         reply_markup: {
//             inline_keyboard: [
//                 [{text: 'Перейти в Next-deploy project', web_app: {url: webAppUrl}}]
//             ]
//         }
//     })

//      } else if(msg.text === '/info') {
//      bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
//     } else
     
//    if(msg.text === '/music'){
//     bot.sendAudio(chatId,'https://muz8.z3.fm/1/50/dskarlatti_-_sonata_b-moll__k27_l449_(zf.fm).mp3?download=force')
//     } else   bot.sendMessage(chatId, 'неизвестная команда смотри в Menu')
//    })
///////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////
// bot.onText('/start', async (msg)=>{ 
//     const chatId = msg.chat.id
//     await bot.sendSticker(chatId,'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/1.webp')
//     await bot.sendMessage(chatId,'Заходи на наш сайт по кнопке ниже',{
//         reply_markup: {
//             inline_keyboard: [
//               [{text: 'Перейти в Next-deploy project', web_app: {url: webAppUrl}}]
//             ]
//           }
//     }) ; return null
// })
// bot.onText('/info', async (msg)=>{
//     const chatId=msg.chat.id
//     await bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
//     return null
// })

// bot.onText('/music', async (msg)=>{
//     await bot.sendAudio(msg.chat.id,'https://muz8.z3.fm/1/50/dskarlatti_-_sonata_b-moll__k27_l449_(zf.fm).mp3?download=force' )
//     return null
// })
// bot.onText(/.+/, async (msg) => {
//     const chatId = msg.chat.id
//     await bot.sendMessage(chatId, 'Неизвестная команда')
//     return null
// })
//////////////////////////////////////////
bot.onText(/^\/start$/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        console.log(`Processing /start command for chat ${chatId}`);
        
        await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/1.webp');
        await bot.sendMessage(chatId, 'Заходи на наш сайт по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Перейти в Next-deploy project', web_app: {url: webAppUrl}}]
                ]
            }
        });
    } catch (error) {
        console.error('Error in /start handler:', error);
        await bot.sendMessage(msg.chat.id, 'Произошла ошибка при обработке команды');
    }
});

bot.onText(/^\/info$/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        console.log(`Processing /info command for chat ${chatId}`);
        
        await bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`);
    } catch (error) {
        console.error('Error in /info handler:', error);
        await bot.sendMessage(msg.chat.id, 'Произошла ошибка при обработке команды');
    }
});
bot.onText(/^\/music$/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        console.log(`Processing /music command for chat ${chatId}`);
        
        await bot.sendAudio(chatId, 'https://muz8.z3.fm/1/50/dskarlatti_-_sonata_b-moll__k27_l449_(zf.fm).mp3?download=force');
    } catch (error) {
        console.error('Error in /music handler:', error);
        await bot.sendMessage(msg.chat.id, 'Произошла ошибка при обработке команды');
    }
});

// Обработчик для неизвестных команд - теперь исключает известные команды
bot.onText(/^(?!\/start$|\/info$|\/music$).*$/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        console.log(`Received unknown command from chat ${chatId}: ${msg.text}`);
        
        if (msg.text.startsWith('/')) {
            await bot.sendMessage(chatId, 'Неизвестная команда. Используйте меню для списка доступных команд.');
        }
    } catch (error) {
        console.error('Error in unknown command handler:', error);
    }
});
