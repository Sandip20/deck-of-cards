var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema
var userSchema = new Schema({
    username: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    skills: { type: Array },
    password:{type:String},
    profileUrl:{type:String,default:'http://localhost:3000/assets/images/default.png'},
    //imagePaths: { type: Schema.Types.Mixed },
    imagePath1:{type:String},
    imagePath2:{type:String}
})

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5))
}
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}
module.exports = mongoose.model('User', userSchema)


