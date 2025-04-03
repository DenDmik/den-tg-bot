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


 const start = async()=>{
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/music', description: 'Музыка'},
    ])}
      
   start()
    
    bot.on('message',async (msg) => {
        console.log(msg.from.username)
        const text = msg.text
      const chatId = msg.chat.id;
    
      
    if(msg.text === '/info') {
      bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
    }
     
    if(msg.text === '/music'){
     await  bot.sendAudio(chatId,'https://muz8.z3.fm/1/50/dskarlatti_-_sonata_b-moll__k27_l449_(zf.fm).mp3?download=force')
    }
    if(msg.text ==='/start'){bot.sendSticker(chatId,'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/1.webp')}
    
})
