const params = new URLSearchParams(window.location.search);
const data = JSON.parse(params.get('data'));
console.log(data);

// Obtén la tabla con la id "especies-invasoras"
const table = document.getElementById('especies-invasoras');

// Agrega una fila y columnas a la tabla
const row = table.insertRow();
const idCell = row.insertCell();
const nombreCell = row.insertCell();
const nombreScientificoCell = row.insertCell();
const impactoCell = row.insertCell();
const manejoCell = row.insertCell();
const riesgoCell = row.insertCell();
const urlimgCell = row.insertCell();

idCell.textContent = data.id;
nombreCell.textContent = data.name;
nombreScientificoCell.textContent = data.scientificName;
nombreScientificoCell.textContent = data.scientificName;
impactoCell.textContent = data.impact;
manejoCell.textContent = data.manage;
riesgoCell.textContent = data.riskLevel;
urlimgCell.textContent = data.urlImage;