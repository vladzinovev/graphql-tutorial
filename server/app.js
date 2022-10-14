const express = require('express');
//добавляем graphql для создания сервера
const {graphqlHTTP} = require('express-graphql');

const schema = require('../schema/schema');

//подключение к mongodb
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://admin:hh9OjLA6P1mIGiq6@graphql-tutorial.hhpocja.mongodb.net/graphql-tutorial')
  .then(()=>console.log('connect to DB OK'))
  .catch((err)=>console.log('DB error', err))

const app = express();
//указываем  порт
const PORT = 3000;
//app.use(express.static('public'));
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true,
})); 


//запускаем прослушивание нашего порта
app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});




