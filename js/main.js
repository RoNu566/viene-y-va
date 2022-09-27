
//Sin este constructor no añade prenda nueva
class Prenda {
    constructor(id, name, size, colour, price, image, quantity) {
        this.id = id
        this.name = name
        this.size = size
        this.colour = colour
        this.price = price
        this.image = image
        this.quantity = quantity
    }

}
//Constante de cada prenda
const Clothes = [
    {
        id: 1,
        name: "remera",
        size: "XL",
        colour: "rojo",
        price: 500,
        image: "img/red-t-shirt.jpg",
    },
    {
        id: 2,
        name: "remera",
        size: "L",
        colour: "verde",
        price: 400,
        image: "img/green-t-shirt.jpg",

    },
    {
        id: 3,
        name: "camisa",
        size: "XL",
        colour: "celeste",
        price: 800,
        image: "img/blue-shirt.jpg",

    },
    {
        id: 4,
        name: "blusa",
        size: "S",
        colour: "rosado",
        price: 800,
        image: "img/pinkblouse.jpg",

    },
    {
        id: 5,
        name: "shorts",
        size: "XS",
        colour: "violeta",
        price: 1200,
        image: "img/purple-shorts.jpg",

    },
    {
        id: 6,
        name: "pantalon",
        size: "M",
        colour: "marron",
        price: 2500,
        image: "img/brown-trousers.jpg",

    },
    {
        id: 7,
        name: "campera",
        size: "XXL",
        colour: "negra",
        price: 3000,
        image: "img/black-jacket.jpg",

    },
    {
        id: 8,
        name: "tapado",
        size: "M",
        colour: "gris",
        price: 3500,
        image: "img/grey-coat.jpg",

    },
    {
        id: 9,
        name: "Calza",
        size: "L",
        colour: "amarillo",
        price: 1500,
        image: "img/yellow-leggins.jpg",

    },
    {
        id: 10,
        name: "vestido",
        size: "S",
        colour: "rojo",
        price: 5000,
        image: "img/red-dress.jpg",

    },


]

//Carrito!!
let cart = [];

const updateCart = (cart) => {
    let cartContainer = document.querySelector('#cart');

    let container = document.getElementById("cartContainer");
    if (container) {
        container.parentNode.removeChild(container);
    }
    let div = document.createElement('div');
    div.setAttribute('id', 'cartContainer');
    div.innerHTML += ` <h2>Carrito de compras</h2>`;
    for (const clothes of cart) {
        div.innerHTML += `
<div class="cart-item">
                 <h4>Producto: ${clothes.name}</h4>
                 <h4>Precio por unidad: $${clothes.price}</h4>
                 <h4>Cantidad: ${clothes.quantity}</h4>
                 <button onclick = "eliminarDelCarrito(${clothes.id})" class="btnBorrar">❌</button>
             </div>

                      `;
    }

    cartContainer.appendChild(div);
}

const inputFiltrar = document.querySelector("#filtroProducto")

// FUNCION FILTRO POR TALLE
function filtrarClothes() {
    inputFiltrar.value = inputFiltrar.value.trim().toUpperCase()
    debugger
    if (inputFiltrar.value !== "") {
        const resultado = Clothes.filter(Clothes => Clothes.size.includes(inputFiltrar.value))
        if (resultado.length === 0) {
            alert("No hay prendas del talle que buscas")
            loadClothes(Clothes)
        } else {
            loadClothes(resultado)
        }
    } else {
        loadClothes(Clothes)
    }
}

inputFiltrar.addEventListener("input", filtrarClothes)

function eventoEnBotones() {
    Clothes.forEach(prod => {
        const btn = document.querySelector(`#btn${prod.id}`)
        btn.addEventListener("click", () => agregarAlCarrito(`${prod.id}`))
    })
}

// Tarjetas

const loadEvents = () => {
    let buttons = document.querySelectorAll('.button');
    for (const button of buttons) {
        button.addEventListener('click', () => {

            let found = cart.find(element => element.id == button.id);
            if (found) {

                found.quantity++;
            }
            else {
                let clothes = Clothes.find(element => element.id == button.id);
                if (clothes) {
                    let newClothes = {
                        id: clothes.id,
                        name: clothes.name,
                        size: clothes.size,
                        colour: clothes.colour,
                        price: clothes.price,
                        image: clothes.image,
                        quantity: 1
                    }
                    cart.push(newClothes);
                }
            }

            updateCart(cart);
        })
    }
}



// AGREGAR PRENDA PARA VENDER- preguntas para agregar prenda

function agregarprenda() {
    let idnuevo = (Clothes.length + 1);
    let nombrenuevaprenda = (prompt("ingrese una prenda nueva"));
    let tallenuevo = (prompt("ingrese el talle en letras, ej: S, M, L"));
    let colornuevo = (prompt("ingrese el color de la prenda"));
    let precionuevo = Number(prompt("ingrese el precio"));
    let image = "img/non-available.jpg"
    let newprenda = new Prenda(idnuevo, nombrenuevaprenda, tallenuevo, colornuevo, precionuevo, image)
    console.log(newprenda)
    Clothes.push(newprenda)
    console.log(Clothes)

    loadClothes(Clothes)
}


// CARDS DE LAS PRENDAS
const loadClothes = (Clothes) => {
    let container = document.querySelector('#container');
    container.innerHTML = ""
    for (const clothes of Clothes) {
        let div = document.createElement('div');
        div.setAttribute('class', 'card');
        div.innerHTML = `
            <img src="${clothes.image}" alt="${clothes.size}">
            <h3>${clothes.price}</h3>
            <h4>${clothes.colour}</h4>
            <h4>${clothes.size}</h4>
            <h4>${clothes.name}</h4>
            <button class="button" id="${clothes.id}">Agregar➕</button>
        
        `;
        container.appendChild(div);
    }
    loadEvents();
}


document.addEventListener("DOMContentLoaded", loadClothes(Clothes));

const botonagregar = document.querySelector("#agregarprenda");

botonagregar.addEventListener("click", () => {
    agregarprenda()
    localStorage.setItem("cart", JSON.stringify(cart))
})
function recuperarCarrito() {
         if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
    }
    recuperarCarrito()

    // eliminar del carrito de a una prenda

const eliminarDelCarrito = (clothesid) => {
    const item = cart.find((clothes) => clothes.id === clothesid)
    const indice = cart.indexOf(item)
    cart.splice(indice, 1)
    updateCart(cart)
    localStorage.setItem("cart", JSON.stringify(cart))
}

const botonpagar = document.querySelector("#btnpagar");
botonpagar.addEventListener("click", pagar);
function pagar(){
    const stotal = cart.reduce ((acc, el) => acc + el.price*el.quantity, 0);
    console.log(stotal);
    alert("Se debitaron" + " "+ stotal+" "+"de su cuenta")
}