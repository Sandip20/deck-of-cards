var mongoose = require('mongoose')
var Schema = mongoose.Schema
var cardSchema = new Schema({
    displayName: { type: String, required: true, unique: true, index: true },
    letter: { type: String },
    name: { type: String },
    suit: { type: Schema.Types.Mixed }
})
module.exports=mongoose.model('Card',cardSchema);