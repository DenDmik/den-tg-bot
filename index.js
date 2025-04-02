import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api';
import options from './options.js';
import express from 'express';
import bodyParser from 'body-parser';
const { optionButtons, againOptions } = options;

const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP
const url = process.env.URL_NGROK
const port = process.env.PORT
const VERCEL_URL = `${process.env.VERCEL_URL}`
const bot = new TelegramBot(token,{
    webHook:true
});
 bot.setWebHook(`https://den-tg-bot.vercel.app`)
 
 const app = express();
app.use(bodyParser.json());

app.post(`/`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);})

const chats={}

const start = async()=>{
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'},
    ])
      
   
    const startGame = async (chatId)=>{
        console.log(`from startGame:${chatId}`)
        await bot.sendMessage(chatId,'Я загадываю число от 0 до 9');
        const randomNumber = Math.floor(Math.random() * 10)
        chats[chatId]=randomNumber
        await bot.sendMessage(chatId,`Отгадайте цифру ${chats[chatId]}`,optionButtons)
    }
    
    bot.on('message',async (msg) => {
        console.log(msg.from.username)
        const text = msg.text
      const chatId = msg.chat.id;
    
      
    if(msg.text === '/start'){
        await bot.sendSticker(chatId,'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/1.webp')
      // send a message to the chat acknowledging receipt of their message
      return bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Перейти в Next-deploy project', web_app: {url: webAppUrl}}]
            ]
        }
    })
    // await bot.sendMessage(chatId,'Hi',{
    //     reply_markup:{
    //         keyboard:[
    //             [{text:'Go to Next-deploy', web_app: {url: webAppUrl}}]
    //         ]
    //     }
    // })
    } if(msg.text === '/info') {
     return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
    } 
    if(msg.text === '/game'){
        return startGame(chatId)
    }
    return bot.sendMessage(chatId,'не понял. Нажми каманду из Menu')
    });
    
    bot.on('callback_query', async msg=>{
         const data = msg.data;
         const chatId = msg.message.chat.id
         console.log(`from callback_query:${chatId}`)
         const chislo = chats[chatId]
         if(data === '/again'){
            return startGame(chatId)
        }
        if(data === '/stop_game'){
            return null
        }
         if(data == chislo){
         return  await bot.sendMessage(chatId,`Вы угадали цифру ${data}`,againOptions)
         } else {
            return  (
             await bot.sendMessage(chatId,`Вы нажали кнопку ${data},Вы не угадали цифру ${chats[chatId]}`,againOptions)
            )
         }
    })

    ///////////////////
    // bot.on('callback_query', async msg => {
    //     const data = msg.data;
    //     const chatId = msg.message.chat.id;
    //     if (data === '/again') {
    //         return startGame(chatId)
    //     }
    //     const user = await UserModel.findOne({chatId})
    //     if (data == chats[chatId]) {
    //         // user.right += 1;
    //         await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
    //     } else {
    //         user.wrong += 1;
    //         await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
    //     }
    //     await user.save();
    // })
    ///////////////
}  
start()
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});