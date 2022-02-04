const express = require('express');
const router = express.Router();
const Users = require('../model/user'); //conexão entre esse arquivo com o arquivo model user.js (Neste arq é aonde tem as colunas do bd declaradas.
const bcrypt = require('bcrypt');
const { findOne } = require('../model/user');
const jwt = require('jsonwebtoken');

//FUNCOES AUXILIARES 
const createUserToken = (userId) =>{
    return jwt.sign({id: userId}, 'projectCarlos', { expiresIn: '7d'});
};


//consulta de usuários com async e try catch
router.get('/', async(req,res) =>{
    try{
        const users = await Users.find({});
        return res.send(users);
    }
    catch (err) {
        return res.status(400).send({ error: 'Erro na consulta de usuários!'});
    }
});

/*
//consulta de usuários por nome forma async NÃO DEU BOM
router.get('/consulta', async(req,res) =>{
    const {name} = req.body;
    try{
        if (await !Users.findOne({name})) return res.status(400).send ({ error: 'Preciso que insira algum dado!'});  //Verifica se o obj esta vindo vazio
        if (await !Users.findOne({data})) return res.status(208).send({error: 'Não existe este usuario ' + name});  //Verifica se o usuario consulta consta no bd, se ñ tiver retorna mensagem
        return res.send(data);
    }
    catch{
        return res.status(400).send({ error: 'Erro ao buscar usuário!'});  //Caso aconteceça algum erro na busca

    }
});
*/

//consulta de usuários por nome
router.get('/consulta', (req,res) =>{  
    const {name} = req.body;

    Users.findOne({name}, (err, data) =>{
        if(!name) return res.status(400).send ({ error: 'Preciso que insira algum dado!'});  //Verifica se o obj esta vindo vazio
        if (err) return res.status(400).send({ error: 'Erro ao buscar usuário!'});  //Caso aconteceça algum erro na busca
        if(!data) return res.status(208).send({error: 'Não existe este usuario ' + name});  //Verifica se o usuario consulta consta no bd, se ñ tiver retorna mensagem
        return res.send(data); //Retorna o usuario desejado
    });
});


//Criar usuario
router.post('/create', (req,res) =>{  
    const {name, email, password} = req.body; //pegando as informacoes que vieram no body da requisição (email e password)

    if(!email || !password || !name) return res.status(400).send ({ error: 'Dados insuficientes!'});  //Se no body não tiver usuario ou password, aqui irá dá erro

    Users.findOne({email}, (err, data) =>{  //Aqui irá validar se o usurio ja existe.
        if (err) return res.status(400).send({ error: 'Erro ao buscar usuário'});
        if (data) return res.status(208).send({ error: 'Usuário já registrado!'});

        Users.create(req.body, (err, data) =>{  //Caso chegue até aqui apos diversas validacoes, ele irá criar o usuario
            if (err) return res.status(400).send({error: 'Erro ao criar usuário!'});

            data.password = undefined; //Impede de retornar a senha com os restante dos dados 

            const obj1 = {message: 'Seu usuario foi criado. Muito obrigado ' + data.name}
            const obj2 = {email, token: createUserToken(email.id)} //Ao criar o usuario, será gerado um novo token.
            const obj3 = Object.assign( obj1, obj2);

            return res.send( obj3 );  
        });
    });
});

//Autenticação de usuário
router.post('/auth', (req, res) =>{
    const {email, password} = req.body;  //Pegando obj do body

    if (!email || !password) return res.status(400).send({error: 'E-mail ou senha não preenchido'});  //Se algum dado estiver faltando, irá retornar erro

    Users.findOne({email}, (err, data) =>{  //Consultando email
        if (err) return res.status(400).send({error: ' Erro ao buscar usuário!'});
        if (!data) return res.status(400).send({error: 'Usuário não registrado'});  //Verificando se usuario/email existe

        bcrypt.compare(password, data.password, (err, same) =>{  //caso exista, aqui irá veirficar se a senha esta correta.
            if(!same) return res.status(400).send({error: 'Senha incorreta!'});
            
            const obj1 = {message: 'Seja bem vindo, ' + data.name + '. Você esta autenticado.'}
            const obj2 = {email, token: createUserToken(email.id)} //Cada vez que o usuario logar, será gerado um novo token.
            const obj4 = {Id: data._id} 
            const obj3 = Object.assign( obj1, obj2, obj4);

            return res.send( obj3 );
        })
    }).select('+password');
});

/*
//Deletar usuario
router.delete('/delete', (req,res) =>{
    const {name} = req.body;
    Users.findOne({name}, (err, data) =>{
        if(!name) return res.send ({error: 'Dados insuficiente'});
        if(err) return res.send({error: 'Erro ao buscar usuário!'});
        if(!data) return res.send({error: 'Não existe usuário, portanto é possivel prosseguir com a exclusão'});
        Users.delete(req.body, (err, data) =>{
            if (err) return res.send({error: 'Erro ao criar usuário!'});
            return res.send({message: 'Usuario foi deletado com sucesso.'})
        })
    })


});
*/

module.exports = router;