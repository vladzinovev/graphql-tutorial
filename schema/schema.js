const graphql = require('graphql');

//1-описываем данные хранящиеся в базе, 2- спец сервис
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt}= graphql;

//фильмы
const movies=[
    {id:'1', name: 'Pulp Fiction', genre: 'Crime', directorId:'1',},
    {id:'2', name: '1984', genre: 'Sci-Fi', directorId:'2',},
    {id: 3, name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId:'3',},
    {id: 4, name: 'Snatch', genre: 'Crime-Comedy', directorId:'4',},
];
//режиссеры
const directors=[
    {id:'1', name: 'Quentin Tarantino', age:55},
    {id:'2', name: 'Michael Radford',  age:72},
    {id:'3', name: 'James McTeique',  age:51},
    {id:'4', name: 'Guy Ritchie',  age:50},
];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        director:{
            type: DirectorType,
            resolve(parent, args){
                return directors.find(director=>director.id == parent.parent.directorId,);
            }
        }
    }),
});
/* query($id: ID){
    movie(id:$id){
      id
      name
    }
} */

const DirectorType = new GraphQLObjectType({
    name: 'Directors',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
       /*  movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({ directorName: parent.movieName })
            },
        }, */
    })
});
/* query($id: ID){
    directors(id:$id){
      id
      name
      age
    }
} */

//создаем корневой запрос и описываем его
const Query=new GraphQLObjectType({
    name: 'Query',
    //описываем запрос одного фильма
    fields:{
        movie:{
            type:MovieType,
            args:{id:{type:GraphQLID}},
            //какие данные будет возвращать
            resolve(parent,args){
                return movies.find(movie=>movie.id == args.id);
            }
        },
        directors:{
            type:DirectorType,
            args:{id:{type:GraphQLID}},
            //какие данные будет возвращать
            resolve(parent,args){
                return directors.find(director=>director.id == args.id);
            }
        },
    }
})

module.exports=new GraphQLSchema({
    query:Query,
});