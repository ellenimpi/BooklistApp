const graphql = require('graphql');
const_ = require('lodash');

const{ GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql; //the object is graphhed from graphql package
//dummy data
var books = [
    {name: "Hello", genre: "action", id: "1"},
    {name: "How are", genre: "fantasy", id: "2"},
    {name: "You", genre: "scifi", id: "3"}
];

const BookType = new GraphQLObjectType({ //function that takes in an object
    name: 'Book',
    fields: () => ({ //function
        id: {type: GraphQLString}, 
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

//root queries
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType', 
    fields: {
        book:{
            type: BookType,
            args: {id: {type: GraphQLString}}, //we must provide an id in the front end when calling for it
            resolve(parent, args){ //code that is actually used to get the data
                //using lodash to find the book
                return _.find(books, {id: args.id});
        }
    }
}
});

module.exports = new GraphQLSchema({
    query: RootQuery
});