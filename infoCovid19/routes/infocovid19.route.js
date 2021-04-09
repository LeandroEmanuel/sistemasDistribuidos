const express = require(`express`);
const router = express.Router();

//Colocar controller que ainda não foi criado
const infocovid19_controller = require(`../controllers/infocovid19.controller`);

//teste simples
router.get('/', infocovid19_controller.index);

//importar dados
router.post('/importar', infocovid19_controller.importar);

//listar todos
router.get('/todos', infocovid19_controller.todos);

//listar novos casos
router.get('/novosCasos', infocovid19_controller.novosCasos);

//listar novos casos
router.get('/max/:ordem', infocovid19_controller.ordenar);

//listar internados cuidados intensivos
router.get('/uci', infocovid19_controller.uci);

//media a seis dias
router.get('/media', infocovid19_controller.media);

router.delete('/apagar', infocovid19_controller.apagar);


module.exports = router;

