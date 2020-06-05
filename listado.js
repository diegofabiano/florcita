var Listado = function (recetas) {
    this.recetas = recetas;
}

//Dado un id, busca el objeto del listado que tiene ese id
Listado.prototype.buscarReceta = function (id) {
    // for (var i = 0; i < this.recetas.length; i++) {
    //     if (this.recetas[i].id === id) {
    //         return this.recetas[i]
    //     }
    // }
    let recetaEncontrada = this.recetas.find(receta => receta.id === id);

    if (recetaEncontrada) {
        return recetaEncontrada;
    }

    return "No se ha encontrado ningún restaurant";
}

//Obtiene todas los tipos de recetas sin repetidos
Listado.prototype.obtenerTiposDeComida = function () {
    //Array donde se van a ir agregando los tipos (van a estar repetidas)
    // var ubicaciones = [];
    // //Se recorre el array de recetas y se va agregando al array creado, todas los tipos encontrados
    // for (var i = 0; i < this.recetas.length; i++) {
    //    tipo.push(this.recetas[i].tipo);
    // }
    let tipo = this.recetas.map(receta => receta.tipo);

    //Se crea un nuevo array donde se van a agregar los tipos pero sin repetirse
    let tiposSinRepetir = soloUnicosEnArray(tipo);

    return tiposSinRepetir.sort();
}

//Obtiene todos los rubros de los restaurantes sin repetidos. Su funcionamiento es similar a obtenerCiudades()
Listado.prototype.obtenerRubros = function () {
    // var rubros = [];
    // for (var i = 0; i < this.restaurantes.length; i++) {
    //     rubros.push(this.restaurantes[i].rubro);
    // }
    let rubros = this.recetas.map(receta => receta.rubro);

    let rubrosSinRepetir = soloUnicosEnArray(rubros);

    return rubrosSinRepetir.sort();
}

//Obtiene todos las dificultades de las recetas sin repetidos. Su funcionamiento es similar a obtenerRubros()
Listado.prototype.obtenerDificultades = function () {
    // var rubros = [];
    // for (var i = 0; i < this.restaurantes.length; i++) {
    //     rubros.push(this.restaurantes[i].rubro);
    // }
    let dificultad = this.recetas.map(receta => receta.dificultad);

    let DificultadSinRepetir = soloUnicosEnArray(dificultad);

    return DificultadSinRepetir.sort();
}

//Función que recibe los filtros que llegan desde el HTML y filtra el arreglo de recetas.
//Solo se filtra si el valor recibido es distinto de null.
Listado.prototype.obtenerRecetas = function (filtroRubro, filtroTipo, filtroDificultad) {
    var recetasFiltradas = this.recetas;
    if (filtroRubro !== null) {
        recetasFiltradas = recetasFiltradas.filter(receta => receta.rubro == filtroRubro);
    }

    if (filtroTipo !== null) {
        recetasFiltradas = recetasFiltradas.filter(receta => receta.tipo == filtroTipo);
    }

    if (filtroDificultad !== null) {
        recetasFiltradas = recetasFiltradas.filter(receta => receta.dificultad == filtroDificultad);
    }
    return recetasFiltradas;
}

//Se crea el listado de recetas de la aplicación. Si queres agregar una receta nueva, podes agregarla desde aca, siempre
//verificando que no se repita el id que agregues.

