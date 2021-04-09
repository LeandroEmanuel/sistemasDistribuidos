const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InfoCovid19Schema = new Schema({
	
	data: {
		type: String, 
		required: true
	},
	novosCasos: {
		type: Number,
		required: true
	},
	nInternadosCI: {
		type: Number,
		required: true
	},
	recuperados: {
		type: Number,
		required: true
	},
	obitos: {
		type: Number,
		required: true
	},
	
});
//Exportar o modelo
module.exports = mongoose.model('InfoCovid19', InfoCovid19Schema);