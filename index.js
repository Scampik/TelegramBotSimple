import axios from 'axios'
import TelegramBot from 'node-telegram-bot-api';
import { Bot } from 'grammy';

const token = '5570994601:AAFGHJo3crLnHA3XBPtF_5sclnD1EoPlh0Y'; // тут токен кторый мы получили от botFather

// включаем самого обота
const bot = new TelegramBot(token, {polling: true});
const bot1 = new Bot(token);

bot1.api.setMyCommands([
  { command: "gif", description: "start" },
  // { command: "help", description: "h"},
  // { command: "list", description: "l" },
  ]);

// конфиг клавиатуры
// const keyboard = [
//     [{
//         text: 'Хочу кота', // текст на кнопке
//         callback_data: 'cats' // данные для обработчика событий
//       }]
// ];

bot.onText(/\/gif/, async (msg) => {
  const chatId = msg.chat.id;
  // console.log(msg)
  let img = '';

  const input = msg.text.split(' ');

  const randomNum = Math.floor(Math.random() * 30);
  const gifApi = 'HvnTVXXC8uv8fy4iA9WVjl2tUd1MAldb';
  const gifUrl = `https://api.giphy.com/v1/gifs/search?q=${input[1]}&limit=100&rating=r&api_key=${gifApi}`;
  
  const result = await fetch(gifUrl)
  .then(function(data) {
    return data.json()
  })
  .then(function(json){
    console.log('___+',json.data)
    const imgPath = json.data[randomNum].images.fixed_height.url
    return imgPath;
  })  

  bot.sendSticker(chatId, result);

  // if (query.data === 'cats') { // если кот
  //     img = result;
  // }

  // if (query.data === 'dogs') { // если пёс
  //     img = result;
  // }
  
  // if (img) {
  //     bot.sendSticker(chatId, img, { // прикрутим клаву
  //         // reply_markup: {
  //         //     inline_keyboard: keyboard
  //         // }
  //     });
  // } else {
  //     bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
  //         reply_markup: {
  //             inline_keyboard: keyboard
  //         }
  //     });
  // }
});


// // обработчик событий нажатий на клавиатуру
// bot.on('callback_query', async (query) => {
//   console.log('____',query)
//     const chatId = query.message.chat.id;

//     let img = '';

//     const input = query.data;
//     const randomNum = Math.floor(Math.random() * 30);
//     const gifApi = 'HvnTVXXC8uv8fy4iA9WVjl2tUd1MAldb';
//     const gifUrl = `https://api.giphy.com/v1/gifs/search?q=${input}&rating=g&api_key=${gifApi}`;
    
//     const result = await fetch(gifUrl)
//     .then(function(data) {
//       return data.json()
//     })
//     .then(function(json){
//     //   console.log(json.data[0].images.fixed_height.url)
//       const imgPath = json.data[randomNum].images.fixed_height.url
//       return imgPath;
//     })  

//     if (query.data === 'cats') { // если кот
//         img = result;
//     }

//     if (query.data === 'dogs') { // если пёс
//         img = result;
//     }
    
//     if (img) {
//         bot.sendSticker(chatId, img, { // прикрутим клаву
//             // reply_markup: {
//             //     inline_keyboard: keyboard
//             // }
//         });
//     } else {
//         bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
//             reply_markup: {
//                 inline_keyboard: keyboard
//             }
//         });
//     }
//   });


  // bot.on('message', (msg) => {
  //   const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
  
  //   // отправляем сообщение
  //   // bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?', { // прикрутим клаву
  //   //       reply_markup: {
  //   //           inline_keyboard: keyboard
  //   //       }
  //   //   });
  // }); 