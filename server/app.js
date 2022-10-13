const express = require('express');
//добавляем graphql для создания сервера
const {graphqlHTTP} = require('express-graphql');

const schema = require('../schema/schema');

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
