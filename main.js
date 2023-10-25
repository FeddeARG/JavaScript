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
  new Item(1002, "mouse", "periferico", 200, 10),
  new Item(1003, "windows11", "software", 150, 200),
  new Item(1004, "excel", "software", 50, 300),
  new Item(1005, "adobe pack", "software", 100, 70),
  new Item(1006, "notebook", "hardware", 1300, 5),
  new Item(1007, "netbook", "hardware", 700, 7),
];

function searchById() {
  let itemId = Number(prompt("Enter an ID between 1000 and 1007"));
  while (itemId < 1000 || itemId > 1007 || isNaN(itemId)) {
    itemId = Number(prompt("Enter a valid ID between 1000 and 1007"));
  }
  const filteredItems = item.filter(item => item.id === itemId);
  while (filteredItems.length === 0) {
    itemId = Number(prompt("ID not found. Enter an ID between 1000 and 1007"));
    filteredItems = item.filter(item => item.id === itemId);
  }
  return filteredItems;
}

function searchByName() {
  let itemName = prompt("Enter the name of the product: \n- Monitor \n- Keyboard \n- Mouse \n- Windows11 \n- Excel \n- Adobe pack \n- Notebook \n- Netbook").toLowerCase();
  while (!["monitor", "keyboard", "mouse", "windows11", "excel", "adobe pack", "notebook", "netbook"].includes(itemName)) {
    itemName = prompt("Enter a valid product name: \n- Monitor \n- Keyboard \n- Mouse \n- Windows11 \n- Excel \n- Adobe pack \n- Notebook \n- Netbook").toLowerCase();
  }
  const filteredItems = item.filter(item => item.nombre === itemName);
  while (filteredItems.length === 0) {
    itemName = prompt("No product found with the entered name. Enter a valid name: \n- Monitor \n- Keyboard \n- Mouse \n- Windows11 \n- Excel \n- Adobe pack \n- Notebook \n- Netbook").toLowerCase();
    filteredItems = item.filter(item => item.nombre === itemName);
  }
  return filteredItems;
}

function searchByCategory() {
  let itemCategory = prompt("Enter one of the following categories: \n- Periferico \n- Software \n- Hardware").toLowerCase();
  while (!["periferico", "software", "hardware"].includes(itemCategory)) {
    itemCategory = prompt("Enter a valid category from the following: \n- Periferico \n- Software \n- Hardware").toLowerCase();
  }
  const filteredItems = item.filter(item => item.categoria === itemCategory);
  while (filteredItems.length === 0) {
    itemCategory = prompt("No category matches the entered value. Enter a valid category from the following: \n- Periferico \n- Software \n- Hardware").toLowerCase();
    filteredItems = item.filter(item => item.categoria === itemCategory);
  }
  return filteredItems;
}

function searchByPrice() {
  let itemPrice = Number(prompt("Enter your budget"));
  while (isNaN(itemPrice) || itemPrice < 0) {
    itemPrice = Number(prompt("Enter a budget greater than 0"));
  }
  const filteredItems = item.filter(item => item.precio <= itemPrice);
  while (filteredItems.length === 0) {
    itemPrice = Number(prompt("No products fit within your budget. Please enter a budget greater than $50"));
    filteredItems = item.filter(item => item.precio <= itemPrice);
  }
  return filteredItems;
}

function adminAccess() {
  let adminAction = prompt("Indicate your need: Stock / Reorder").toLowerCase();
  while (adminAction !== "exit") {
    if (adminAction === "stock") {
      const sortedStock = item.sort((a, b) => a.existencias - b.existencias);
      sortedStock.forEach(item => {
        const itemDetails = document.createElement("p");
        itemDetails.textContent = `
          id: ${item.id}
          nombre: ${item.nombre}
          categoria: ${item.categoria}
          precio: $${item.precio}
          stock: ${item.existencias}
        `;
        inventoryElement.appendChild(itemDetails);
      });
    } else if (adminAction === "reorder") {
      const sortedReorder = item.sort((a, b) => b.existencias - a.existencias);
      sortedReorder.forEach(item => {
        const itemDetails = document.createElement("p");
        itemDetails.textContent = `
          id: ${item.id}
          nombre: ${item.nombre}
          categoria: ${item.categoria}
          precio: $${item.precio}
          stock: ${item.existencias}
        `;
        inventoryElement.appendChild(itemDetails);
      });
    } else {
      alert("Indicate your need: Stock / Reorder or Exit to finish");
    }
    adminAction = prompt("Indicate your need: Stock / Reorder or Exit to finish").toLowerCase();
  }
}

const inventoryElement = document.getElementById("inventory");

alert("PreEntrega2 Naranjo Federico: Inventory Stock Control");
let searchOption;
let filteredItems = [];

do {
  searchOption = prompt("Enter one of the following options: \n- ID \n- Name \n- Category \n- Price \n- Admin (employee access)").toLowerCase();
} while (searchOption !== "id" && searchOption !== "name" && searchOption !== "category" && searchOption !== "price" && searchOption !== "admin");

switch (searchOption) {
  case "id":
    filteredItems = searchById();
    break;
  case "name":
    filteredItems = searchByName();
    break;
  case "category":
    filteredItems = searchByCategory();
    break;
  case "price":
    filteredItems = searchByPrice();
    break;
  case "admin":
    adminAccess();
    break;
  default:
    alert("Enter one of the following options: \n- ID \n- Name \n- Category \n- Price \n- Admin (employee access)").toLowerCase();
    while (searchOption !== "id" && searchOption !== "name" && searchOption !== "category" && searchOption !== "price" && searchOption !== "admin") {
      searchOption = prompt("Enter one of the following options: \n- ID \n- Name \n- Category \n- Price \n- Admin (employee access)").toLowerCase();
    }
    break;
}

if (filteredItems.length > 0) {
  filteredItems.forEach(item => {
    const itemDetails = document.createElement("p");
    itemDetails.textContent = `
      id: ${item.id}
      nombre: ${item.nombre}
      categoria: ${item.categoria}
      precio: $${item.precio}
      stock: ${item.existencias}
    `;
    inventoryElement.appendChild(itemDetails);
  });
}
