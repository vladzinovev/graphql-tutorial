const express = require('express');
//добавляем graphql для создания сервера
const {graphqlHTTP} = require('express-graphql');

const schema = require('../schema/schema');

const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://admin:hh9OjLA6P1mIGiq6@graphql-tutorial.hhpocja.mongodb.net/test',{useMongoClient:true});

const app = express();
//указываем  порт
const PORT = 3000;
//app.use(express.static('public'));
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true,
})); 

//подключение к бд
const dbConnection=mongoose.connection;
dbConnection.on('error',err=>console.log(`Connection error: ${err}`));
dbConnection.once('open',()=>console.log('Connected to DB!'));

//запускаем прослушивание нашего порта
app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});




