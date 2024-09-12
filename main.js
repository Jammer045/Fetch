let url = "https://api-colombia.com/"
let urlFinal = url + "/api/v1/Country/Colombia"

fetch(urlFinal)
  .then(response => response.json())
  .then(res => {
    const descripcionDiv = document.getElementById("description");
    descripcionDiv.innerHTML = res.description;
  })

let departamentos = [];

async function crearTarjetasDepartamentos() {
  try {
    const response = await fetch("https://api-colombia.com/api/v1/Department");
    const datos = await response.json();
    departamentos = JSON.parse(JSON.stringify(datos));
    console.log(departamentos);
    
    mostrarTarjetasDepartamentos(departamentos);
  } catch (error) {
    console.error(error);
  }
}

function mostrarTarjetasDepartamentos(departamentos) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = ''; // Limpiar el contenedor antes de mostrar las tarjetas
  departamentos.forEach((departamento) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";
    
    const imagen = document.createElement("img");
    imagen.src = "./Resources/bogota_1.png";
    
    const titulo = document.createElement("h5");
    titulo.textContent = departamento.name;
    titulo.classList.add("card-title");
    
    const descripcion = document.createElement("p");
    descripcion.textContent = departamento.description;
    descripcion.classList.add("card-text");
    
    const botonDetalles = document.createElement("button");
    botonDetalles.textContent = "Ver detalles";
    botonDetalles.classList.add("btn", "btn-primary");
    botonDetalles.addEventListener("click", () => {
      mostrarDetallesDepartamento(departamento);
    });
    
    card.appendChild(imagen);
    card.appendChild(titulo);
    card.appendChild(descripcion);
    card.appendChild(botonDetalles);
    contenedor.appendChild(card);
  });
}

function mostrarDetallesDepartamento(departamento) {
  const detallesPage = "Details.html";
  const parametros = `?nombre=${departamento.name}&descripcion=${departamento.description}&id=${departamento.id}`;
  window.location.href = detallesPage + parametros;
}

const inputSearch = document.getElementById('search');
const checkboxPopulation = document.getElementById('checkPopulation');

function filterDepartments() {
  const searchTerm = inputSearch.value.toLowerCase();
  const showLargePopulationOnly = checkboxPopulation.checked;
  
  const filteredDepartments = departamentos.filter(departamento =>
    departamento.name.toLowerCase().includes(searchTerm) &&
    (!showLargePopulationOnly || departamento.population >= 1500000)
    
  );
  
  if (filteredDepartments.length === 0) {
    alert("No se encontraron coincidencias");
  } else {
    mostrarTarjetasDepartamentos(filteredDepartments);
  }
}

inputSearch.addEventListener('input', filterDepartments);
checkboxPopulation.addEventListener('change', filterDepartments);

crearTarjetasDepartamentos();