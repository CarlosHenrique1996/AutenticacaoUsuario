# API de cadastro de dados de usuários.
Nessa API é possível cadastrar e consultar usurio atraves de endepoints. 

## Sobre projeto

### Objetivo
Projeto criado com o intuito de praticar o desenvolvimento de APIs Rest utilizando JavaScript e Node.js.

## Funcionalidades
### Enfpoints disponiveis:

* Consulta na base todos os usurios cadastrados.
```
GET  users/

```
* Consulta usuario por nome.
```
GET  users/consulta
```

* Cria usuario.
```
POST  users/create
```
Observação: Ao criar um usuario novo, automaticamente é gerado um Token. Esse Token deve ser utilizado para autetincar o serviço de API ao efetuar o login com o usurio novo. Esse Token deve ser informado no headers.

* Login de usuario cadastrado.
```
POST  users/auth
```

## Tecnologias utilizadas
* Desenvolvido em JavaScript e NodeJs
* Banco MongoDB