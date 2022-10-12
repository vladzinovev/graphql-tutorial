const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();
//указываем  порт
const PORT = 3005;

app.use('/graphql', graphqlHTTP({}));
//запускаем прослушивание нашего порта
app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
