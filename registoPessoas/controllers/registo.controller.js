var Registo = require('../models/registo.model');
exports.index = function (req, res) {
 res.send('Olá! Acesso com sucesso!');
};

//Create
exports.create = function(req, res){
	
	let registo = new  Registo({
		nome: req.body.nome,
		email: req.body.email,
		telefone: req.body.telefone,
		morada: req.body.morada,
	});
	
	registo.save(function(err){
		
		if(err){
			throw err;
		}
		res.send('Pessoa registada sucesso!')
	})
};

//Pesquisar por id
exports.details = function(req, res){
	//console.log('1');
	Registo.findById(req.params.id, function(err, registo){
		if(err){
			throw err;		
		}
		res.send(registo);
	})	
};

// Atualizar Registo
exports.update = function (req, res) {
    Registo.findById(req.params.id, function (err, registo) {
        if (err)
            res.send(err);
        registo.nome = req.body.nome ? req.body.nome: registo.nome;
        registo.email = req.body.email ? req.body.email: registo.email;
        registo.telefone = req.body.telefone ? req.body.telefone: registo.telefone;
        registo.morada = req.body.morada ? req.body.morada: registo.morada;
		registo.criadoEm = Date.now();
		//Guardar e verificar erros
		registo.save(function (err) {
			if(err){
				throw err;		
			}
			res.send('Registo Atualizado com sucesso!')
		});
	});
};

// Apagar Registo
exports.delete = function (req, res) {
    Registo.deleteOne({
        _id: req.params.id
    }, function (err, contact) {
        if(err){
			throw err;			
		}
        res.send('Registo Eliminado com sucesso!')
    });
};