var listadoDeRecetas = [
    new Receta(1, "Lemon Pie", "Dificil", "Postre", "Dulce", ["Limón", "Harina", "Huevos", "Azúcar"], "recetas/lemon-pie.jpg", "recetas/lemon-pie.pdf"),
    new Receta(2, "Medialunas de manteca", "Media", "Desayuno/Merienda", "Dulce", ["Manteca", "Harina", "Leche", "Azúcar", "Levadura"], "recetas/medialunas.jpg", "recetas/medialunas.pdf"),
    new Receta(3, "Alfajores de Maicena", "Fácil", "Desayuno/Merienda", "Dulce", ["Maicena", "D. de Leche", "Huevos", "Manteca"], "recetas/alfas-maicena.jpeg", "recetas/alfas-maicena.pdf"),
    new Receta(4, "Crema pastelera", "Media", "Postre", "Dulce", ["Leche", "Huevos", "Azúcar"], "recetas/crema-pastelera.jpeg", "recetas/lemon-pie.pdf"),
    new Receta(5, "Budín de naranja", "Media", "Desayuno/Merienda", "Dulce", ["Harina", "Azúcar", "Naranjas", "Huevos"], "recetas/budin-naranja.jpeg", "recetas/budin-naranja.pdf"),
    new Receta(6, "Galletitas de Limón", "Fácil", "Postre", "Dulce", ["Harina", "Jugo de Limón", "Chocolate"], "recetas/galletitas-limon.jpg", "recetas/galletitas-limon.pdf"),
    new Receta(7, "Flan", "Media", "Postre", "Dulce", ["Huevos", "Azúcar", "Leche"], "recetas/flan.jpeg", "recetas/flan.pdf"),
    new Receta(8, "Mouse de chocolate", "Media", "Postre", "Dulce", ["Chocolate", "Crema"], "recetas/mouse.jpeg", "recetas/mouse.pdf"),
    new Receta(9, "Carrot Cake", "Media", "Desayuno/Merienda", "Dulce", ["Zanahoria", "Harina Int", "Leche"], "recetas/budin-zanahoria.jpg", "recetas/budin-zanahoria.pdf"),
    new Receta(10, "Coquitos", "Fácil", "Postre", "Dulce", ["Coco rayado", "Huevos", "Azúcar"], "recetas/cocos.jpeg", "recetas/cocos.pdf"),
    new Receta(11, "Bizcochuelo", "Media", "Desayuno/Merienda", "Dulce", ["Azúcar", "Harina", "Leche", "Huevos"], "recetas/biscochuelo.jpeg", "recetas/biscochuelo.pdf"),
    new Receta(12, "Chipa de queso", "Fácil", "Desayuno/Merienda", "Salado", ["Quesos", "Huevos", "Manteca", "Leche"], "recetas/chipa.jpeg", "recetas/chipa.pdf"),
    new Receta(13, "Tarta de acelga", "Media", "Almuerzo/Cena", "Salado", ["Acelga", "Harina", "Queso cremoso"], "recetas/tarta-verduras.jpg", "recetas/tarta-verduras.pdf"),
    new Receta(14, "Arrollado de queso", "Fácil", "Almuerzo/Cena", "Salado", ["Espinaca", "Morrón", "Cebolla", "Queso"], "recetas/arrollado-verdura.jpeg", "recetas/arrollado-verdura.pdf"),
    new Receta(15, "Masa para pastas", "Media", "Almuerzo/Cena", "Salado", ["Harina", "Agua", "Sal"], "recetas/masa.jpg", "recetas/masa.pdf"),
    new Receta(16, "Risotto de verduras", "Dificil", "Almuerzo/Cena", "Salado", ["Vegetales", "Arroz", "Caldo"], "recetas/risotto.jpeg", "recetas/risotto.pdf"),
    new Receta(17, "Pan relleno", "Media", "Almuerzo/Cena", "Salado", ["Harina", "Jamón", "Queso"], "recetas/pan-relleno.jpeg", "recetas/pan-relleno.pdf"),
    new Receta(18, "Bondiola breseada", "Dificil", "Almuerzo/Cena", "Salado", ["Bondiola", "Cerveza", "Caldo"], "recetas/bondiola.jpeg", "recetas/bondiola.pdf"),
    new Receta(19, "Panes saborizados", "Media", "Desayuno/Merienda", "Salado", ["Harina", "Levadura", "agua"], "recetas/pan-saborizado.jpeg", "recetas/pan-saborizado.pdf"),
    new Receta(20, "Tarta Ratatouille", "Media", "Almuerzo/Cena", "Salado", ["Zuccinis", "Berenjenas", "Tomates", "Queso"], "recetas/tarta-rata.jpeg", "recetas/tarta-rata.pdf"),
    new Receta(21, "Fatay", "Media", "Almuerzo/Cena", "Salado", ["Carne", "Limón", "Harina"], "recetas/fatay.jpeg", "recetas/fatay.pdf"),
    new Receta(22, "Mac & cheese", "Fácil", "Almuerzo/Cena", "Salado", ["Fideos", "Quesos", "Crema"], "recetas/m&c.jpeg", "recetas/m&c.pdf"),
    new Receta(23, "Libritos de grasa", "Dificil", "Desayuno/Merienda", "Salado", ["Harina", "Levadura", "Grasa"], "recetas/libritos-grasa.jpg", "recetas/libritos-grasa.pdf"),
    new Receta(24, "Ensalada tabule", "Media", "Almuerzo/Cena", "Salado", ["Trigo burgol", "Perejil", "Limón", "Tomate"], "recetas/ensalada.jpeg", "recetas/ensalada.pdf"),
];

//Se crea un nuevo listado, asignandole el listado de recetas creado anteriormente.
var listado = new Listado(listadoDeRecetas)

function soloUnicosEnArray(array) {
    let unicos = array.filter((elem, index, self) => index === self.indexOf(elem));
    return unicos;
};