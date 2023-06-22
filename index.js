import axios from 'axios'
import { config } from 'dotenv'
import express from 'express'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import TelegramBot from 'node-telegram-bot-api';
// import request from './src/requestApi.js';


// const JOKE_API = 'https://v2.jokeapi.dev/joke/Programming?type=single';
// const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}`;

const token = '5570994601:AAFGHJo3crLnHA3XBPtF_5sclnD1EoPlh0Y'; // тут токен кторый мы получили от botFather

// включаем самого обота
const bot = new TelegramBot(token, {polling: true});

//конфиг клавиатуры
const keyboard = [
    [
      {
        text: 'Хочу кота', // текст на кнопке
        callback_data: 'cats' // данные для обработчика событий
      }
    ],
    [
        {
          text: 'Хочу песика',
          callback_data: 'dogs'
        }
    ]
    // [
    //     {
    //       text: 'Хочу проходить курсы',
    //       url: 'lol' //внешняя ссылка
    //     }
    //   ]
  ];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

  // отправляем сообщение
  bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?', { // прикрутим клаву
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});
    

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;

    let img = '';

    const input = query.data;
    const gifApi = 'HvnTVXXC8uv8fy4iA9WVjl2tUd1MAldb';
    const gifUrl = `https://api.giphy.com/v1/gifs/search?q=${input}&rating=g&api_key=${gifApi}`;
    
    const result = await fetch(gifUrl)
    .then(function(data) {
      return data.json()
    })
    .then(function(json){
    //   console.log(json.data[0].images.fixed_height.url)
      const imgPath = json.data[0].images.fixed_height.url
      return imgPath;
    })  

    if (query.data === 'cats') { // если кот
        img = result;
    }

    if (query.data === 'dogs') { // если пёс
        img = result;
    }
    
    if (img) {
        bot.sendSticker(chatId, img, { // прикрутим клаву
            // reply_markup: {
            //     inline_keyboard: keyboard
            // }
        });
    } else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
  });