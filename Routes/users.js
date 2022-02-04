const express = require('express');
const router = express.Router();
const Users = require('../model/user'); //conexão entre esse arquivo com o arquivo model user.js (Neste arq é aonde tem as colunas do bd declaradas.

//consulta de usuários 
router.get('/', (req,res) =>{  
    Users.find({}, (err, data) =>{
        if (err) return res.status(400).send({ error: 'Erro na consulta de usuários!'});
        return res.send(data); //Retorna todos os usuarios.
    });
});

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
            return res.send({message: 'Seu usuario foi criado. Muito obrigado ' + data.name});  
        });
    });
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