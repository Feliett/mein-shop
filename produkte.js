// Globale Variable, um alle Produkte zwischenzuspeichern
let alleProdukte = [];

// Beim Laden der Seite werden die Produkte abgerufen
document.addEventListener("DOMContentLoaded", () => {
  fetchProdukte();
});

// Produkte aus der JSON-Datei abrufen
function fetchProdukte() {
  fetch("produkte.json")
    .then(response => response.json())
    .then(data => {
      alleProdukte = data;           // Alle Produkte speichern
      renderProdukte(alleProdukte, "Alle");  // Standardmäßig alle anzeigen
    })
    .catch(error => console.error("Fehler beim Laden der Produkte:", error));
}

// Produkte anzeigen; kategorie: "Alle" oder spezifische Kategorie (z.B. "Bekleidung")
function renderProdukte(produkte, kategorie) {
  const container = document.getElementById("produkt-liste");
  container.innerHTML = ""; // Container leeren

  // Falls nicht "Alle" gewählt wurde, filtern
  const gefilterteProdukte = kategorie === "Alle"
    ? produkte
    : produkte.filter(produkt => produkt.category === kategorie);

  // Für jedes Produkt ein Element erstellen und einfügen
  gefilterteProdukte.forEach(produkt => {
    const produktElement = document.createElement("div");
    produktElement.classList.add("produkt");
    produktElement.innerHTML = `
      <img src="${produkt.image}" alt="${produkt.name}">
      <h3>${produkt.name}</h3>
      <p>${produkt.price.toFixed(2)} € ${produkt.oldPrice ? `<span class="old-price">${produkt.oldPrice.toFixed(2)} €</span>` : ""}</p>
    `;
    container.appendChild(produktElement);
  });
}

// Funktion zum Filtern der Produkte nach Kategorie
function filterProdukte(kategorie) {
  renderProdukte(alleProdukte, kategorie);
}
