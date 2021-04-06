const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let RegistoSchema = new Schema({
	nome: {type: String, required: true},
	email: {type: String, required: true},
	telefone: {type: String, required: true},
	morada: {type: String, required: true},
	criadoEm: {type: Date, default: Date.now},
});
//Exportar o modelo
module.exports = mongoose.model('Registo', RegistoSchema);

/*module.exports.get = function (callback, limit) {
   Bio.find(callback).limit(limit); 
}*/