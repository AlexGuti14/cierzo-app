const request = require('request');
const logger = require('../../config/winston.log').logger;
const barrios = require('../../public/variables/barriosGeoJson').barrios;
const densidades = require('../../public/variables/barriosGeoJson').densidades;
const barriosUTM = require('../../public/variables/barriosUTM').barriosUTM;
var jwt = require('jsonwebtoken');


var classifyPoint = require("robust-point-in-polygon");


const apiOptions = {
	server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://cierzo.herokuapp.com';
}

// PUBLIC EXPOSED METHODS

/*
 * 
 */
const getDistrict = function (req, res){
	const districtid = req.params.districtid;
	const path = `/api/district/${districtid}`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send(body);
			}
			else if (response.statusCode === 404) {
				logger.error("Get district error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}


/*
 * 
 */
const getDistrictDB = function (req, res){
	const districtid = req.params.districtid;
	const path = `/api/district/data/${districtid}`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send(body);
			}
			else if (response.statusCode === 404) {
				logger.error("Get district errorrrrrr");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}


/*
 * 
 */
const getRanking = function (req, res){
	const path = `/api/district`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send(body);
			}
			else if (response.statusCode === 404) {
				logger.error("Get ranking error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

/*
 * 
 */
const filter = async function (req, res){
	const filterName = req.params.filterName;

	const path = `/api/district/data`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		(err, response, body) => {
			var barrios = body;
			if (response.statusCode === 200) {
				if(filterName=="conectividad"){
					barrios.sort(function(a,b){
						return b.conectividad.estrellas - a.conectividad.estrellas;
					});
				}
				else if(filterName=="demografia"){
					barrios.sort(function(a,b){
						return b.demografia.estrellas - a.demografia.estrellas;
					});
				}
				else if(filterName=="economia"){
					barrios.sort(function(a,b){
						return b.economia.estrellas - a.economia.estrellas;
					});
				}
				else if(filterName=="cultura"){
					barrios.sort(function(a,b){
						return b.cultura.estrellas - a.cultura.estrellas;
					});
				}
				else{
					barrios.sort(function(a,b){
						return b.estrellas - a.estrellas;
					});
				}
				res.statusCode = 200;
				res.send(barrios);
			}
			else if (response.statusCode === 404) {
				logger.error("Get rankingDB error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}


//VALUATIONS

/*
 * 
 */
const addValuation = function (req, res){
	const btoken = req.headers.authorization;
	const token = btoken.replace("Bearer ", "");
	var user = jwt.decode(token);
	const userId = user._id;
	
	const districtid = req.params.districtid;
	const path = `/api/district/${districtid}/valuation`;
	const postdata = {
		score: req.body.score,
		userId: userId
	};
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'POST',
		json: postdata
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 201) {
				res.statusCode = 201;
				res.send("Created");
			}
			else if (response.statusCode === 404) {
				logger.error("Add valuation error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

/*
 * 
 */
const updateValuation = function (req, res){
	const btoken = req.headers.authorization;
	const token = btoken.replace("Bearer ", "");
	var user = jwt.decode(token);
	const userId = user._id;

	const districtid = req.params.districtid;
	const path = `/api/district/${districtid}/valuation`;
	const postdata = {
		score: req.body.score,
		userId: userId
	};
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'PUT',
		json: postdata
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send("Updated");
			}
			else if (response.statusCode === 404) {
				logger.error("Update valuation error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

/*
 * 
 */
const getmyValuation = function (req, res){
	const btoken = req.headers.authorization;
	const token = btoken.replace("Bearer ", "");
	var user = jwt.decode(token);
	const userId = user._id;

	const districtid = req.params.districtid;
	const path = `/api/district/${districtid}/valuation/myvaluation`;
	const postdata = {
		userId: userId
	};
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: postdata
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send({score: body});
			}
			else if (response.statusCode === 404) {
				logger.error("Get valuation error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

/*
 * 
 */
const getValuation = function (req, res){
	const districtid = req.params.districtid;
	const path = `/api/district/${districtid}/valuation`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				var valuations = body;

				var uno = valuations.filter(function(item) {
					return item.score == 1
				});
				var dos = valuations.filter(function(item) {
					return item.score == 2
				});
				var tres = valuations.filter(function(item) {
					return item.score == 3
				});
				var cuatro = valuations.filter(function(item) {
					return item.score == 4
				});
				var cinco = valuations.filter(function(item) {
					return item.score == 5
				});

				res.statusCode = 200;
				res.send([uno.length,dos.length, tres.length,cuatro.length,cinco.length]);
			}
			else if (response.statusCode === 404) {
				logger.error("Get valuation error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

/*
 * 
 */
const stats = function (req, res){
	const path = `/api/district/stats`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				var barrios = body;
				var infoBarrios = [];
				barrios.forEach(function(barrio) {

					infoBarrios.push({
						nombre: barrio.name,
						comentarios: barrio.comments.length,
						valoraciones: barrio.valuations.length,
						visitas: barrio.numAccess
					})

				});
				
				res.statusCode = 200;
				res.send(infoBarrios);
			}
			else if (response.statusCode === 404) {
				logger.error("Get ranking error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}


// PRIVATE HELPER METHODS


/*
 * 
 */
const calcularEstrellasConectividad = async function (barrios){
	return new Promise(function (resolve, reject) {

		var estrellasConectividad = [];
		barrios.forEach(function(barrio) {
			var count = 0;

			switch(true){
				case barrio.conectividad.paradataxis/densidades[barrio.districtId-1]*100 > 10:
					count += 5;
					break;
				case barrio.conectividad.paradataxis/densidades[barrio.districtId-1]*100 > 7:
					count += 4;
					break;
				case barrio.conectividad.paradataxis/densidades[barrio.districtId-1]*100 > 4:
					count += 3;
					break;
				case barrio.conectividad.paradataxis/densidades[barrio.districtId-1]*100 > 1:
					count += 2;
				break;
				case barrio.conectividad.paradataxis/densidades[barrio.districtId-1]*100 > 0:
					count += 1;
				break;
				default:
					count += 0;
			}

			switch(true){
				case barrio.conectividad.paradasbus/densidades[barrio.districtId-1] > 100:
					count += 5;
					break;
				case barrio.conectividad.paradasbus/densidades[barrio.districtId-1] > 50:
					count += 4;
					break;
				case barrio.conectividad.paradasbus/densidades[barrio.districtId-1] > 10:
					count += 3;
					break;
				case barrio.conectividad.paradasbus/densidades[barrio.districtId-1] > 1:
					count += 2;
				break;
				case barrio.conectividad.paradasbus/densidades[barrio.districtId-1] > 0:
					count += 1;
				break;
				default:
					count += 0;
			}

			switch(true){
				case barrio.conectividad.paradastranvia > 8:
					count += 5;
					break;
				case barrio.conectividad.paradastranvia > 6:
					count += 4;
					break;
				case barrio.conectividad.paradastranvia > 4:
					count += 3;
					break;
				case barrio.conectividad.paradastranvia > 2:
					count += 2;
				break;
				case barrio.conectividad.paradastranvia > 0:
					count += 1;
				break;
				default:
					count += 0;
			}

			switch(true){
				case barrio.conectividad.aparcamientosCoche/densidades[barrio.districtId-1]*100 > 7:
					count += 5;
					break;
				case barrio.conectividad.aparcamientosCoche/densidades[barrio.districtId-1]*100 > 4:
					count += 4;
					break;
				case barrio.conectividad.aparcamientosCoche/densidades[barrio.districtId-1]*100 > 3:
					count += 3;
					break;
				case barrio.conectividad.aparcamientosCoche/densidades[barrio.districtId-1]*100 > 2:
					count += 2;
				break;
				case barrio.conectividad.aparcamientosCoche/densidades[barrio.districtId-1]*100 > 0:
					count += 1;
				break;
				default:
					count += 0;
			}

			switch(true){
				case barrio.conectividad.aparcamientosBicis/densidades[barrio.districtId-1]*100 > 100:
					count += 5;
					break;
				case barrio.conectividad.aparcamientosBicis/densidades[barrio.districtId-1]*100 > 20:
					count += 4;
					break;
				case barrio.conectividad.aparcamientosBicis/densidades[barrio.districtId-1]*100 > 4:
					count += 3;
					break;
				case barrio.conectividad.aparcamientosBicis/densidades[barrio.districtId-1]*100 > 1:
					count += 2;
				break;
				case barrio.conectividad.aparcamientosBicis/densidades[barrio.districtId-1]*100 > 0:
					count += 1;
				break;
				default:
					count += 0;
			}

			switch(true){
				case barrio.conectividad.aparcamientosMotos/densidades[barrio.districtId-1]*100 > 5:
					count += 5;
					break;
				case barrio.conectividad.aparcamientosMotos/densidades[barrio.districtId-1]*100 > 3:
					count += 4;
					break;
				case barrio.conectividad.aparcamientosMotos/densidades[barrio.districtId-1]*100 > 2:
					count += 3;
					break;
				case barrio.conectividad.aparcamientosMotos/densidades[barrio.districtId-1]*100 > 1:
					count += 2;
				break;
				case barrio.conectividad.aparcamientosMotos/densidades[barrio.districtId-1]*100 > 0:
					count += 1;
				break;
				default:
					count += 0;
			}

			estrellasConectividad.push({ 
				districtId: barrio.districtId,
				estrellas: count/6
			});
		});


		resolve(estrellasConectividad);

	});
}

/*
 * 
 */
const calcularEstrellasEconomia = async function (barrios){

	return new Promise(function (resolve, reject) {
		var estrellas = [];
		barrios.forEach(function(barrio) {
			var count;

			switch(true){
				case barrio.economia.renta > 17000:
					count = 5;
					break;
				case barrio.economia.renta > 13000:
					count = 4;
					break;
				case barrio.economia.renta > 10500:
					count = 3;
					break;
				case barrio.economia.renta > 9500:
					count = 2;
				break;
				default:
					count = 1;
			}

			estrellas.push({ 
				districtId: barrio.districtId,
				estrellas: count
			});

		});

		resolve(estrellas);
	});
}

/*
 * 
 */
const calcularEstrellasCultura = async function (barrios){

	return new Promise(function (resolve, reject) {
		
		var estrellas = [];
		barrios.forEach(function(barrio) {
			//console.log(barrio.cultura.artepublico/densidades[barrio.districtId-1]*100);
			var count = 0;
			switch(true){
				case barrio.cultura.monumentos > 6:
					count += 5;
					break;
				case barrio.cultura.monumentos > 4:
					count += 4;
					break;
				case barrio.cultura.monumentos > 2:
					count += 3;
					break;
				case barrio.cultura.monumentos > 1:
					count += 2;
				break;
				case barrio.cultura.monumentos > 0:
					count += 1;
				break;
				default:
					count += 0;
			}

			switch(true){
				case barrio.cultura.restaurantes/densidades[barrio.districtId-1]*100 > 5:
					count += 5;
					break;
				case barrio.cultura.restaurantes/densidades[barrio.districtId-1]*100 > 4:
					count += 4;
					break;
				case barrio.cultura.restaurantes/densidades[barrio.districtId-1]*100 > 3:
					count += 3;
					break;
				case barrio.cultura.restaurantes/densidades[barrio.districtId-1]*100 > 1:
					count += 2;
				break;
				case barrio.cultura.restaurantes/densidades[barrio.districtId-1]*100 > 0:
					count += 1;
				break;
				default:
					count += 0;
			}

			switch(true){
				case barrio.cultura.hoteles/densidades[barrio.districtId-1]*100 > 10:
					count += 5;
					break;
				case barrio.cultura.hoteles/densidades[barrio.districtId-1]*100 > 5:
					count += 4;
					break;
				case barrio.cultura.hoteles/densidades[barrio.districtId-1]*100 > 2:
					count += 3;
					break;
				case barrio.cultura.hoteles/densidades[barrio.districtId-1]*100 > 1:
					count += 2;
				break;
				case barrio.cultura.hoteles/densidades[barrio.districtId-1]*100 > 0:
					count += 1;
				break;
				default:
					count += 0;
			}

			switch(true){
				case barrio.cultura.puntointeres/densidades[barrio.districtId-1]*100 > 20:
					count += 5;
					break;
				case barrio.cultura.puntointeres/densidades[barrio.districtId-1]*100 > 10:
					count += 4;
					break;
				case barrio.cultura.puntointeres/densidades[barrio.districtId-1]*100 > 5:
					count += 3;
					break;
				case barrio.cultura.puntointeres/densidades[barrio.districtId-1]*100 > 2:
					count += 2;
				break;
				case barrio.cultura.puntointeres/densidades[barrio.districtId-1]*100 > 0:
					count += 1;
				break;
				default:
					count += 0;
			}

			switch(true){
				case barrio.cultura.artepublico/densidades[barrio.districtId-1]*100 > 20:
					count += 5;
					break;
				case barrio.cultura.artepublico/densidades[barrio.districtId-1]*100 > 10:
					count += 4;
					break;
				case barrio.cultura.artepublico/densidades[barrio.districtId-1]*100 > 7:
					count += 3;
					break;
				case barrio.cultura.artepublico/densidades[barrio.districtId-1]*100 > 2:
					count += 2;
				break;
				case barrio.cultura.artepublico/densidades[barrio.districtId-1]*100 > 0:
					count += 1;
				break;
				default:
					count += 0;
			}
			estrellas.push({ 
				districtId: barrio.districtId,
				estrellas: count/5
			});
		});


		resolve(estrellas);

	});

}

/*
 * 
 */
const getAllData = async function (req, res){
	let taxis = await contarDatosAllBarrios("https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/equipamiento/parada-taxi.geojson");
	let bus = await contarDatosAllBarrios("https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/poste-autobus.geojson");
	let tranvia = await contarDatosAllBarrios("https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/parada-tranvia.geojson");
	let aparcaCoche = await contarDatosAllBarrios("https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/equipamiento/aparcamiento-publico.geojson");
	let aparcaBicis = await contarDatosAllBarrios("https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/equipamiento/aparcamiento-bicicleta.geojson");
	let aparcaMotos = await contarDatosAllBarrios("https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/equipamiento/aparcamiento-moto.geojson");
	//DEMOGRAFIA
	let listedadmedia = await calcularNumeroAllBarrios("http://www.zaragoza.es/demografia/juntas_point_Edad_media_2017.json");
	let listpoblacionjuvenil = await calcularNumeroAllBarrios("http://www.zaragoza.es/demografia/juntas_point_Grupos_edad_compuesto_2017.json");
	let listpoblacionenvejecida = await calcularNumeroAllBarrios("http://www.zaragoza.es/demografia/juntas_point_Pob_envej_2014.json");
	//ECONOMIA
	let listrenta = await calcularNumeroAllBarrios("http://www.zaragoza.es/demografia/juntas_point_Renta_per_capita_2015.json");
	//CULTURA Y OCIO
	let listmonumentos = await contarDatosAllBarrios("https://www.zaragoza.es/sede/servicio/monumento.geojson?srsname=wgs84&fl=coordinates");
	let listrestaurantes = await contarDatosAllBarrios("https://www.zaragoza.es/sede/servicio/restaurante.geojson?srsname=wgs84&fl=coordinates");
	let listhoteles = await contarDatosAllBarrios("https://www.zaragoza.es/sede/servicio/alojamiento.geojson?srsname=wgs84&fl=coordinates");
	let listpuntointeres = await contarDatosAllBarrios("https://www.zaragoza.es/sede/servicio/puntos-interes.geojson?srsname=wgs84&fl=coordinates");
	let listartepublico = await contarDatosAllBarrios("https://www.zaragoza.es/sede/servicio/arte-publico.geojson?srsname=wgs84&fl=coordinates");
	//..

	var barrios = [];
	var i = 1;
	while(i <= 29){
		var paradataxis = taxis.filter(function(item) {
			return item.OBJECTID == i;
		});
		var paradasbus = bus.filter(function(item) {
			return item.OBJECTID == i;
		});
		var paradastranvia = tranvia.filter(function(item) {
			return item.OBJECTID == i;
		});
		var aparcamientosCoche = aparcaCoche.filter(function(item) {
			return item.OBJECTID == i;
		});
		var aparcamientosBicis = aparcaBicis.filter(function(item) {
			return item.OBJECTID == i;
		});
		var aparcamientosMotos = aparcaMotos.filter(function(item) {
			return item.OBJECTID == i;
		});
		//
		var edadmedia = listedadmedia.filter(function(item) {
			return item.OBJECTID == i;
		});
		var poblacionjuvenil = listpoblacionjuvenil.filter(function(item) {
			return item.OBJECTID == i;
		});
		var poblacionenvejecida = listpoblacionenvejecida.filter(function(item) {
			return item.OBJECTID == i;
		});
		//
		var renta = listrenta.filter(function(item) {
			return item.OBJECTID == i;
		});
		//
		var monumentos = listmonumentos.filter(function(item) {
			return item.OBJECTID == i;
		});
		var restaurantes = listrestaurantes.filter(function(item) {
			return item.OBJECTID == i;
		});
		var hoteles = listhoteles.filter(function(item) {
			return item.OBJECTID == i;
		});
		var puntointeres = listpuntointeres.filter(function(item) {
			return item.OBJECTID == i;
		});
		var artepublico = listartepublico.filter(function(item) {
			return item.OBJECTID == i;
		});

		var barrio = {
			districtId: i,
			name: paradataxis[0].name,
			estrellas : 0,
			conectividad : {
				paradataxis: paradataxis[0].count,
				paradasbus: paradasbus[0].count,
				paradastranvia: paradastranvia[0].count,
				aparcamientosCoche: aparcamientosCoche[0].count,
				aparcamientosBicis: aparcamientosBicis[0].count,
				aparcamientosMotos: aparcamientosMotos[0].count,

			},
			demografia : {
				edadmedia : edadmedia[0].count.Edad_media,
				poblacionjuvenil: poblacionjuvenil[0].count,
				poblacionenvejecida: poblacionenvejecida[0].count.Pob_envej
			},
			economia : {
				renta: renta[0].count.Renta_per_capita
			},
			cultura : {
				monumentos: monumentos[0].count,
				restaurantes: restaurantes[0].count,
				hoteles: hoteles[0].count,
				puntointeres: puntointeres[0].count,
				artepublico: artepublico[0].count
			}
		}	
		barrios.push(barrio);
		i++;
	}

	var estrellasConectividad = await calcularEstrellasConectividad(barrios);
	var estrellasEconomia = await calcularEstrellasEconomia(barrios);
	var estrellasCultura= await calcularEstrellasCultura(barrios);

	barrios.forEach(function(barrio) {

		var conectividad = estrellasConectividad.filter(function(item) {
			return item.districtId == barrio.districtId
		});

		var economia = estrellasEconomia.filter(function(item) {
			return item.districtId == barrio.districtId
		});

		var cultura = estrellasCultura.filter(function(item) {
			return item.districtId == barrio.districtId
		});

		barrio.conectividad.estrellas = conectividad[0].estrellas;
		barrio.economia.estrellas = economia[0].estrellas;
		barrio.cultura.estrellas = cultura[0].estrellas;

		barrio.estrellas = (conectividad[0].estrellas + economia[0].estrellas + cultura[0].estrellas) / 3;
	});


	const path = `/api/district/saveData`;
	const postdata = {
		barrios: barrios
	};
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'POST',
		json: postdata
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 201) {
				logger.info("Add info db barrios");
				//res.statusCode = 201;
				//res.send("Save");
			}
			else if (response.statusCode === 404) {
				logger.error("Add barrios error");
				//res.statusCode = 404;
				//res.send("Error");
			}
		}
	);

}

const contarDatosAllBarrios = function(url){
	var barriosId = barrios.features.filter(function(item) {
		return item.properties.OBJECTID
	});
    // Una vez tenemos los barrio se hace la llamada al API del ayuntamiento
    const path = url;
    const requestOptions = {
        url: path,
        method: 'GET',
        json: {}
    };
	var result;
	return new Promise(function (resolve, reject) {
		request(
			requestOptions,
			(err, response, body) => {
				if (response.statusCode === 200) {
					result = body.features;
					var coords;
					var barriosInfo = [];

					barriosId.forEach(function(barrio) {
						var count = 0;
						for (var i = 0; i < result.length; i++) {
							coords = result[i].geometry.coordinates;
							if (classifyPoint(barrio.geometry.coordinates[0], coords) == -1 || classifyPoint(barrio.geometry.coordinates[0], coords) == 0){
								count ++;
							}
						}

						barriosInfo.push({
							OBJECTID:barrio.properties.OBJECTID,
							name: barrio.properties.NOMBRE,
							count: count
						})						
					});
					resolve(barriosInfo);	
				}
				else if (response.statusCode === 404 || response.statusCode === 400) {
					//logger.error("Error al acceder al API del ayuntamiento");
					reject(err);
				}
			}
		);
	});
}

const calcularNumeroAllBarrios = function(url){
	var barriosId = barriosUTM.features.filter(function(item) {
		return item.properties.OBJECTID
	});
    // Una vez tenemos el barrio se hace la llamada al API del ayuntamiento
    const path = url;
    const requestOptions = {
        url: path,
        method: 'GET',
        json: {}
    };
	var result;
	return new Promise(function (resolve, reject) {
		request(
			requestOptions,
			(err, response, body) => {
				if (response.statusCode === 200) {
					result = body.features;
					var coords;
					var data;
					found = new Boolean(false);
					var i = 0;
					var barriosInfo = [];

					barriosId.forEach(function(barrio) {

						found = new Boolean(false);
						var i = 0;
						while (i < result.length && found==false) {
							coords = result[i].geometry.coordinates;
							if (classifyPoint(barrio.geometry.coordinates[0], coords) == -1 || classifyPoint(barrio.geometry.coordinates[0], coords) == 0){
								data = result[i].properties;
								found = true;
							}
							i++;
						}
						found = false;
						barriosInfo.push({
							OBJECTID:barrio.properties.OBJECTID,
							count: data
						})						
					});
					resolve(barriosInfo);					
				}
				else if (response.statusCode === 404 || response.statusCode === 400) {
					logger.error("Error al acceder al API del ayuntamiento");
					reject(err);
				}
			}
		);
	});
}

module.exports = {
	getDistrict,
	getDistrictDB,
	getRanking,
	filter,
	addValuation,
	updateValuation,
	getmyValuation,
	getValuation,
	getAllData,
	stats
};