class Item {
  constructor(id, nombre, categoria, precio, existencias) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.existencias = existencias;
  }
}

const separador = " / ";
let item = [];

// Recupero el array del localStorage
const storedItemArray = localStorage.getItem("itemArray");

// Verificacion del array en el localStorage
if (storedItemArray) {
  item = JSON.parse(storedItemArray);
} else {
  // Si no se encuentra se crea
  item = [
    new Item(1000, "monitor", "periferico", 1000, 20),
    new Item(1001, "teclado", "periferico", 150, 15),
    new Item(1002, "ratón", "periferico", 200, 10),
    new Item(1003, "windows11", "software", 150, 200),
    new Item(1004, "excel", "software", 50, 300),
    new Item(1005, "paquete de adobe", "software", 100, 70),
    new Item(1006, "notebook", "hardware", 1300, 5),
    new Item(1007, "netbook", "hardware", 700, 7),
  ];

  // Guardamos en el localStorage
  localStorage.setItem("itemArray", JSON.stringify(item));
}

const inventoryElement = document.getElementById("inventory");
const busquedaOpcElement = document.getElementById("busquedaOpc");
const inputContainerElement = document.getElementById("inputContainer");
const busquedaButton = document.getElementById("busquedaButton");

busquedaOpcElement.addEventListener("change", handlebusquedaOpcChange);
busquedaButton.addEventListener("click", handlebusquedaButtonClick);

function handlebusquedaOpcChange() {
  const busquedaOpc = busquedaOpcElement.value;
  inputContainerElement.innerHTML = "";

  switch (busquedaOpc) {
    
    case "id":
      inputContainerElement.innerHTML = `
        <label for="itemId">Ingrese ID (1000-1007):</label>
        <input type="number" id="itemId" min="1000" max="1007">
      `;
      break;
    
    case "nombre":
      inputContainerElement.innerHTML = `
        <label for="itemName">Ingrese nombre de producto:</label>
        <input type="text" id="itemName">
      `;
      break;
    
    case "categoria":
      inputContainerElement.innerHTML = `
        <label for="itemCategory">Ingrese categoría:</label>
        <input type="text" id="itemCategory">
      `;
      break;
    
    case "precio":
      inputContainerElement.innerHTML = `
        <label for="itemPrice">Ingrese presupuesto:</label>
        <input type="number" id="itemPrice" min="0">
      `;
      break;
    
    case "admin":
      inputContainerElement.innerHTML = `
        <label for="adminAction">Selección de Administrador:</label>
        <select id="adminAction">
          <option value="stock">Stock</option>
          <option value="reposicion">Reposicion</option>
        </select>
      `;
      break;
    
    default:
      break;
  }
}

function handlebusquedaButtonClick() {
  const busquedaOpc = busquedaOpcElement.value;
  let itemFiltrado = [];

  switch (busquedaOpc) {
    
    case "id":
      const itemId = Number(document.getElementById("itemId").value);
      itemFiltrado = item.filter((item) => item.id === itemId);
      break;
    
    case "nombre":
      const itemName = document.getElementById("itemName").value.toLowerCase();
      itemFiltrado = item.filter((item) => item.nombre === itemName);
      break;
    
    case "categoria":
      const itemCategory = document.getElementById("itemCategory").value.toLowerCase();
      itemFiltrado = item.filter((item) => item.categoria === itemCategory);
      break;
    
    case "precio":
      const itemPrice = Number(document.getElementById("itemPrice").value);
      itemFiltrado = item.filter((item) => item.precio <= itemPrice);
      break;
    
    case "admin":
      handleAdminAction();
      return;
    
    default:
      break;
  }

  displayItems(itemFiltrado);
}

function handleAdminAction() {
  const adminAction = document.getElementById("adminAction").value;

  switch (adminAction) {
    
    case "stock":
      const stockOrdenado = item.sort((a, b) => a.existencias - b.existencias);
      displayItems(stockOrdenado);
      break;
  
    case "reposicion":
      const repOrdenado = item.sort((a, b) => b.existencias - a.existencias);
      displayItems(repOrdenado);
      break;
    
    default:
      break;
  }
}

function displayItems(items) {
  inventoryElement.innerHTML = "";
  items.forEach((item) => {
    const detallesItem = document.createElement("p");
    detallesItem.textContent = `
      id: ${item.id}
      nombre: ${item.nombre}
      categoría: ${item.categoria}
      precio: $${item.precio}
      stock: ${item.existencias}
    `;
    inventoryElement.append(detallesItem);
  });
}