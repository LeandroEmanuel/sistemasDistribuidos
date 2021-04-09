const express = require('express')
const bodyParser = require('body-parser');

//importar as routes
const infocovid19 = require('./routes/infocovid19.route');

//inicialização express
const app = express();

//Acesso a BD 
const mongoose = require(`mongoose`);
let url = `mongodb://localhost:27017/infocovid19`;
let mongoDB = process.env.MONGODB_URI || url;

mongoose.connect(mongoDB,{
	useNewUrlParser: true,
	useUnifiedTopology: true
 });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on(`error`, console.error.bind(console, `Erro na Ligação ao MongoDB`));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//url:localhost:8081/route
app.use('/', infocovid19);
let porto = 8081;

app.listen(porto, () => {
	console.log('Servidor ativo no porto:' + porto);
});