function maquina(contenedor,texto,intervalo){
    // Calculamos la longitud del texto
    longitud = texto.length;
    // Obtenemos referencia del div donde se va a alojar el texto.
    cnt = document.getElementById(contenedor);
    var i=0;
    // Creamos el timer
    timer = setInterval(function(){
       // Vamos añadiendo letra por letra y la _ al final.
       cnt.innerHTML = cnt.innerHTML.substr(0,cnt.innerHTML.length-1) + texto.charAt(i) + "_";
       // Si hemos llegado al final del texto..
       if(i >= longitud){
          // Salimos del Timer y quitamos la barra baja (_)
          clearInterval(timer);
          cnt.innerHTML = cnt.innerHTML.substr(0,longitud);
          return true;
       } else {
          // En caso contrario.. seguimos
          i++;
       }},intervalo);
 };
 
 var texto = "Hola amigos! Bienvenidos a este espacio donde voy a compartirles recetas espectaculares, promos, y todos los productos que pueden pedirme!";
 // 100 es el intervalo de minisegundos en el que se escribirá cada letra.
 maquina("maquinas",texto,75);


var Aplicacion = function (listado) {
    this.listado = listado;
    this.dibujarListado(listado.recetas)
    this.dibujarFiltros();
    this.registrarEventos();

}
//Esta función le asigna al botón "Buscar" la función filtrarRecetas()
Aplicacion.prototype.registrarEventos = function () {
    $(".buscar").click(this.filtrarRecetas.bind(this));
}

//Esta función llama a las funciones que se encargan de cargar las opciones de los filtros
Aplicacion.prototype.dibujarFiltros = function () {
    this.dibujarDificultad();
    this.dibujarRubros();
    this.dibujarTiposDeComida();

}

//Función que se encarga de dibujar todos las recetas que recibe por parámetro. Cuando hablamos de dibujar, nos referimos a crear
//los elementos HTML que permiten visualizar la receta.
Aplicacion.prototype.dibujarListado = function (recetas) {
    var self = this;
    //Se borra el contenedor de recetas
    $(".flex").empty();
    var elementos = [];
    console.log(recetas);
    //Si no se recibe ninguna receta por parámetro (porque los filtros aplicados no retornaron ningún resultado) se crea un elemento
    //que va a mostrar en el HTML el mensaje de "No se encontraron resultados".
    if (recetas.length === 0) {
        elementos.push($("<span/>").attr("class", "alerta").html("No se encontraron resultados"));
    } else {
        //Por cada receta, se ejecuta la función crearTarjetaDeReceta()
        recetas.forEach(function (receta) {
            elementos.push(self.crearTarjetaDeReceta(receta));
        });
    }

    //Se agrega cada elemento al contenedor de recetas.
    elementos.forEach(function (elemento) {
        elemento.appendTo(".flex");
    })
}

//Función que se encarga de crear todos los elementos HTML necesarios para poder visualizar una receta
Aplicacion.prototype.crearTarjetaDeReceta = function (receta) {
    var self = this;
    // Creamos el elemento de receta, asignandole cada atributo de la receta que corresponda
    var card = $(`
    <div class="flex-item" id=${receta.id}>
        <img class="imagen" src="${receta.imagen}">
        <div class="informacion">
            <div class="nombre-puntuacion-container">
                <h4 class="nombre-receta">${receta.nombre}</h4>
            </div>
            </div>
            <div class="descarga-container">
                <a class="descarga" href="${receta.descarga}" target =" _blank "><img class="img-desc" src="imgs/descarga-icon.png"</a>
            </div>
            <div class="informacion-container">
                <span><i class="fas fa-utensils"></i></span>
                <span class="tipo-comida">${receta.tipo}</span>
                <span class="rubro">${receta.rubro}</span>
            </div>
     
            <div class="ingredientes-container">
        
        </div>
    </div>
    `);

    

    //Buscamos el contendor donde se van a cargar los ingredientes
    var contenedorIngredientes = card.find(".ingredientes-container");

    //Por cada ingrediente de una receta, creamos el elemento HTML que va a mostrarlo. 
    receta.ingredientes.sort().forEach(function (ingrediente) {
        var nuevoIngrediente = $("<span/>").attr("class", "ingrediente-lista").html(ingrediente);
     
        nuevoIngrediente.appendTo(contenedorIngredientes);
    });
    return card;
}



