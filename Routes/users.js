const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>{
    return res.send({message: 'Tudo certo com o método GET da rota de usuarios.'});
})

router.post('/', (req,res) =>{
    return res.send({message: 'Tudo certo com o método POST da rota de usuarios.'});
})

router.post('/create', (req,res) =>{
    return res.send({message: 'Seu usuario foi criado!'})
})

router.post('/update', (req,res) =>{
    return res.send({message: 'Usuario editado com sucesso'})
})

router.post('/delete', (req,res) =>{
    return res.send({message: 'Usuario deletado com sucesso'})
})
module.exports = router;