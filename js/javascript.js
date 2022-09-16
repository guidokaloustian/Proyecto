// let request;
// const carrito = [];

// class Product {
//     constructor (nombre, categoria, precio, id, stock) {
//     this.nombre = nombre;
//     this.categoria = categoria;
//     this.precio = precio;
//     this.id = id;
//     this.id = stock;
//     }

//     sumarIva = ()=> {
//         return this.precio = this.precio * 1.21;
//     }
// }

// const producto1 = new Product('Parrilla Gaucha', "Parrilla", 90000, 1, true);
// const producto2 = new Product('Horno encastrado doble parrilla', "Horno", 100000, 2, true);
// const producto3 = new Product('Fogonero + estaca + olla de fundición', "Fogonero", 130000, 3, true);
// const producto4 = new Product('Calefacción 9.500 kcal', "Calefactor", 50000, 4, true);
// const producto5 = new Product('Destapacorchos de pared', "Accesorios", 3500, 5, true);

// do {
//     request = Number(prompt("¿Qué desea hacer? \nSeleccione la opción:\n 1- Agregar un producto \n 2- Ver productos en el carrito \n 3- Salir"));
//     switch (request) {
//         case 1:   
//         addProducts();
//             break;
//         case 2:
//             showCarrito();
//             break;
//         case 3:
//             alert("Gracias. Vuelva pronto.");
//             break;
//         default:
//             alert("Elija una opción válida");
//             break;
//     }
// }   while (request !== 3);

// function addProducts() {
//     let option = Number(prompt(`Ingrese el número de producto que desea agregar al carrito 
//         1. ${producto1.nombre}: $${producto1.precio}
//         2. ${producto2.nombre}: $${producto2.precio} 
//         3. ${producto3.nombre}: $${producto3.precio}
//         4. ${producto4.nombre}: $${producto4.precio} 
//         5. ${producto5.nombre}: $${producto5.precio}`));
//     switch (option) {
//         case 1:
//             carrito.push(producto1);
//             break;
//         case 2:
//             carrito.push(producto2);
//             break;
//         case 3:
//             carrito.push(producto3);
//             break;
//         case 4:
//             carrito.push(producto4);
//             break;
//         case 5:
//             carrito.push(producto5);
//             break;
//         default:
//             alert("Ingrese una opcion correcta")
//             break;
//     }
    
// }

// function showCarrito() {
//     carrito.forEach((producto) => console.log(producto.nombre + " $" + producto.precio));
//     const costoTotal = carrito.reduce((acc, el) => acc + el.precio, 0);   
//     console.log(`El costo total es de $${costoTotal}`);
// }
