// Sin este constructor no añade prenda nueva
class Prenda {
    constructor(id, name, size, colour, price, image, quantity) {
       this.id=id,this.name=name,this.size=size,this.colour=colour,this.price=price,this.image=image,this.quantity=quantity;
    }
}
const contenedor = document.querySelector(".container")
const URL = "../json/products.json"
let Clothes = JSON.parse(localStorage.getItem("Clothes")) || [];

const cargarContenido  = async ()=> {
    Clothes = []
    try {
        const response = await fetch (URL)
        const data = await response.json()
        Clothes.push(...data);
        loadClothes(Clothes);

    } 
    catch (error) {
        console.log(error)
        alert("no se pueden cargar los datos")
    }
    finally {
        localStorage.setItem("Clothes", JSON.stringify(Clothes))
    }
}

document.addEventListener("DOMContentLoaded",cargarContenido);
//Constante de cada prenda
// const Clothes = [{id: 1, name: "remera", size: "XL", colour: "rojo", price: 500, image: "img/red-t-shirt.jpg" },
//                  {id: 2, name: "remera", size: "L", colour: "verde", price: 400, image: "img/green-t-shirt.jpg" },
//                  {id: 3, name: "camisa", size: "XL", colour: "celeste", price: 800, image: "img/blue-shirt.jpg" },
//                  {id: 4, name: "blusa", size: "S", colour: "rosado", price: 800, image: "img/pinkblouse.jpg" },
//                  {id: 5, name: "shorts", size: "XS", colour: "violeta", price: 1200, image: "img/purple-shorts.jpg" },
//                  {id: 6, name: "pantalon", size: "M", colour: "marron", price: 1500, image: "img/brown-trousers.jpg" },
//                  {id: 7, name: "campera", size: "XXL", colour: "negro", price: 3000, image: "img/black-jacket.jpg" },
//                  {id: 8, name: "tapado", size: "M", colour: "gris", price: 3500, image: "img/grey-coat.jpg" },
//                  {id: 9, name: "calza", size: "L", colour: "amarillo", price: 2000, image: "img/yellow-leggins.jpg" },
//                  {id: 10, name: "vestido", size: "S", colour: "rojo", price: 5000, image: "img/red-dress.jpg" },
//                  {id: 11, name: "saco", size: "M", colour: "azul", price: 3500, image: "img/blue-blazer.jpg"},
//                  {id: 12, name: "gorra", size: "-", colour: "negro", price: 500, image: "img/black-cup.jpg"},
//                  {id: 13, name: "pollera", size: "XXS", colour: "negro", price: 1500, image: "img/black-skirt.jpg"},
//                  {id: 14, name: "cartera", size: "-", colour: "rosa claro", price: 2500, image: "img/pink-bag.jpg"},
//                  {id: 15, name: "buzo corto", size: "L", colour: "rosa, blanco y negro", price: 1600, image: "img/crop-top.jpg"},
//                  {id: 16, name: "pantalon jean", size: "S", colour: "azul", price: 1800, image: "img/jeans.jpg"},
//                  {id: 17, name: "buzo", size: "XXL", colour: "turquesa", price: 1000, image: "img/buzo.jpg"},
//                  {id: 18, name: "vestido", size: "XL", colour: "azul con lunares", price: 1400, image: "img/blue-dress.jpg"},
//                  {id: 19, name: "monoprenda", size: "M", colour: "camel", price: 1700, image: "img/mono.jpg"},
//                  {id: 20, name: "pollera", size: "S", colour: "naranja", price: 1200, image: "img/orange-skirt.jpg"},]

//Carrito!!
let cart = JSON.parse(localStorage.getItem("cart")) || [];
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
             </div> `;
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
    if (inputFiltrar.value !== "") {
        const resultado = Clothes.filter(Clothes => Clothes.size.includes(inputFiltrar.value))
        if (resultado.length === 0) {
            swal("No hay prendas del talle que buscas 😞", "Pero puedes agregar productos que tengas para vender 😁");

            // alert("No hay prendas del talle que buscas")
            loadClothes(Clothes)
        } else {
            loadClothes(resultado)
        }
    } else {
        loadClothes(Clothes)
    }
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
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart(cart);
        })
    }
}


// AGREGAR PRENDA PARA VENDER- preguntas para agregar prenda

function agregarprenda() {

    let idnuevo = (Clothes.length + 1);
    let confimacion = confirm("¿Desea agregar una nueva prenda para vender?")
    if (confimacion){
        let nombrenuevaprenda = (prompt("ingrese una prenda nueva"));
                 
        let tallenuevo = (prompt("ingrese el talle en letras, ej: S, M, L"));
        let colornuevo = (prompt("ingrese el color de la prenda"));
        let precionuevo = Number(prompt("ingrese el precio"));
        let image = "img/non-available.jpg"
        let newprenda = new Prenda(idnuevo, nombrenuevaprenda, tallenuevo, colornuevo, precionuevo, image)
        console.log(newprenda)
        Clothes.push(newprenda)
        console.log(Clothes)
        }
    
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
        updateCart(cart)
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
//BOTON PAGAR EL TOTAL DE LA COMPRA
const botonpagar = document.querySelector("#btnpagar");
botonpagar.addEventListener("click", pagar);
function pagar() {
    const stotal = cart.reduce((acc, el) => acc + el.price * el.quantity, 0);
    console.log(stotal);
    swal({
        icon: 'success',
        title: "Gracias por su compra!",
        text: "Se debitaron" + " " +"$"+ stotal + " " + "de su cuenta",
        showConfirmButton: false,
        timer: 4000,
      });
}
