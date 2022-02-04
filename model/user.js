const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Schema serve para modelar o banco de dados.
const bcrypt = require ('bcrypt');

//Cria as colunas no banco de dados
const UserSchema = new Schema({  
    name: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    created: { type: Date, default: Date.now }
});

/* 
//Serve para criptografar as senhas de forma async
UserSchema.pre('save', async (next)=>{
    let user = this;
    if (!user.isModified('password')) return next();
    
    user.password = await bcrypt.hash(user.password, 10);
    return next();  
});
*/

//Serve para criptografar as senhas de forma callback
UserSchema.pre('save', function (next){
    let user = this;
    if (!user.isModified('password')) return next();
    
    bcrypt.hash(user.password, 10, (err, encrypted) =>{
        user.password = encrypted;
        return next();
    })
})


module.exports = mongoose.model('User', UserSchema)