//array con la totalidad de los productos de la página
const productos =[];

//array en donde se van guardando los productos cuando uno clickea "comprar" en un producto
let carrito = [];

//constructorpara crear productos

class Product {
    constructor (imagen, nombre, categoria, precio, id, stock) {
    this.imagen = imagen;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.id = id;
    this.id = stock;
    }
}

//creación de productos en productos.html

const producto1 = new Product("../images/ASADORES/116046034_982175968921836_1571557682438449073_n.jpg" ,'Parrilla Anafe + Plancheta', "Parrilla", 45000, 1, true);
const producto2 = new Product("../images/ASADORES/140756130_3886741338025723_6649038584060871508_n.jpg",'Parrilla Gaucha', "Parrilla", 90000, 2, true);
const producto3 = new Product("../images/ASADORES/142600211_113660744009407_5556108573160894008_n.jpg", 'Fogonero oval Tromen', "Parrilla", 50000, 3, true);
const producto4 = new Product("../images/ASADORES/116890875_1715637125257194_1084822260713899543_n.jpg", 'Chulengo con fogonero', "Parrilla", 70000, 4, true);
const producto5 = new Product("../images/ASADORES/97291465_298159924677751_346373515123189563_n.jpg", 'Estaca', "Parrilla", 27000, 5, true);
const producto6 = new Product("../images/HORNOS/97909009_3320645517946037_1358515264965856215_n.jpg", 'Horno para doble plancha', "Horno", 120000, 6, true);
const producto7 = new Product("../images/HORNOS/97281413_572159013504728_8682794338570512983_n.jpg",'Horno para una plancha', "Horno", 100000, 7, true);
const producto8 = new Product("../images/FOGONEROS/140763227_113902270550874_5912814058286206832_n.jpg", 'Fogonero + estaca + olla de fundición', "Fogonero", 130000, 8, true);
const producto9 = new Product("../images/FOGONEROS/139931886_167524351796613_2994888001206301935_n.jpg", 'Fogonero + estaca + olla de fundición (con ruedas)', "Fogonero", 180000, 9, true);
const producto10 = new Product("../images/FOGONEROS/119370203_158004945962565_5041745894770272061_n.jpg",'Fogonero + estaca', "Fogonero", 90000, 10, true);
const producto11 = new Product("../images/FOGONEROS/119174496_330722218259376_7841848234423859971_n.jpg", 'Fogonero + estaca (cilindro)', "Calefacción", 70000, 11, true);
const producto12 = new Product("../images/CALEFACCIÓN/97279239_638829013375024_3057918860343200477_n.jpg", 'Calefacción 9.500 kcal', "Calefacción", 80000, 12, true);
const producto13 = new Product("../images/CALEFACCIÓN/97317306_634790557073683_889240123842664369_n.jpg", 'Calefacción 13.000 kcal', "Calefacción", 100000, 13, true);
const producto14 = new Product("../images/CALEFACCIÓN/97359153_238031987296316_384965395224210694_n.jpg", 'Calefacción hasta 25.000 kcal', "Calefacción", 130000, 14, true);
const producto15 = new Product("../images/CALEFACCIÓN/98132827_2905244676236029_523896004174099494_n.jpg", 'Calefacción 20.000 kcal', "Calefacción", 115000, 15, true);
const producto16 = new Product("../images/CALEFACCIÓN/98256178_247493976475047_1879116458340984041_n.jpg", 'Calefacción 8.000 kcal', "Calefacción", 55000, 16, true);
const producto17 = new Product("../images/ACCESORIOS/104216653_101053421634447_6708615663298082633_n.jpg", 'Destapacorchos de pared', "Accesorios", 3500, 17, true);
const producto18 = new Product("../images/ACCESORIOS/142627510_885929961948178_457163731430816692_n.jpg", 'Parrilla con pinchos', "Accesorios", 22600, 18, true);
const producto19 = new Product("../images/ACCESORIOS/82772333_2649121735365933_920639196554220246_n.jpg", 'Tablas', "Accesorios", 9300, 19, true);
const producto20 = new Product("../images/ACCESORIOS/97199651_673485583222449_6797346846089783825_n.jpg", 'Planchitas + pocillos', "Accesorios", 10000, 20, true);
const producto21 = new Product("../images/ACCESORIOS/97244198_283553573037001_911733662895511298_n.jpg", 'Cocina cohete', "Accesorios", 9500, 21, true);
const producto22 = new Product("../images/ACCESORIOS/97376342_241852600244503_5645329381360841669_n.jpg", 'Anafe eléctrico', "Accesorios", 9950, 22, true);
const producto23 = new Product("../images/ACCESORIOS/97522129_2720100364943526_4404785555803235711_n.jpg", 'Estaca Aluminio', "Accesorios", 30000, 23, true);
const producto24 = new Product("../images/ACCESORIOS/97943775_242912500314915_3510943994901043155_n.jpg", 'Disco de arado', "Accesorios", 60000, 24, true);

productos.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7,
    producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15,
    producto16, producto17, producto18, producto19, producto20, producto21, producto22, producto23,
    producto24);


//creación de botón para agregar productos al array "carrito"
function crearBotonComprar(producto) {
    const button = document.createElement("button");
    button.innerText = "Comprar";
    button.classList.add("btn", "btn-primary");
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })
    return button;
}


//función que se reutiliza en la creación del botón (el evento del botón emplea esta función)
function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
}


//función para crear los productos en el html productos
function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML= "";
    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('card');
        divProducto.setAttribute("style", "width:18rem;");
        divProducto.innerHTML = `
        <img src="${producto.imagen}" alt="...">
        <div class="card-body" "col-sm-12" "col-md-6" "col-xl-4">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$ ${producto.precio}</p>
        </div>`;
        const botonComprar = crearBotonComprar(producto);
        divProducto.appendChild(botonComprar);
        contenedorProductos.appendChild(divProducto);
        
    })
}

// function costoTotal(precio) {
//     let total;
//     total =+ precio;
//     return total; 
// }

//activación de la función que crea los productos y un log para demostrar que efectivamente se cargan en el array "carrito"
mostrarProductos(productos);
console.log(carrito);


//función que permite mostrar los productos que se van alojando en el carrito (se va actualizando)
function actualizarCarrito() {
    carritoDeCompras.innerHTML = "";
    carrito.forEach((producto) => {
        const carritoDeCompras = document.getElementById("carritoDeCompras");
        const div = document.createElement("div");
        div.innerHTML = `
        <p class="título">${producto.nombre}                          $ ${producto.precio}</p>
        <div class="linea"></div>`
    
        carritoDeCompras.appendChild(div)
    })
}





