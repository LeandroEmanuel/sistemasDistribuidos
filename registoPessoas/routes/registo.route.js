const express = require(`express`);
const router = express.Router();

//Colocar controller que ainda não foi criado
const registo_controller = require(`../controllers/registo.controller`);

router.route('/registo')
	.get(registo_controller.index)
	.post(registo_controller.create);
	
router.route('/registo/:id')
	.get(registo_controller.details)
	.patch(registo_controller.update)
	.put(registo_controller.update)
	.post(registo_controller.update)
	.delete(registo_controller.delete);

module.exports = router;