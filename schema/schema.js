//пароль hh9OjLA6P1mIGiq6

const graphql = require('graphql');

//1-описываем данные хранящиеся в базе, 2- спец сервис
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull}= graphql;

const Movies=require('../server/models/movie');
const Directors=require('../server/models/director');

//фильмы
/* const movies=[
    {id:'1', name: 'Pulp Fiction', genre: 'Crime', directorId:'1',},
    {id:'2', name: '1984', genre: 'Sci-Fi', directorId:'2',},
    {id:'3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId:'3',},
    {id:'4', name: 'Snatch', genre: 'Crime-Comedy', directorId:'4',},
    {id:'5', name: 'Reservoir Dogs', genre: 'Crime', directorId:'1',},
    {id:'6', name: 'The Hateeful Eight', genre: 'Crime', directorId:'1',},
    {id:'7', name: 'Inglourious Basterds', genre: 'Crime', directorId:'1',},
    {id:'8', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId:'4',},
]; */
/* const movies=[
    {id:'1', name: 'Pulp Fiction', genre: 'Crime', directorId:'1',},
    {id:'2', name: '1984', genre: 'Sci-Fi', directorId:'2',},
    {id:'3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId:'3',},
    {id:'4', name: 'Snatch', genre: 'Crime-Comedy', directorId:'4',},
    {id:'5', name: 'Reservoir Dogs', genre: 'Crime', directorId:'1',},
    {id:'6', name: 'The Hateeful Eight', genre: 'Crime', directorId:'1',},
    {id:'7', name: 'Inglourious Basterds', genre: 'Crime', directorId:'1',},
    {id:'8', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId:'4',},
]; */
//режиссеры
/* const directors=[
    {id:'1', name: 'Quentin Tarantino', age:55},
    {id:'2', name: 'Michael Radford',  age:72},
    {id:'3', name: 'James McTeique',  age:51},
    {id:'4', name: 'Guy Ritchie',  age:50},
]; */
/* const directors=[
    {"name": 'Quentin Tarantino', "age":55}, //6349c5c0da4136eb4ebac7d9
    {"name": 'Michael Radford',  "age":72}, //6349c5c664c005d76c0a6baf
    {"name": 'James McTeique',  "age":51}, //6349c63c64c005d76c0a6bb0
    {"name": 'Guy Ritchie',  "age":50}, //6349c65064c005d76c0a6bb1
]; */

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:new GraphQLNonNull(GraphQLString)},
        genre:{type:new GraphQLNonNull(GraphQLString)},
        directorId:{type:GraphQLID},
        director:{
            type: DirectorType,
            resolve(parent, args){
                //return directors.find(director=>director.id == parent.directorId,);
                return Directors.findById(parent.directorId);
            }
        }
    }),
});
/* query($id: ID){
    movie(id:$id){
      id
      name
      genre
      director{
        id
        name
      }
    }
}

 
*/

const DirectorType = new GraphQLObjectType({
    name: 'Directors',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt)},
        movie: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
               //return movies.filter(movie=>movie.directorId == parent.id)
               return Movies.find({directorId:parent.id});
            },
        }, 
        /* movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({ directorName: parent.movieName })
            },
        }, */
    })
});
/* query($id: ID){
    director(id:$id){
      id
      name
      age
      movie{
        name
        genre
      }
    }
} */

//создаем мутацию для добавления, удаления и обновления в нашей базе данных
const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addDirector:{
            type:DirectorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent,args){
                const director=new Directors({
                    name:args.name,
                    age:args.age,
                });
                return director.save();
            }
        },
        addMovie:{
            type:MovieType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                directorId:{type:GraphQLID},
            },
            resolve(parent,args){
                const movie=new Movies({
                    name:args.name,
                    genre:args.genre,
                    directorId:args.directorId,
                });
                return movie.save();
            }
        },
        deleteDirector:{
            type:DirectorType,
            args:{
                id:{type:GraphQLID},
            },
            resolve(parent,args){
                return Directors.findByIdAndRemove(args.id);
            }
        },
        deleteMovie:{
            type:MovieType,
            args:{
                id:{type:GraphQLID},
            },
            resolve(parent,args){
                return Movies.findByIdAndRemove(args.id);
            }
        },
        updateDirector:{
            type:DirectorType,
            args:{
                id:{type:GraphQLID},
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent,args){
                return Directors.findByIdAndUpdate(
                    args.id,
                    {$set:{name:args.name,age:args.age}},
                    {new:true},
                );
            }
        },
        updateMovie:{
            type:MovieType,
            args:{
                id:{type:GraphQLID},
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                directorId:{type:GraphQLInt},
            },
            resolve(parent,args){
                return Directors.findByIdAndUpdate(
                    args.id,
                    {$set:{name:args.name,genre:args.genre,directorId:args.directorId}},
                    {new:true},
                );
            }
        },
    }
})
/* mutation($name:String, $age:Int){
    addDirector(name:$name,age:$age){
      name
      age
    }
} 
mutation($name:String, $genre:String,$directorId:ID){
    addMovie(name:$name,genre:$genre,directorId:$directorId){
      name
      genre
    	directorId
    }
}
mutation($id:ID){
    deleteDirector(id:$id){
      name
    }
}
mutation($id:ID){
    deleteMovie(id:$id){
      name
    }
}
*/


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
                //return movies.find(movie=>movie.id == args.id);
                return Movies.findById(args.id);
            }
        },
        director:{
            type:DirectorType,
            args:{id:{type:GraphQLID}},
            //какие данные будет возвращать
            resolve(parent,args){
                //return directors.find(director=>director.id == args.id);
                return Directors.findById(args.id);
            }
        },
        //вывод всех фильмов
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                //return movies;
                return Movies.find({});
            },
        }, 
        //вывод всех режиссеров
        directors:{
            type: new GraphQLList(DirectorType),
            resolve(parent, args){
                //return directors;
                return Directors.find({});
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:Query,
    mutation:Mutation,
});