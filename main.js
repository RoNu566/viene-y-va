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

const Clothes = [
    {
        id: 1,
        name: "remera",
        size: "XL",
        colour: "rojo",
        price: "500",
        image: "red-t-shirt.jpg",
    },
    {
        id: 2,
        name: "remera",
        size: "L",
        colour: "verde",
        price: "400",
        image: "green-t-shirt.jpg",

    },
    {
        id: 3,
        name: "camisa",
        size: "XL",
        colour: "celeste",
        price: "800",
        image: "blue-shirt.jpg",

    },
    {
        id: 4,
        name: "blusa",
        size: "S",
        colour: "rosado",
        price: "800",
        image: "pinkblouse.jpg",

    },
    {
        id: 5,
        name: "shorts",
        size: "XS",
        colour: "violeta",
        price: "1200",
        image: "purple-shorts.jpg",

    },

]


//  let ingresar = (confirm("Busca tu talle"))
//  if (ingresar == true) {
//      let ingresar = (prompt("¿Que talle buscas?"))
//      let filtro = Clothes.filter(clothes => Clothes.size == ingresar)
//      console.table(filtro)

//  }



const cart = [];

const updateCart = (cart) => {
    let cartContainer = document.querySelector('#cart');

    let container = document.getElementById("cartContainer");
    if (container) {
        container.parentNode.removeChild(container);
    }
    let div = document.createElement('div');
    div.setAttribute('id', 'cartContainer');
    div.innerHTML += ` <h2>Carrito de compras</h2>`;
    for (const Clothes of cart) {
        div.innerHTML += `
<div class="cart-item">
                  <h4>Producto: ${Clothes.name}</h4>
                 <h4>Precio por unidad: ${Clothes.price}</h4>
                 <h4>Cantidad: ${Clothes.quantity}</h4>
             </div>

                      `;
    }

    cartContainer.appendChild(div);
}



const loadEvents = () => {
    let buttons = document.querySelectorAll('.button');
    for (const button of buttons) {
        button.addEventListener('click', () => {

            let found = cart.find(clothes => clothes.id == button.id);
            if (found) {

                found.quantity++;
            }
            else {
                let clothes = Clothes.find(element => element.id == button.id);
                if (clothes) {
                    let newClothes = {
                        id: clothes.id,
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

function agregarprenda() {
    let idnuevo = (Clothes.length + 1);
    let nombrenuevaprenda = (prompt("ingrese una prenda nueva"));
    let tallenuevo = (prompt("ingrese el talle en letras, ej: S, M, L"));
    let colornuevo = (prompt("ingrese el color de la prenda"));
    let precionuevo = Number(prompt("ingrese el precio"));
    let image = "non-available.jpg"
    let newprenda = new Prenda(idnuevo, nombrenuevaprenda, tallenuevo, colornuevo, precionuevo, image)
    console.log(newprenda)
    Clothes.push(newprenda)
    console.log(Clothes)

    loadClothes(Clothes)
}


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
            <button class="button" id="${clothes.id}">Agregar al carrito</button>
        `;
        container.appendChild(div);
    }

}
loadClothes(Clothes);

