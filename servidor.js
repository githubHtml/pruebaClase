var express = require("express");
var dust = require("dustjs-linkedin");
var cons = require("consolidate");

var app = express.createServer();

//para OpenShift
app.listen(process.env.OPENSHIFT_NODEJS_PORT,process.env.OPENSHIFT_NODEJS_IP);

//para correr localmente
//app.listen(8021);

//NOMBRE_LOGICO NOMBRE_FISICO(carpeta real)
//---- configuracion de carpetas estaticas ----
app.use("/css", express.static(__dirname + "/css"));
app.use("/css", express.directory(__dirname + "/css"));

app.use("/imagenes", express.static(__dirname + "/imagenes"));
app.use("/videos", express.static(__dirname + "/videos"));

// ----- CONFIGURACION DEL SISTEMA DE TEMPLATES -----
//le decimos que sistema de template usamos
app.engine("dust",cons.dust);
//que carpeta contiene nuestras vistas
app.set("views",__dirname + "/vistas");
//define cual es la extension por default de esas vistas
app.set("view engine","dust");

app.use(express.urlencoded());

// ---- DEFINICION DE RUTAS -------

app.get("/inicio2", function(req, res){
	
	res.send("Bienvenido a mi pagina");	
});

app.get("/", function(req, res){
	
	//aqui de alguna forma se consulto una base
	//la variable frase contiene el resultado de esa base
	
	var frase = "Hola a todos!";
	
	res.render("index",{
		frase:"Hola a todos!",
		datos:{
			nombre:"ismael",
			apellido:"robles"
		}		
	});
	
});


app.get("/contacto", function(req, res){
	
	res.render("contacto");	
});

//req = request = datos que envia el usuario
//res = response = lo que le mostramos al usuario
app.post("/suscribir", function(req, res){
	
	console.log("el email es:" + req.body.email);
	
	res.send("info recibida");
});

app.post("/contactar", function(req, res){
	
	console.log("nombre:" + req.body.nombre);
	console.log("email:" + req.body.email);
	console.log("url:" + req.body.url);
	console.log("edad:" + req.body.edad);
	console.log("dudas:" + req.body.dudas);
	 
	res.send("datos enviados");	
});

console.log("hola mundo");









