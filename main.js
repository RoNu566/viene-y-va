class Prenda {
    constructor(id,name, size, colour, price, image) {
        this.id = id
        this.name = name
        this.size = size
        this.colour = colour
        this.price = price
        this.image = image
    }

    }

const Clothes = []

let Prenda1 = new Prenda(1,"remera", "XL", "rojo", 500, "red-t-shirt.jpg")
let Prenda2 = new Prenda(2,"remera", "M", "verde", 450, "green-t-shirt.jpg")
let Prenda3 = new Prenda(3,"camisa", "S", "azul", 550, "blue-shirt.jpg")
let Prenda4 = new Prenda(4,"blusa", "XS", "rosado", 600, "pinkblouse.jpg")
let Prenda5 = new Prenda(5,"shorts", "M", "violeta", 1200, "purple-shorts.jpg")

Clothes.push(Prenda1,Prenda2,Prenda3,Prenda4,Prenda5)

console.table(Clothes)


// let ingresar = (confirm("Busca tu talle"))
//  if (ingresar == true) {
//      let ingresar = (prompt("¿Que talle buscas?"))
//     let filtro = Clothes.filter(clothes => Clothes.size == ingresar)
//     console.table(filtro)

//  }

function agregarprenda() {
    let idnuevo = (Clothes.length +1);
    let nombrenuevaprenda = (prompt("ingrese una prenda nueva"));
    let tallenuevo = (prompt("ingrese el talle en letras, ej: S, M, L"));
    let colornuevo = (prompt("ingrese el color de la prenda"));
    let precionuevo = Number(prompt("ingrese el precio"));
    let image = "non-available.jpg"
    let newprenda = new Prenda( idnuevo,nombrenuevaprenda, tallenuevo, colornuevo, precionuevo, image)
    console.log(newprenda)
    Clothes.push(newprenda)
    console.log(Clothes)

    loadClothes(Clothes)
}


const loadClothes = (Clothes) => {
    let container = document.querySelector('#container');
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
