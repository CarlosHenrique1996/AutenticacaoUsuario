const jwt = require('jsonwebtoken');

const auth = (req, res, next) =>{
    const token_header = req.headers.auth;
    if(!token_header) return res.status(401).send({error: 'Token não enviado!'});

    jwt.verify(token_header, 'projectCarlos', (err, decode) => {
        if(err) return res.status(401).send({ error: 'Token invalido!'});

        res.locals.auth_data = decode;

        return next();
    })
}

module.exports = auth