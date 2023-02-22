const socket = io();

//Add products inputs.
const prodContainer = document.getElementById('prodContainer')
const addForm = document.getElementById('addForm');
const inputName = document.getElementById('name');
const inputDescription = document.getElementById('description');
const inputPrice = document.getElementById('price');
const inputCategory = document.getElementById('category');
const inputCode = document.getElementById('code');
const inputStock = document.getElementById('stock');

//Delete products inputs.
const delForm = document.getElementById('delForm');
const inputId = document.getElementById('productId');

delForm.onsubmit = (e)=> {
    e.preventDefault();
    const productId = inputId.value
    socket.emit('deleteProd', productId)
}

addForm.onsubmit = (e)=> {
    e.preventDefault();
    const title = inputName.value;
    const description = inputDescription.value;
    const category = inputCategory.value;
    const price = inputPrice.value;
    const code = inputCode.value;
    const stock = inputStock.value
    socket.emit('newProd', {title, description, category, price, code, stock})
}

socket.on('addedProducts', (newProds)=> {
    let products = "";
    newProds.forEach((p)=> {
        products += `
        <h2>${p.title}</h2>
        <h3>${p.description}</h3>
        <h4>$${p.price}</h4>`
    })
    prodContainer.innerHTML = products;
})

socket.on('delProducts', (newProds)=> {
    let products = "";
    newProds.forEach((p)=> {
        products += `
        <h2>${p.title}</h2>
        <h3>${p.description}</h3>
        <h4>$${p.price}</h4>`
    })
    console.log(products);
    prodContainer.innerHTML = products;
})