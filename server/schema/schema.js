const graphql = require('graphql');
const _ = require('lodash');

const{ GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql; //the object is graphhed from graphql package
//dummy data
const books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
    {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
  ]

var authors = [
    {name: "Ellen", age: 19, id: '1'},
    {name: "Leo", age: 18, id: "2"},
    {name: "Yurio", age: 5, id:"3"}
]


const BookType = new GraphQLObjectType({ //function that takes in an object
    name: 'Book',
    fields: () => ({ //function
        id: {type: GraphQLString}, 
        name: {type: GraphQLString},
        genre: {type: GraphQLString}, 
        author:{
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({ //function that takes in an object
    name: 'Author',
    fields: () => ({ //function
        id: {type: GraphQLID}, 
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
});

//root queries
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType', 
    fields: {
        book:{
            type: BookType,
            args: {id: {type: GraphQLID}}, //we must provide an id in the front end when calling for it
            resolve(parent, args){ //code that is actually used to get the data
                //using lodash to find the book
                return _.find(books, {id: args.id});
        }
    }, 
    author: {
        type: AuthorType,
        args: {id: {type: GraphQLID}},
        resolve(parent, args){
            return _.find(authors, {id: args.id});
        }
    }
}
});

module.exports = new GraphQLSchema({
    query: RootQuery
});