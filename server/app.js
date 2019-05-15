const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({ //middleware
    schema,
    graphiql: true
})); //needs to have a schema

app.listen(4000,() => {
    console.log("Now listening for port 4000 requests");
})
