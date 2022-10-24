//array con la totalidad de los productos de la página
const productos =[];

//array en donde se van guardando los productos cuando uno clickea "comprar" en un producto
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//trae elemento que es reutilizado para el boton de compra fial.
let compraFinal = document.getElementById('btncomprafinal');

let carritoDeCompras = document.getElementById("carritoDeCompras");

//constructor para crear productos
class Product {
    constructor (imagen, nombre, categoria, precio, id, cantidad) {
    this.imagen = imagen;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.id = id;
    this.cantidad = cantidad;
    }
}

//creación del botón de compra.
function crearBotonComprar(producto) {
    const button = document.createElement("button");
    button.innerText = "Comprar";
    button.classList.add("btn", "btn-danger", "btn-comprar");
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
        Swal.fire ({
            title: 'El producto se agregó al carrito',
            icon: 'success',
            showConfirmButton: false,
            timer: '1000'

        })
    })
    return button;
}


//función que se reutiliza en la creación del botón (el evento del botón emplea esta función)
function agregarAlCarrito(producto) { 
    let acum = carrito.some(productoAcum => producto.id === productoAcum.id);
    if(acum === false) {
        producto.cantidad = 1;
        carrito.push(producto);
        botonCompraFinal();
    } else {
        let productoFind = carrito.find(prod => prod.id === producto.id);
        productoFind.cantidad++;
    }
    actualizarCarrito();
}


//función para crear los productos en el html productos
function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML= "";
    fetch("../JSON/productos.json")
    .then(res => res.json())
    .then(productos => {
        productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('card');
        divProducto.setAttribute("style", "width:18rem;");
        divProducto.innerHTML = `
        <img src="${producto.imagen}" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">$ ${producto.precio}</p>
        </div>`;
        const botonComprar = crearBotonComprar(producto);
        divProducto.appendChild(botonComprar);
        contenedorProductos.appendChild(divProducto);
        
        })
    })    
}

//activación de la función que crea los productos y un log para demostrar que efectivamente se cargan en el array "carrito"
mostrarProductos(productos);
console.log(carrito);


//función que permite mostrar los productos que se van alojando en el carrito (se va actualizando)
function actualizarCarrito() {
    carritoDeCompras.innerHTML = "";
    if (carrito == undefined) {
        carrito = [];
    }
    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = 
        `<p class="título">Producto: ${producto.nombre} | Precio: $ ${producto.precio * producto.cantidad} | Cantidad: ${producto.cantidad} | <button class="btn btn-danger btn-sm" id= "botonAumentar${producto.id}">+</button> <button class="btn btn-danger" id= "botonBorrar${producto.id}">Borrar</button> <button class="btn btn-danger btn-sm" id= "botonDisminuir${producto.id}">-</button></p>
        <div class="linea"></div>`;
        carritoDeCompras.appendChild(div)
    })

    //manda el carrito al localstorage.
    localStorage.setItem("carrito", JSON.stringify(carrito));

    //funciones que llaman a los botones del carrito.
    disminuirProducto();
    aumentarProducto();
    borrarProducto();
    mensajePredeterminado();
}


//función para crear un boton que permita finalizar la compra.
function botonCompraFinal() {
    if (carrito.length == 1) {
    compraFinal = document.getElementById('btnCompraFinal');
    const button = document.createElement("button");
    button.innerText = "Comprar";
    button.classList.add("btn", "btn-dark", "btn-outline-danger", "btn-comprafinal");
    button.addEventListener("click", () => {
        carrito = localStorage.clear();
        actualizarCarrito();
        compraFinal.innerHTML = "";
        Swal.fire ({
            title: 'Compra finalizada con éxito.',
            icon: 'success',
            showConfirmButton: false,
            timer: '1000'
        })
    })
    compraFinal.append(button);
    }    
}


//funciones para los botones del carrito.
function borrarProducto() {
    carrito.forEach(producto => {
        document.querySelector(`#botonBorrar${producto.id}`).addEventListener("click", () =>{
            let indice = carrito.findIndex(prod => prod.id === producto.id);
            Swal.fire({
                title: '¿Estás seguro que deseas eliminar este producto del carrito?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result.isConfirmed) {
                carrito.splice(indice, 1);
                actualizarCarrito();
                if (carrito.length == 0) {
                    compraFinal.innerHTML = "";
                    }
                  Swal.fire(
                    'Eliminado!',
                    'Tu producto fue eliminado del carrito.',
                    'success'
                  )
                }
              })
            
        })
    })
}


function disminuirProducto() {
    carrito.forEach(producto => {
        document.querySelector(`#botonDisminuir${producto.id}`).addEventListener("click", () =>{
            let productoFind = carrito.find(prod => prod.id === producto.id);
            if(producto.cantidad > 1) {
                productoFind.cantidad--;
                actualizarCarrito();
            }
        })
    })
}

function aumentarProducto() {
    carrito.forEach(producto => {
        document.querySelector(`#botonAumentar${producto.id}`).addEventListener("click", () =>{
            let productoFind = carrito.find(prod => prod.id === producto.id);
            productoFind.cantidad++;
            actualizarCarrito();
        })
    })
}

//función para reutilizar mensaje predeterminado del carrito de compras.
function mensajePredeterminado() {
    if (carrito.length == 0) {
        carritoDeCompras.innerHTML = `<p class="título">Aún no se han agregado productos al carrito</p>`
    }
}

//actualizo el carrito para que muestre lo almacenado en el localstorage al entrar a la página.
actualizarCarrito();

//condicional para que al hacer un refresh en la página, siga estando el botón para comprar.
if (carrito.length >= 1) {
    botonCompraFinal();
}

//muesstra mensaje predeterminado en la sección carrito.
mensajePredeterminado();

