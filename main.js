let url = "https://api-colombia.com/"
let urlFinal = url + "/api/v1/Country/Colombia"

fetch(urlFinal)
.then(response => response.json())
.then(res => {
     const descripcionDiv = document.getElementById("description");
     descripcionDiv.innerHTML = res.description;
   })

async function crearTarjetasDepartamentos() {
  try {
    const response = await fetch("https://api-colombia.com/api/v1/Department");
    const datos = await response.json();
    const departamentos = JSON.parse(JSON.stringify(datos));
    mostrarTarjetasDepartamentos(departamentos);
  } catch (error) {
    console.error(error);
    
  }
}

function mostrarTarjetasDepartamentos(departamentos) {
  const contenedor = document.getElementById("contenedor");
  departamentos.forEach((departamento) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";
    const imagen = document.createElement("img");
    imagen.src = "./Resources/Gobierno_de_colombia.png";
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

crearTarjetasDepartamentos();

function mostrarDetallesDepartamento(departamento) {
  const detalles = document.createElement("div");
  detalles.innerHTML = `
    <h2>Detalles del departamento</h2>
    <p>Nombre: ${departamento.name}</p>
    <p>Descripción: ${departamento.description}</p>
  `;

  const detallesPage = "Details.html";
  const parametros = `?nombre=${departamento.name}&descripcion=${departamento.description}&id=${departamento.id}`;
  window.location.href = detallesPage + parametros;
}
