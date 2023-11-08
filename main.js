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

// Verificación del array en el localStorage
if (storedItemArray) {
  item = JSON.parse(storedItemArray);
} else {
  // Si no se encuentra se crea
  item = [
    new Item(1000, "monitor", "periférico", 1000, 20),
    new Item(1001, "teclado", "periférico", 150, 15),
    new Item(1002, "ratón", "periférico", 200, 10),
    new Item(1003, "windows11", "software", 150, 200),
    new Item(1004, "excel", "software", 50, 300),
    new Item(1005, "paquete de Adobe", "software", 100, 70),
    new Item(1006, "notebook", "hardware", 1300, 5),
    new Item(1007, "netbook", "hardware", 700, 7),
    new Item(1008, "All-in-One", "hardware", 500, 4),
  ];

  // Guardamos en el localStorage
  localStorage.setItem("itemArray", JSON.stringify(item));
}

const inventoryElement = document.querySelector("#inventory");
const searchOptElement = document.querySelector("#searchOpt");
const inputContainerElement = document.querySelector("#inputContainer");
const busquedaButton = document.querySelector("#busquedaButton");

searchOptElement.addEventListener("change", handlesearchOptChange);
busquedaButton.addEventListener("click", handlebusquedaButtonClick);

function handlesearchOptChange() {
  const searchOpt = searchOptElement.value;
  inputContainerElement.innerHTML = "";

  switch (searchOpt) {
    case "id":
      inputContainerElement.innerHTML = `
        <label for="itemId">Ingrese un ID entre (1000-${item[item.length - 1].id} o agregar):</label>
        <input type="text" id="itemId" min="1000" max="1007">
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
      const itemId = document.querySelector("#itemId").value;
      if (itemId === "agregar") {
        createNewItemForm();
        return;
      } else if (itemId >= 1000 && itemId <= ultimoID) {
        itemFiltrado = item.filter((item) => item.id == itemId);
        if (!itemFiltrado.length) {
          error = "No hay coincidencias con el ID ingresado.";
        }
      } else {
        error = "Por favor, ingrese un ID de producto válido.";
      }
      break;

    case "nombre":
      const itemName = document.querySelector("#itemName").value.toLowerCase();
      if (itemName.trim() !== "") {
        itemFiltrado = item.filter((item) => item.nombre.toLowerCase() === itemName);
        if (!itemFiltrado.length) {
          error = "No hay coincidencias con el nombre ingresado.";
        }
      } else {
        error = "Por favor, ingrese el nombre de un producto.";
      }
      break;

    case "categoria":
      const itemCategory = document.querySelector("#itemCategory").value.toLowerCase();
      if (itemCategory.trim() !== "") {
        itemFiltrado = item.filter((item) => item.categoria.toLowerCase() === itemCategory);
        if (!itemFiltrado.length) {
          error = "No hay coincidencias con la categoría ingresada.";
        }
      } else {
        error = "Por favor, ingrese una categoría de productos.";
      }
      break;

    case "precio":
      const itemPrice = Number(document.querySelector("#itemPrice").value);
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

function createNewItemForm() {
  const newItemForm = document.createElement("div");
  newItemForm.innerHTML = `
    <h3>Add New Item</h3>
    <label for="newItemId">ID:</label>
    <input type="number" id="newItemId" min="1000">
    <label for="newItemNombre">Nombre:</label>
    <input type="text" id="newItemNombre">
    <label for="newItemCategoria">Categoría:</label>
    <input type="text" id="newItemCategoria">
    <label for="newItemPrecio">Precio:</label>
    <input type="number" id="newItemPrecio" min="0">
    <label for="newItemExistencias">Existencias:</label>
    <input type="number" id="newItemExistencias" min="0">
    <button id="addItemButton">Add Item</button>
  `;
  inventoryElement.innerHTML = "";
  inventoryElement.append(newItemForm);

  const addItemButton = document.querySelector("#addItemButton");
  addItemButton.addEventListener("click", handleAddItemButtonClick);
}

function handleAddItemButtonClick() {
  const newItemId = Number(document.querySelector("#newItemId").value);
  const newItemNombre = document.querySelector("#newItemNombre").value;
  const newItemCategoria = document.querySelector("#newItemCategoria").value;
  const newItemPrecio = Number(document.querySelector("#newItemPrecio").value);
  const newItemExistencias = Number(document.querySelector("#newItemExistencias").value);

  const isIdExist = item.some((item) => item.id === newItemId);
  const isNameExist = item.some((item) => item.nombre === newItemNombre);

  if (isIdExist) {
    Swal.fire({
      title: 'Error!',
      text: 'ID existente, ingrese un ID que no se encuentre repetido',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
    console.log("Error: ID existente en Array.");
    return;
  }

  if (isNameExist) {
    Swal.fire({
      title: 'Error!',
      text: 'Nombre existente, ingrese un Nombre que no se encuentre repetido',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
    console.log("Error: Nombre existente en Array.");
    return;
  }

  const newItem = new Item(newItemId, newItemNombre, newItemCategoria, newItemPrecio, newItemExistencias);

  item.push(newItem);

  updateLocalStorage(item);
  displayArrayInfo();
  displayItems(item);
}



function handleAdminAction() {
  const adminAction = document.querySelector("#adminAction").value;

  switch (adminAction) {
    case "stock":
      const stockOrdenado = item.slice().sort((a, b) => a.existencias - b.existencias);
      displayItems(stockOrdenado);
      break;

    case "reposicion":
      const repOrdenado = item.slice().sort((a, b) => b.existencias - a.existencias);
      displayItems(repOrdenado);
      break;

    default:
      break;
  }
}



function displayArrayInfo() {
  const searchOpt = searchOptElement.value;
  const arrayInfoElement = document.querySelector("#arrayContainer");

  if (searchOpt === "") {
    arrayInfoElement.innerHTML = "";
    return;
  }

  let formattedArrayInfo = "";
  item.forEach(function (item) {
    formattedArrayInfo += "ID: " + item.id + "<br>";
    formattedArrayInfo += "Nombre: " + item.nombre + "<br>";
    formattedArrayInfo += "Categoría: " + item.categoria + "<br>";
    formattedArrayInfo += "Precio en USD: " + item.precio + "<br>";
    formattedArrayInfo += "Existencias: " + item.existencias + " unidades"+"<br><br>";
  });

  if (formattedArrayInfo === "") {
    arrayInfoElement.innerHTML = "No hay resultados.";
  } else {
    arrayInfoElement.innerHTML = formattedArrayInfo;
  }
}

function updateLocalStorage(items) {
  localStorage.setItem("itemArray", JSON.stringify(items));
}

// Seteo del intervalo de actualización del array
setInterval(() => {
  displayArrayInfo();
  updateLocalStorage(item);
}, 5000);

function displayItems(items) {
  inventoryElement.innerHTML = "";
  if (Array.isArray(items)) {
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
        displayArrayInfo();
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
          displayArrayInfo();
          displayItems(items);
        }
      });
      card.append(remButton);
    });
  } else {
    displayArrayInfo();
  }
}

displayArrayInfo();
displayItems(item);


fetch("https://dolarapi.com/v1/dolares/oficial")
  .then(response => response.json())
  .then(data => {
    const doli = document.createElement("div");
    doli.classList.add("div-dol");

    let content = "";
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        content += `${key}: ${data[key]}\n`;
      }
    }

    doli.textContent = content;
    document.body.appendChild(doli);
  });
// wh00t 