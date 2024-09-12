const urlParams = new URLSearchParams(window.location.search);
const nombre = urlParams.get("nombre");
const descripcion = urlParams.get("descripcion");
const idDepartamento = urlParams.get('id');

document.getElementById('departamento-info').innerHTML = `
  <h2 class="card-title">Detalles del departamento</h2>
  <p class="card-text"><strong>Nombre:</strong> ${nombre}</p>
  <p class="card-text"><strong>Descripción:</strong> ${descripcion}</p>
`;

let ciudades = [];
let areasNaturales = [];

function crearTarjeta(item, contenedor) {
  const col = document.createElement('div');
  col.classList.add('col');
  const card = document.createElement('div');
  card.classList.add('card', 'h-100');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const titulo = document.createElement('h5');
  titulo.textContent = item.name;
  titulo.classList.add('card-title');
  const descripcion = document.createElement('p');
  descripcion.textContent = item.description;
  descripcion.classList.add('card-text');
  cardBody.appendChild(titulo);
  cardBody.appendChild(descripcion);
  card.appendChild(cardBody);
  col.appendChild(card);
  contenedor.appendChild(col);
}

function mostrarItemsFiltrados(searchTerm, showCitiesOnly, showNaturalAreasOnly) {
  const contenedorCiudades = document.getElementById('Ciudades');
  const contenedorAreasNaturales = document.getElementById('naturalAreas');
  const ciudadesTitle = document.getElementById('ciudadesTitle');
  const areasNaturalesTitle = document.getElementById('areasNaturalesTitle');
  
  contenedorCiudades.innerHTML = '';
  contenedorAreasNaturales.innerHTML = '';

  const ciudadesFiltradas = ciudades.filter(ciudad => 
    ciudad.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const areasNaturalesFiltradas = areasNaturales.filter(area => 
    area.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!showCitiesOnly) {
    ciudadesFiltradas.forEach(ciudad => crearTarjeta(ciudad, contenedorCiudades));
  }

  if (!showNaturalAreasOnly) {
    areasNaturalesFiltradas.forEach(area => crearTarjeta(area, contenedorAreasNaturales));
  }

  const hayCiudades = ciudadesFiltradas.length > 0;
  const hayAreasNaturales = areasNaturalesFiltradas.length > 0;

  ciudadesTitle.style.display = showCitiesOnly ? 'none' : (ciudadesFiltradas.length > 0 ? 'block' : 'none');
  areasNaturalesTitle.style.display = showNaturalAreasOnly ? 'none' : (areasNaturalesFiltradas.length > 0 ? 'block' : 'none');
  if (!hayCiudades && !hayAreasNaturales) {
    alert("No se encontraron coincidencias");
  }
}

function fetchData() {
  const idDepartamento = 1;

  return Promise.all([
    fetch(`https://api-colombia.com/api/v1/Department/${idDepartamento}/cities`).then(response => response.json()),
    fetch(`https://api-colombia.com/api/v1/Department/${idDepartamento}/naturalareas`).then(response => response.json())
  ]).then(([ciudadesData, naturalAreasData]) => {
    ciudades = ciudadesData;
    areasNaturales = naturalAreasData.flatMap(departamento => departamento.naturalAreas);
    mostrarItemsFiltrados('', showCitiesOnlyCheckbox.checked, showNaturalAreasCheckbox.checked);
  }).catch(error => console.error(error));
}

fetchData();

const searchInput = document.getElementById('searchInput');
const showCitiesOnlyCheckbox = document.getElementById('showCitiesOnly');
const showNaturalAreasCheckbox = document.getElementById('showNaturalAreasOnly');

function handleSearch() {
  const searchTerm = searchInput.value;
  const showCitiesOnly = showCitiesOnlyCheckbox.checked;
  const showNaturalAreasOnly = showNaturalAreasCheckbox.checked;
  mostrarItemsFiltrados(searchTerm, showCitiesOnly, showNaturalAreasOnly);
}

searchInput.addEventListener('input', handleSearch);
showCitiesOnlyCheckbox.addEventListener('change', handleSearch);
showNaturalAreasCheckbox.addEventListener('change', handleSearch);

searchInput.addEventListener('input', handleSearch);
showCitiesOnlyCheckbox.addEventListener('change', handleSearch);
showNaturalAreasCheckbox.addEventListener('change', handleSearch);

const url = `https://api-colombia.com/api/v1/InvasiveSpecie/${idDepartamento}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const params = new URLSearchParams();
    params.set('data', JSON.stringify(data));

    const link = document.createElement('a');
    link.href = `Especies_invasoras.html?${params.toString()}`;
    link.textContent = 'Especies invasoras';
    link.classList.add('btn', 'btn-primary', 'mt-3');

    document.getElementById('especies-invasoras-link').appendChild(link);
    console.log(data);
  })
  .catch(error => console.error(error));