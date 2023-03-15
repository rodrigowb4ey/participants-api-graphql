const graphql = require('graphql')
const Participant = require('../models/participant')

const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql

const ParticipantType = new GraphQLObjectType({
    name: 'Participant',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        participation: { type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        participant: {
            type: ParticipantType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Participant.findById(args.id)
            }
        },
        participants: {
            type: new GraphQLList(ParticipantType),
            resolve(parent, args) {
                return Participant.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => (
        {
            addParticipant: {
                type: ParticipantType,
                args: {
                    firstName: { type: new GraphQLNonNull(GraphQLString) },
                    lastName: { type: new GraphQLNonNull(GraphQLString) },
                    participation: { type: new GraphQLNonNull(GraphQLInt) }
                },
                resolve(parent, args) {
                    let participant = new Participant({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        participation: args.participation
                    })
    
                    return participant.save()
                }
            },
            removeParticipant: {
                type: ParticipantType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) }
                },
                resolve(parent, args) {
                    return Participant.findByIdAndDelete(args.id)
                }
            }
        }
    )
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})