//Esta función se encarga de generar las opciones del filtro de los tipos de comida.
Aplicacion.prototype.dibujarTiposDeComida = function () {
    $("#filtro-tipo-comida").empty();
    this.cargarOpcionDefault("filtro-tipo-comida", "Tipo de comida");
    this.cargarOpcionTodos("filtro-tipo-comida");

    this.listado.obtenerTiposDeComida().forEach(function (tipo) {
        var nuevaOpcion = $("<option/>").text(tipo).val(tipo);
        nuevaOpcion.appendTo("#filtro-tipo-comida");
    });
}

//Esta función se encarga de generar las opciones del filtro de rubros.
Aplicacion.prototype.dibujarRubros = function () {
    $("#filtro-para").empty();
    this.cargarOpcionDefault("filtro-para", "Para...");
    this.cargarOpcionTodos("filtro-para")

    this.listado.obtenerRubros().forEach(function (rubro) {
        var nuevaOpcion = $("<option/>").text(rubro).val(rubro);
        nuevaOpcion.appendTo("#filtro-para");
    });

}

//Esta función se encarga de generar las opciones del filtro de dificultades.
Aplicacion.prototype.dibujarDificultad = function () {
    $("#filtro-horario").empty();
    this.cargarOpcionDefault("filtro-horario", "Dificultad");
    this.cargarOpcionTodos("filtro-horario")

    this.listado.obtenerDificultades().forEach(function (dificultad) {
        var nuevaOpcion = $("<option/>").text(dificultad).val(dificultad);
        nuevaOpcion.appendTo("#filtro-horario");
    });
}

//Función que crea la opción default de los filtros
Aplicacion.prototype.cargarOpcionDefault = function (idFiltro, defecto) {
    var opcionDefault = $("<option/>").text(defecto).val(0).prop("disabled", true).prop("selected", true);
    opcionDefault.appendTo("#" + idFiltro);
}

//Función que crea la opción "Todos" de los filtros
Aplicacion.prototype.cargarOpcionTodos = function (idFiltro) {
    var opcionTodos = $("<option/>").text("Todos").val(1);
    opcionTodos.appendTo("#" + idFiltro);
}

//Función que se encarga de pedirle al listado que filtre las recetas y de actualizar el HTML con los resultados de la búsqueda.
//Las opciones "Default" y "Todos" de los filtros, tienen como propiedad val un 1 y un 0. En el caso de que el la propiedad val de alguno
//de los filtros sea 0 o 1, se envía como filtro el valor null, para que el listado sepa que no tiene que filtrar por ese campo.
Aplicacion.prototype.filtrarRecetas = function () {
    if ($("#filtro-para option:selected").val() === "1" || $("#filtro-para option:selected").val() === "0") {
        var filtroRubro = null;
    } else {
        var filtroRubro = $("#filtro-para option:selected").val();
    }

    if ($("#filtro-tipo-comida option:selected").val() === "1" || $("#filtro-tipo-comida option:selected").val() === "0") {
        var filtroTipo = null;
    } else {
        var filtroTipo = $("#filtro-tipo-comida option:selected").val();
    }

    if ($("#filtro-horario option:selected").val() === "1" || $("#filtro-horario option:selected").val() === "0") {
        var filtroDificultad = null;
    } else {
        var filtroDificultad = $("#filtro-horario option:selected").val();
    }
    console.log(filtroDificultad);
    console.log(filtroRubro);
    console.log(filtroTipo);
    var recetasFiltradas = this.listado.obtenerRecetas(filtroRubro, filtroTipo, filtroDificultad);
    console.log(recetasFiltradas, "RECETAS FILTRADAS");

    this.dibujarListado(recetasFiltradas);
}

var aplicacion = new Aplicacion(listado);

$(document).ready(function(){

    var header = $('header'),
                btn    = $('button.toggle-nav');

    btn.on('click', function(){
          header.toggleClass('active');
    });

});




  
