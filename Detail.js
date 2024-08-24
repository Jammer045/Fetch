const urlParams = new URLSearchParams(window.location.search);
const nombre = urlParams.get("nombre");
const descripcion = urlParams.get("descripcion");

document.getElementById('departamento-info').innerHTML = `
  <h2>Detalles del departamento</h2>
  <p>Nombre: ${nombre}</p>
  <p>Descripción: ${descripcion}</p>
`;

const idDepartamento = urlParams.get('id');


fetch(`https://api-colombia.com/api/v1/Department/${idDepartamento}/cities`)
  .then(response => response.json())
  .then(ciudades => {
    const contenedorCiudades = document.getElementById('Ciudades');
    ciudades.forEach(ciudad => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.width = '18rem';
      const titulo = document.createElement('h5');
      titulo.textContent = ciudad.name;
      titulo.classList.add('card-title');
      const descripcion = document.createElement('p');
      descripcion.textContent = ciudad.description;
      descripcion.classList.add('card-text');
      card.appendChild(titulo);
      card.appendChild(descripcion);
      contenedorCiudades.appendChild(card);
      
    });
  })
  .catch(error => console.error(error));

  fetch(`https://api-colombia.com/api/v1/Department/${idDepartamento}/naturalareas`)
  .then(response => response.json())
  .then(data => {
    const contenedorAreasNaturales = document.getElementById('naturalAreas');
    data.forEach(departamento => {
      departamento.naturalAreas.forEach(areaNatural => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.width = '18rem';
      const titulo = document.createElement('h5');
      titulo.textContent = areaNatural.name;
      titulo.classList.add('card-title');
      const descripcion = document.createElement('p');
      descripcion.textContent = areaNatural.description;
      descripcion.classList.add('card-text');
      card.appendChild(titulo);
      card.appendChild(descripcion);
      contenedorAreasNaturales.appendChild(card);
    });
    });
  })
  .catch(error => console.error(error));

  const url = `https://api-colombia.com/api/v1/InvasiveSpecie/${idDepartamento}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    const params = new URLSearchParams();
params.set('data', JSON.stringify(data));

// Crea un enlace con los parámetros de URL
const link = document.createElement('a');
link.href = `Especies_invasoras.html?${params.toString()}`;
link.textContent = 'Especies invasoras';

// Agrega el enlace a la página
document.body.appendChild(link);
    console.log(data);
   
  })
  .catch(error => console.error(error));
