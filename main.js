class Item {
  constructor(id, nombre, categoria, precio, existencias) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.existencias = existencias;
  }
}
const item = [
  new Item(1000, "monitor", "periferico", 1000, 20),
  new Item(1001, "teclado", "periferico", 150, 15),
  new Item(1002, "ratón", "periferico", 200, 10),
  new Item(1003, "windows11", "software", 150, 200),
  new Item(1004, "excel", "software", 50, 300),
  new Item(1005, "paquete de adobe", "software", 100, 70),
  new Item(1006, "notebook", "hardware", 1300, 5),
  new Item(1007, "netbook", "hardware", 700, 7),
];
function buscarId() {
  let itemId = Number(prompt("Ingrese un ID entre 1000 y 1007"));
  while (itemId < 1000 || itemId > 1007 || isNaN(itemId)) {
    itemId = Number(prompt("Ingrese un ID entre 1000 y 1007"));
  }
  let itemFiltrado = item.filter(item => item.id === itemId);
  while (itemFiltrado.length === 0) {
    itemId = Number(prompt("ID no encontrado. Ingrese un ID entre 1000 y 1007"));
    itemFiltrado = item.filter(item => item.id === itemId);
  }
  return itemFiltrado;
}
function buscarNombre() {
  let itemName = prompt("Ingrese el nombre de un producto: \n- Monitor \n- Teclado \n- Mouse \n- Windows11 \n- Excel \n- Paquete de Adobe \n- Notebook \n- Netbook").toLowerCase();
  while (!["monitor", "teclado", "mouse", "windows11", "excel", "paquete de adobe", "notebook", "netbook"].includes(itemName)) {
    itemName = prompt("Ingrese un nombre de producto válido: \n- Monitor \n- Teclado \n- Mouse \n- Windows11 \n- Excel \n- Paquete de Adobe \n- Notebook \n- Netbook").toLowerCase();
  }
  let itemFiltrado = item.filter(item => item.nombre === itemName);
  while (itemFiltrado.length === 0) {
    itemName = prompt("Nombre no encontrado. Ingrese el nombre de un producto: \n- Monitor \n- Teclado \n- Mouse \n- Windows11 \n- Excel \n- Paquete de Adobe \n- Notebook \n- Netbook").toLowerCase();
    itemFiltrado = item.filter(item => item.nombre === itemName);
  }
  return itemFiltrado;
}
function buscarCategoria() {
  let itemCat = prompt("Ingrese una de las siguientes categorías: \n- Periferico \n- Software \n- Hardware").toLowerCase();
  while (!["periferico", "software", "hardware"].includes(itemCat)) {
    itemCat = prompt("Ingrese una categoría válida de las siguientes: \n- Periferico \n- Software \n- Hardware").toLowerCase();
  }
  let itemsFiltrados = item.filter(item => item.categoria === itemCat);
  while (itemsFiltrados.length === 0) {
    itemCat = prompt("No hay categorías que coincidan con el valor ingresado. Ingrese una categoría válida de las siguientes: \n- Periferico \n- Software \n- Hardware").toLowerCase();
    itemsFiltrados = item.filter(item => item.categoria === itemCat);
  }
  return itemsFiltrados;
}
function buscarPrecio() {
  let itemPrice = Number(prompt("Ingrese su presupuesto"));
  while (isNaN(itemPrice) || itemPrice < 0) {
    itemPrice = Number(prompt("Ingrese un presupuesto mayor a 0"));
  }
  let itemsFiltrados = item.filter(item => item.precio <= itemPrice);
  while (itemsFiltrados.length === 0) {
    itemPrice = Number(prompt("No hay productos que se ajusten a su presupuesto. Por favor, ingrese un presupuesto mayor a $50"));
    itemsFiltrados = item.filter(item => item.precio <= itemPrice);
  }
  return itemsFiltrados;
}
function accesoAdmin() {
  let accionAdm = prompt("Indique su necesidad: Stock / Repo").toLowerCase();
  while (accionAdm !== "salir") {
    if (accionAdm === "stock") {
      const stockOrdenado = item.sort((a, b) => a.existencias - b.existencias);
      stockOrdenado.forEach(item => {
        const listaItem = document.createElement("p");
        listaItem.textContent =  `
          id: ${item.id}
          nombre: ${item.nombre}
          categoría: ${item.categoria}
          precio: $${item.precio}
          stock: ${item.existencias}
        ` ;
        inventoryElement.appendChild(listaItem);
      });
    } else if (accionAdm === "repo") {
      const repOrdenado = item.sort((a, b) => b.existencias - a.existencias);
      repOrdenado.forEach(item => {
        const listaItem = document.createElement("p");
        listaItem.textContent =  `
          id: ${item.id}
          nombre: ${item.nombre}
          categoría: ${item.categoria}
          precio: $${item.precio}
          stock: ${item.existencias}
        ` ;
        inventoryElement.appendChild(listaItems);
      });
    } else {
      alert("Indique su necesidad: Stock / Reposicion o Salir para finalizar");
    }
    accionAdm = prompt("Indique su necesidad: Stock / Reposicion o Salir para finalizar").toLowerCase();
  }
}
const inventoryElement = document.getElementById("inventory");
alert("PreEntrega2 Naranjo Federico: Control de Stock de Inventario");
let opcionBusqueda;
let itemsFiltrados = [];
do {
  opcionBusqueda = prompt("Ingrese una de las siguientes opciones: \n- ID \n- Nombre \n- Categoría \n- Precio \n- Admin (acceso de empleado)").toLowerCase();
} while (opcionBusqueda !== "id" && opcionBusqueda !== "nombre" && opcionBusqueda !== "categoria" && opcionBusqueda !== "precio" && opcionBusqueda !== "admin");
switch (opcionBusqueda) {
  case "id":
    itemsFiltrados = buscarId();
    break;
  case "nombre":
    itemsFiltrados = buscarNombre();
    break;
  case "categoria":
    itemsFiltrados = buscarCategoria();
    break;
  case "precio":
    itemsFiltrados = buscarPrecio();
    break;
  case "admin":
    accesoAdmin();
    break;
  default:
    alert("Ingrese una de las siguientes opciones: \n- ID \n- Nombre \n- Categoría \n- Precio \n- Admin (acceso de empleado)").toLowerCase();
    while (opcionBusqueda !== "id" && opcionBusqueda !== "nombre" && opcionBusqueda !== "categoría" && opcionBusqueda !== "precio" && opcionBusqueda !== "admin") {
      opcionBusqueda = prompt("Ingrese una de las siguientes opciones: \n- ID \n- Nombre \n- Categoría \n- Precio \n- Admin (acceso de empleado)").toLowerCase();
    }
    break;
}
if (itemsFiltrados.length > 0) {
  itemsFiltrados.forEach(item => {
    const detallesItem = document.createElement("p");
    detallesItem.textContent =  `
      id: ${item.id}
      nombre: ${item.nombre}
      categoría: ${item.categoria}
      precio: $${item.precio}
      stock: ${item.existencias}
    ` ;
    inventoryElement.appendChild(detallesItem);
  });
}