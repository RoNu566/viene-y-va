class Prenda {
    constructor(tipo, talle, color, precio, disponibilidad) {
        this.tipo = tipo
        this.talle = talle
        this.color = color
        this.precio = precio
        this.disponibilidad = disponibilidad
    }
    FueraDeStock() {
        let error = "prenda no disponible"
        if (this.disponibilidad == true) {
            this.disponibilidad = false

        } else {
            console.log(error)
        }
    }
}

const tienda = []

let Prenda1 = new Prenda("remera", "XL", "rojo", 500, false)
let Prenda2 = new Prenda("remera", "M", "verde", 450, true)
let Prenda3 = new Prenda("camisa", "S", "azul", 550, false)
let Prenda4 = new Prenda("blusa", "XS", "rosado", 600, true)
let Prenda5 = new Prenda("shorts", "M", "violeta", 1200, true)

tienda.push(Prenda1)
tienda.push(Prenda2)
tienda.push(Prenda3)
tienda.push(Prenda4)
tienda.push(Prenda5)

console.table(tienda)

let disponible = tienda.filter(Prenda => Prenda.disponibilidad == true)
console.log(disponible)


let ingresar = (confirm("Busca tu talle"))
if (ingresar == true) {
    let ingresar = (prompt("¿Que talle buscas?"))
    let filtro = tienda.filter(Prenda => Prenda.talle == ingresar)
    console.table(filtro)

}

function agregarprenda() {
    let nombrenuevaprenda = (prompt("ingrese una prenda nueva"))
    let tallenuevo = (prompt("ingrese el talle en letras, ej: S, M, L"))
    let colornuevo = (prompt("ingrese el color de la prenda"))
    let precionuevo = Number(prompt("ingrese el precio"))
    let disponibilidadnueva = confirm("Acepta para confirmar si esta disponible")
    let newprenda = new Prenda( nombrenuevaprenda, tallenuevo, colornuevo, precionuevo, disponibilidadnueva)
    console.log(newprenda)
    tienda.push(newprenda)
    console.log(tienda)
}

let agregarnuevaprenda = (prompt("¿Desea ingresar una prenda nueva?")).toLocaleUpperCase()
while (agregarnuevaprenda == "SI") {
    agregarprenda()
    agregarnuevaprenda = (prompt("¿Tenes otra prenda para cargar?"))
}