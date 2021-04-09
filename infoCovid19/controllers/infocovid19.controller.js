var InfoCovid19 = require('../models/infocovid19.model');
var fs = require("fs");


exports.index = function (req, res) {
 res.send('Bem vindo à infoCovid!');
};


exports.importa = function(req, res){
	let j = 397;
	
	//ler o ficheiro JSON com os dados
	fs.readFile(/*__dirname +*/ "./" + "dadosCovid19.json", 'utf8', function(err, doc){
		if(err){
				throw err;
		}
		
		var info = JSON.parse(doc);
		var conf = info.confirmados;
			
		for(i = j; i < j + 5; i++){
			let confirmados = conf[i];
			let data = info.data[i];
			let CI = info.internados_uci[i];
			let rec = info.recuperados[i];
			let ob = info.obitos[i];
				
			let infocovid19 = new InfoCovid19 ({
				novosCasos: confirmados,
				nInternadosCI: CI,
				recuperados: rec,
				obitos: ob,
				data: data
			})
			console.log(infocovid19);
			infocovid19.save(function(err){
				if(err) throw err;
			});
		}
			
		//console.log(conf[397]);
		if(err){
			throw err;
		}
		res.send('Dados importados com sucesso!');
	});
};

exports.importar = function(req, res){
	let j = 397;
	
	//ler o ficheiro JSON com os dados
	fs.readFile(/*__dirname +*/ "./" + "dadosCovid19.json", 'utf8', function(err, doc){
		if(err){
				throw err;
		}
		
		var info = JSON.parse(doc);
		var conf = info.confirmados_novos;
			
			for(i = j; i < j + 5; i++){
				let confirmados = conf[i];
				let datas = info.data[i];
				let CI = info.internados_uci[i];
				let rec = info.recuperados[i];
				let ob = info.obitos[i];
				
				InfoCovid19.count({data: datas}, function(err, infocovid19){
					if(err){
						return next(err);					
					}
					if(infocovid19 == 0){
						let infocovid19 = new InfoCovid19 ({
						novosCasos: confirmados,
						nInternadosCI: CI,
						recuperados: rec,
						obitos: ob,
						data: datas
						})
						console.log(infocovid19);
						infocovid19.save(function(err){
							if(err) throw err;
						});
					}
					
					//res.send(infocovid19);
				});				
			}
		//console.log(conf[397]);
		if(err){
			throw err;
		}
		res.send('Dados importados com sucesso!');
	});
};


//Listar todos
exports.todos = function(req, res){
	InfoCovid19.find(function(err, infocovid19){
		if(err){
			return next(err);
		}
		res.send(infocovid19);
	})	
};

//Listar novos casos diarios
exports.novosCasos = function(req, res){
	InfoCovid19.find({},{_id: 0, data: 1, novosCasos: 1},function(err, infocovid19){
		if(err){
			throw err;
		}
		console.log(infocovid19);
		res.send(infocovid19);
	
	})
};

//listar internados cuidados intensivos
exports.uci = function(req, res){
	InfoCovid19.find({},{_id: 0, data: 1, nInternadosCI: 1},function(err, infocovid19){
		if(err){
			throw err;
		}
		console.log(infocovid19);
		res.send(infocovid19);
	
	})
};

//Dia com mais casos 1
exports.ordenar = function(req, res){
	InfoCovid19.find({},{_id: 0,data:1, novosCasos: 1},function(err, infocovid19){
		if(err){
			throw err;
		}
		console.log(req.params.ordem);
		console.log(infocovid19);
		res.send(infocovid19);
	
	}).sort({novosCasos: req.params.ordem}).limit(1);
};

//Dia com mais casos 2
exports.maximo2 = function(req, res){
	Covid.findOne({},{_id: 0, data: 1, novoscasos: 1})
		.sort('-novoscasos')
		.exec(function(err, covid){
			if(err){
				throw err;			
			}
			console.log(covid);
			res.send(covid);
	})
};

//media a seis dias 
exports.media = function(req, res){
    InfoCovid19.aggregate([
        {$group: {"_id": "", media: {$avg: '$novosCasos'}}}
        ], function (err, infocovid19) {
			
        if(err){
            throw err;
        }

		console.log('media: ' + infocovid19[0].media );
        res.send('media: ' + infocovid19[0].media);
        });	
};



// Apagar todos os dados
exports.apagar = function (req, res) {
    InfoCovid19.remove(function(err){
        if(err){
			throw err;			
		}
		res.send('Todos os dados Eliminados com sucesso!');
    });
};