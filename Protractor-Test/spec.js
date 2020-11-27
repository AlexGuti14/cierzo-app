describe('Protractor Cierzo App', function() {
  var mail = element(by.id('mail'));
  var contra = element(by.id('contra'));
  var botonlogin = element(by.id('botonlogin'));
  var mensajeError = element(by.id('mensajeError'));
  var centro = element(by.id('popupbarrio'));
  var mapa = element(by.id('map'));
  
  

  beforeEach(function() {
    browser.get('http://localhost:4200/#/inicio-sesion');
  });
 
  it('login es exitoso', function() {
  //comprueba que un inicio de sesion correcto se guarda el valor token
    console.log("1- login es exitoso");
    mail.sendKeys('pedraza@gmail.com');
    contra.sendKeys('pedraza');
    botonlogin.click();
    browser.sleep(1000);
    var value = browser.executeScript("return window.localStorage.getItem('token');");
    console.log("devorao2 " + value);
    expect(value).toBeTruthy();
  });
    
  
  //comprueba que un inicio de sesion erroneo muestra usuario o contraseña incorrecto
  it('login falla', function() {
    console.log("2- login falla");
    //iniciosesion("pedraza@gmail.com","pedraza");
    //mail.sendKeys('hola');
    mail.sendKeys('pedraza@gmail.com');
    contra.sendKeys('pedrsaza');
    botonlogin.click();
    expect(mensajeError.getText()).toEqual('Usuario o contraseña incorrectos'); // This is wrong!
  });


  it('miro barrio', function() {
    console.log("3- miro barrio");
    mail.sendKeys('pedraza@gmail.com');
    contra.sendKeys('pedraza');
    botonlogin.click();
    var value = browser.executeScript("return window.localStorage.getItem('token');");
    //console.log("justo antes de centro click");
    //centro.click()
    browser.actions()
      .mouseMove(mapa, {x: 10, y: 10})
      .click()
      .perform();
    //console.log("justo despues de centro click");
    centro.click();
    //browser.sleep(5000);

    //expect(mensajeError.getText()).toEqual('Usuafrio o contraseña incorrectos'); // This is wrong!
  });

  	//darLike inicia sesion va a un barrio, añade un comentario da like y comprueba que se ha dado
it('comentarioydarLike', function() {
	console.log("4- comentario y dar like");
    mail.sendKeys('pedraza@gmail.com');
    contra.sendKeys('pedraza');
    //browser.sleep(1000);
    botonlogin.click();
    //browser.sleep(1000);
    var value = browser.executeScript("return window.localStorage.getItem('token');");
    //console.log("justo antes de centro click");
    browser.actions()
      .mouseMove(mapa, {x: 10, y: 10})
      .click()
      .perform();
    //console.log("justo despues de centro click");
    centro.click();
    var comentario = element(by.id('comentario'));
    var dentroComentario = element(by.id('añadircomentario'));
    //comentario.sendKeys('penultimocomentario');
    //dentroComentario.click();
    comentario.sendKeys('comentarioPrueba');
    dentroComentario.click();
    //browser.sleep(1000);
    var darLike = element(by.id('comentarioPrueba'));
    var cuantosLikes = element(by.id('likescomentarioPrueba'))
    //console.log(cuantosLikes);
    darLike.click();
    var numerolikesAhora = element(by.id('likescomentarioPrueba'));
    expect(numerolikesAhora.getText()).toEqual("1");  		
	});




    //quitarLike inicia sesion va a un barrio, quita el like que le ha dado antes y comprueba que se ha dado
    it('quitarLike', function() {
    	console.log("5- quitar Like a comentario");
	    mail.sendKeys('pedraza@gmail.com');
	    contra.sendKeys('pedraza');
	    //browser.sleep(1000);
	    botonlogin.click();
	    //browser.sleep(1000);
	    var value = browser.executeScript("return window.localStorage.getItem('token');");
	    //console.log("justo antes de centro click");
	    browser.actions()
	      .mouseMove(mapa, {x: 10, y: 10})
	      .click()
	      .perform();
	    //console.log("justo despues de centro click");
	    centro.click();

	    //browser.sleep(1000);
	    var quitarLike = element(by.id('comentarioPrueba'));
	    var cuantosLikes = element(by.id('likescomentarioPrueba'));	
	    //console.log(cuantosLikes);
	   	quitarLike.click();
	    var numerolikesAhora = element(by.id('likescomentarioPrueba'));
	    expect(numerolikesAhora.getText()).toEqual("0");  		
	   	
  	});


  	it('valorarBarrio', function() {
  		console.log("6- valorar barrio");
	    mail.sendKeys('pedraza@gmail.com');
	    contra.sendKeys('pedraza');
	    //browser.sleep(1000);
	    botonlogin.click();
	    //browser.sleep(1000);
	    var value = browser.executeScript("return window.localStorage.getItem('token');");
	    //console.log("justo antes de centro click");
	    browser.actions()
	      .mouseMove(mapa, {x: 10, y: 10})
	      .click()
	      .perform();
	    //console.log("justo despues de centro click");
	    centro.click();
		var dosEstrellas = element(by.id('3'));
		dosEstrellas.click();
		var ultimaValoracion = element(by.id('ultimaValoracion'));
	    expect(ultimaValoracion.getText()).toEqual("Tu última valoración fue de 3 estrellas");
  	});


  	it('ordenarPorLikes', function() {
  		console.log("7- ordenar los comentarios por likes");
	    mail.sendKeys('pedraza@gmail.com');
	    contra.sendKeys('pedraza');
	    //browser.sleep(1000);
	    botonlogin.click();
	    //browser.sleep(1000);
	    var value = browser.executeScript("return window.localStorage.getItem('token');");
	    //console.log("justo antes de centro click");
	    browser.actions()
	      .mouseMove(mapa, {x: 10, y: 10})
	      .click()
	      .perform();
	    //console.log("justo despues de centro click");
	    centro.click();
		
		var comentario = element(by.id('comentario'));
	    var dentroComentario = element(by.id('añadircomentario'));
	    //comentario.sendKeys('penultimocomentario');
	    //dentroComentario.click();
	    comentario.sendKeys('comentarioPrueba');
	    dentroComentario.click();

	    comentario.sendKeys('comentarioPrueba2');
	    dentroComentario.click();

	    var darLike = element(by.id('comentarioPrueba'));
		darLike.click();

		var ordenarPor = element(by.id('ordenarPor'));
		ordenarPor.click();
		var ordenarPorLikes = element(by.id('ordenarPorLikes'));
		ordenarPorLikes.click();

		var comentariosPorOrden = element(by.css('.textoComentario'));
		//browser.sleep(5000);
		//console.log(comentariosPorOrden);
		expect(comentariosPorOrden.getText()).toEqual('comentarioPrueba');

  	});
	

	//1 de cada dos veces da un error
	it('cerrarSesion', function() {
		console.log("8- cerrar sesion");
		browser.manage().window().setSize(1600, 1000);
	    mail.sendKeys('pedraza@gmail.com');
	    contra.sendKeys('pedraza');
	    //browser.sleep(1000);
	    botonlogin.click();
	    //browser.sleep(1000);
	    //console.log("justo antes de centro click");
	    var descubrirSidenav = element(by.id('descubrirSidenav'));
		descubrirSidenav.click();

		var perfil = element(by.id('Perfil'));
		perfil.click();
		var cerrarSesion = element(by.id('logout'));
	    browser.actions().mouseMove(cerrarSesion).click();
		cerrarSesion.click();
		browser.sleep(1000);
		var value = browser.executeScript("return window.localStorage.getItem('token');");
	    //console.log("devorao2 " + value);
	    expect(value).toBe(null);
		//no deja de cargar todo el rato
  	});

	
  	it('mirarRankings', function() {
  		console.log("9- cargar los Rankings");
	    mail.sendKeys('pedraza@gmail.com');
	    contra.sendKeys('pedraza');
	    //browser.sleep(1000);
	    botonlogin.click();
	    //browser.sleep(1000);
	    var descubrirSidenav = element(by.id('descubrirSidenav'));
		descubrirSidenav.click();

		var Ranking = element(by.id('Ranking'));
		Ranking.click();
		//browser.sleep(5000);
		//no deja de cargar todo el rato
  	});

  	it('mirarFAQ', function() {
  		console.log("10- cargar la página faq");
	    mail.sendKeys('pedraza@gmail.com');
	    contra.sendKeys('pedraza');
	    //browser.sleep(1000);
	    botonlogin.click();
	    //browser.sleep(1000);
	    var descubrirSidenav = element(by.id('descubrirSidenav'));
		descubrirSidenav.click();

		var faq = element(by.id('FAQ'));
		faq.click();
		browser.sleep(5000);
		//no deja de cargar todo el rato
  	});
});	