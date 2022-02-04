const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();


router.get('/', auth, (req,res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'Tudo certo com o método GET da raiz.'});
})

router.post('/', (req,res) => {
    return res.send({message: 'Tudo certo com o método POST da raiz.'});
})


module.exports = router;