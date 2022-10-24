// Sin este constructor no añade prenda nueva
class Prenda {
    constructor(id, name, size, colour, price, image, quantity) {
       this.id=id,this.name=name,this.size=size,this.colour=colour,this.price=price,this.image=image,this.quantity=quantity;
    }
}
const contenedor = document.querySelector(".container")
const URL = "../json/products.json"
let Clothes_iniciales = JSON.parse(localStorage.getItem("Clothes_iniciales")) || [];
let Clothes_agregadas = JSON.parse(localStorage.getItem("Clothes_agregadas")) || [];
let Clothes = [...Clothes_iniciales, ...Clothes_agregadas] || [];

const cargarContenido  = async ()=> {
    Clothes_iniciales = [];
    try {
        const response = await fetch (URL)
        const data = await response.json()
        Clothes_iniciales.push(...data);

    } 
    catch (error) {
        console.log(error)
        alert("no se pueden cargar los datos")
    }
    finally {
        localStorage.setItem("Clothes_iniciales", JSON.stringify(Clothes_iniciales));
        Clothes = [...Clothes_iniciales, ...Clothes_agregadas]
        loadClothes(Clothes)
    }
}

document.addEventListener("DOMContentLoaded",cargarContenido);

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

// FUNCION FILTRO POR TALLE
const inputFiltrar = document.querySelector("#filtroProducto")

function filtrarClothes() {
    inputFiltrar.value = inputFiltrar.value.trim().toUpperCase()
    if (inputFiltrar.value !==" ") {
        const resultado = Clothes.filter(Clothes => Clothes.size.includes(inputFiltrar.value))
        if (resultado.length == 0) {
            swal("No hay prendas del talle que buscas 😞", "Intenta en otro momento");

            loadClothes(Clothes)
        } else {
            loadClothes(resultado)
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

const botonagregar = document.querySelector("#agregarprenda");

botonagregar.addEventListener("click", (e) => {
    debugger
    swal({
        title: "¿Deseas agregar una prenda?",
        text: "Deberás ingresar con tu usuario para poder hacerlo!",
        icon: "info",
        buttons: true,
        dangerMode: true,
    })
    .then((isConfirm) => {
        if (isConfirm) {
            swal("😁 Que bueno!", "Ingresa con tu usuario para continuar", "success");
            agregarPrenda();
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        else {
            swal("😞 Que lastima!", "Sigue navegando nuestro sitio!", "error");
            e.preventDefault();
            }
        });
    });

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
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart(cart);
}

//------Cargar Productos ----//
const form_login_user = document.querySelector("#login_user");
const form_formuilario_addproduct = document.querySelector("#formuilario_addproduct");

function login(){
    const user_name = document.querySelector("#user_name").value;
    const user_password = document.querySelector("#user_pass").value;
    if (user_name == "user1" & user_password == "user1"){
        swal({
            icon: 'success',
            title: "Bienvenido " + user_name,
            text: "Ya podes agregar tus prendas 😁",
            button: "Ok!",
          });
          form_login_user.className ="ocultar"
          form_formuilario_addproduct.className = " ";

    }
    else{
        swal({
            title: "🤔 Algo anda mal!",
            text: "Has ingresado un Usuario o contraseña incorrecto",
            icon: "warning",
            button: "Intentalo de nuevo!",
          });
    }

};

// AGREGAR PRENDA PARA VENDER
function agregarPrenda() {
        form_login_user.className =" ";
      }


function cargarProd(){
    let idnuevo = (Clothes.length + 1);
    let nombrenuevaprenda = document.querySelector("#prenda").value;  
    let tallenuevo = document.querySelector("#talle").value;
    let colornuevo = document.querySelector("#color").value;
    let precionuevo = document.querySelector("#precio").value;
    let image = "img/non-available.jpg"
    
    let newprenda = new Prenda(idnuevo, nombrenuevaprenda, tallenuevo, colornuevo, precionuevo, image,1)
        console.log(newprenda)
        Clothes_agregadas.push(newprenda);
        console.table(Clothes);
        swal({
            icon: 'success',
            title: "Increible!!! 🙌",
            text: "Haz cargado el siguiente producto:" + " " + nombrenuevaprenda + " " + colornuevo,
            button: "Continuar",
          });
    

    localStorage.setItem("Clothes_agregadas", JSON.stringify(Clothes_agregadas));
    Clothes = [...Clothes_iniciales, ...Clothes_agregadas];
    loadClothes(Clothes);
}
