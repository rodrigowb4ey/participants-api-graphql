const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://root:example@localhost:27017')
mongoose.connection.once('open', () => {
    console.log('Connected to the database!')
})

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

app.listen(4000, () => {
    console.log('It works! Listening to requests on port 4000')
})