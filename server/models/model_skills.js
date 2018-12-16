var mongoose = require('mongoose')
var Schema = mongoose.Schema
var SkillSchema = new Schema({
    skills: { type: Schema.Types.Mixed }
})
module.exports=mongoose.model('skills',SkillSchema,"skills");