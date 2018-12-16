var mongoose = require('mongoose')
var Schema = mongoose.Schema
var cardSchema = new Schema({
    username: { type: String },
    spades: { type: Schema.Types.Mixed,default:[] },
    hearts: { type: Schema.Types.Mixed,default:[] },
    diamonds: { type: Schema.Types.Mixed ,default:[]},
    clubs: { type: Schema.Types.Mixed, default:[] }
})
module.exports = mongoose.model('Useractivity', cardSchema);