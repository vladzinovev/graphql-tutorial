const graphql = require('graphql');

//1-описываем данные хранящиеся в базе, 2- спец сервис
const {GraphQLObjectType, GraphQLString, GraphQLSchema}= graphql;

//фильмы
const movies=[
    {id:'1', name: 'Pulp Fiction', genre: 'Crime'},
    {id:'2', name: '1984', genre: 'Sci-Fi'},
    {id:'3', name: 'V for vendetta', genre: 'Sci-Fi-Triller'},
    {id:'4', name: 'Snatch', genre: 'Crime-Comedy'},
];

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
                return movies.find(movie=>movie.id === args.id);
            }
        },
    }
})

module.exports=new GraphQLSchema({
    query:Query,
});