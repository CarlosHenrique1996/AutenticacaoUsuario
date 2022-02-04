const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Schema serve para modelar o banco de dados.

const UserSchema = new Schema({
    name: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema)