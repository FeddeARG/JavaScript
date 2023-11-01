localStorage.clear();

let item = [];

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
    new Item(1008, "Allin1", "hardware", 500, 4),
  ];

  // Guardamos en el localStorage
  localStorage.setItem("itemArray", JSON.stringify(item));
}

const inventoryElement = document.getElementById("inventory");
const searchOptElement = document.getElementById("searchOpt");
const inputContainerElement = document.getElementById("inputContainer");
const busquedaButton = document.getElementById("busquedaButton");

searchOptElement.addEventListener("change", handlesearchOptChange);
busquedaButton.addEventListener("click", handlebusquedaButtonClick);

function handlesearchOptChange() {
  const searchOpt = searchOptElement.value;
  inputContainerElement.innerHTML = "";

  switch (searchOpt) {

    case "id":
      inputContainerElement.innerHTML = `
        <label for="itemId">Ingrese un ID entre (1000-${item[item.length - 1].id}):</label>
        <input type="number" id="itemId" min="1000" max="1007">
      `;
      break;

    case "nombre":
      inputContainerElement.innerHTML = `
        <label for="itemName">Ingrese el nombre de un producto:</label>
        <input type="text" id="itemName">
      `;
      break;

    case "categoria":
      inputContainerElement.innerHTML = `
        <label for="itemCategory">Ingrese una categoría:</label>
        <input type="text" id="itemCategory">
      `;
      break;

    case "precio":
      inputContainerElement.innerHTML = `
        <label for="itemPrice">Ingrese un presupuesto:</label>
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
  const searchOpt = searchOptElement.value;
  const menorPrecio = item.reduce((min, currentItem) => {
    return currentItem.precio < min ? currentItem.precio : min;
  }, item[0].precio);
  let ultimoID = item[item.length - 1].id;
  let itemFiltrado = [];
  let error = "";

  switch (searchOpt) {

    case "id":

      const itemId = Number(document.getElementById("itemId").value);
      if (itemId >= 1000 && itemId <= ultimoID) {
        itemFiltrado = item.filter((item) => item.id === itemId);
        if (!itemFiltrado.length) {
          error = "No hay coincidencias con el ID ingresado.";
        }
      } else {
        error = "Por favor, ingrese un ID de producto.";
      }
      break;

    case "nombre":

      const itemName = document.getElementById("itemName").value.toLowerCase();
      if (itemName.trim() !== "") {
        itemFiltrado = item.filter((item) => item.nombre === itemName);
        if (!itemFiltrado.length) {
          error = "No hay coincidencias con el nombre ingresado.";
        }
      } else {
        error = "Por favor, ingrese el nombre de un producto.";
      }
      break;

    case "categoria":

      const itemCategory = document.getElementById("itemCategory").value.toLowerCase();
      if (itemCategory.trim() !== "") {
        itemFiltrado = item.filter((item) => item.categoria === itemCategory);
        if (!itemFiltrado.length) {
          error = "No hay coincidencias con la categoría ingresada.";
        }
      } else {
        error = "Por favor, ingrese una categoría de productos.";
      }
      break;

    case "precio":

      const itemPrice = Number(document.getElementById("itemPrice").value);
      if (!isNaN(itemPrice) && itemPrice >= 0) {
        itemFiltrado = item.filter((item) => item.precio <= itemPrice);
        if (!itemFiltrado.length) {
          error = "No hay coincidencias dentro del rango establecido.";
        }
      } else {
        error = "Por favor, ingrese un presupuesto mayor a " + menorPrecio;
      }
      break;

    case "admin":

      handleAdminAction();
      return;

    default:
      break;
  }

  if (error !== "") {
    const errorElement = document.createElement("p");
    errorElement.textContent = error;
    inventoryElement.innerHTML = "";
    inventoryElement.append(errorElement);
  } else {
    displayItems(itemFiltrado);
  }
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

function displayArrayInfo() {
  const arrayContainer = document.getElementById("arrayContainer");
  let formattedArrayInfo = "";
  item.forEach(function (item) {
    formattedArrayInfo += "ID: " + item.id + "<br>";
    formattedArrayInfo += "Nombre: " + item.nombre + "<br>";
    formattedArrayInfo += "Categoría: " + item.categoria + "<br>";
    formattedArrayInfo += "Precio: $" + item.precio + "<br>";
    formattedArrayInfo += "Existencias: " + item.existencias + "<br><br>";
  });
  arrayContainer.innerHTML = formattedArrayInfo;
}

displayArrayInfo();

function updateLocalStorage(items) {
  localStorage.setItem("item", JSON.stringify(items));
}

function displayItems(items) {
  inventoryElement.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const idElement = document.createElement("p");
    idElement.textContent = `ID: ${item.id}`;
    card.append(idElement);

    const nombreElement = document.createElement("p");
    nombreElement.textContent = `Nombre: ${item.nombre}`;
    card.append(nombreElement);

    const categoriaElement = document.createElement("p");
    categoriaElement.textContent = `Categoría: ${item.categoria}`;
    card.append(categoriaElement);

    const precioElement = document.createElement("p");
    precioElement.textContent = `Precio: $${item.precio}`;
    card.append(precioElement);
    
    const existenciasElement = document.createElement("p");
    existenciasElement.textContent = `Existencias: ${item.existencias}`;
    card.append(existenciasElement);
    inventoryElement.append(card);

    const addButton = document.createElement("button");
    addButton.classList.add("card-btn");
    addButton.textContent = "Agregar";
    addButton.addEventListener("click", () => {
      item.existencias++;
      updateLocalStorage(items);
      displayItems(items);
    });
    card.append(addButton);

    const remButton = document.createElement("button");
    remButton.classList.add("card-btn");
    remButton.textContent = "Quitar";
    remButton.addEventListener("click", () => {
      if (item.existencias > 0) {
        item.existencias--;
        updateLocalStorage(items);
        displayItems(items);
      }
    });
    card.append(remButton);
  });
}

displayItems();

