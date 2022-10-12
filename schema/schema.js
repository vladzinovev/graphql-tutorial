const graphql = require('graphql');

//1-описываем данные хранящиеся в базе, 2- спец сервис
const {GraphQLObjectType, GraphQLString, GraphQLSchema}= graphql;

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
    }),
})

//создаем корневой запрос и описываем его
const Query=new GraphQLObjectType({
    name: 'Query',
    //описываем запрос одного фильма
    fields:{
        movie:{
            type:MovieType,
            args:{id:{type:GraphQLString}},
            //какие данные буде возвращать
            resolve(parent,args){
    
            }
        },
    }
})

module.exports=new GraphQLSchema({
    query:Query,
});