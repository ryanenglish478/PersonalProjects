const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Defines the user
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type:String, required:true},

});

//Set Password
userSchema.methods.setPassword = async function(password){
    this.passwordHash = await bcrypt.hash(password, 10);
};

//Validate said password
userSchema.methods.validatePassword = async function(password){
    return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);