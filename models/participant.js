const mongoose = require('mongoose')
const Schema = mongoose.Schema

const participantSchema = new Schema({
    firstName: String,
    lastName: String,
    participation: Number
})

module.exports = mongoose.model('Participant', participantSchema)