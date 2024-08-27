const params = new URLSearchParams(window.location.search);
const data = JSON.parse(params.get('data'));
console.log(data);

const table = document.getElementById('especies-invasoras');
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
