const graphql = require('graphql');

//1-описываем данные хранящиеся в базе, 2- спец сервис
const {GraphQLObjectType, GraphQLString}= graphql;

const MoviType = new GraphQLObjectType({
    name: 'Movie',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
    }),
})