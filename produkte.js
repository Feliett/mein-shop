let alleProdukte = [];

// Beim Laden der Seite Produkte abrufen
document.addEventListener("DOMContentLoaded", () => {
  fetchProdukte();
  // Schließe das Modal, wenn auf das Schließsymbol geklickt wird
  document.querySelector(".close").addEventListener("click", closeModal);
  // Schließe das Modal, wenn außerhalb des Modal-Inhalts geklickt wird
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      closeModal();
    }
  });
});

// Produkte aus der JSON-Datei abrufen
function fetchProdukte() {
  fetch("produkte.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP-Fehler: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      alleProdukte = data;
      renderProdukte(alleProdukte, "Alle");
    })
    .catch(error => console.error("Fehler beim Laden der Produkte:", error));
}

// Produkte rendern und anzeigen
function renderProdukte(produkte, kategorie) {
  const container = document.getElementById("produkt-liste");
  container.innerHTML = ""; // Vorherige Produkte löschen

  // Filtere die Produkte, falls nicht "Alle" ausgewählt ist
  const gefilterteProdukte = kategorie === "Alle"
    ? produkte
    : produkte.filter(produkt => produkt.category === kategorie);

  gefilterteProdukte.forEach(produkt => {
    const produktElement = document.createElement("div");
    produktElement.classList.add("produkt");
    produktElement.innerHTML = `
      <img src="${produkt.image}" alt="${produkt.name}">
      <h3>${produkt.name}</h3>
      <p>${produkt.price.toFixed(2)} € ${produkt.oldPrice ? `<span class="old-price">${produkt.oldPrice.toFixed(2)} €</span>` : ""}</p>
    `;
    // Bei Klick auf ein Produkt öffne das Modal mit den Details
    produktElement.addEventListener("click", () => openModal(produkt));
    container.appendChild(produktElement);
  });
}

// Filtert Produkte basierend auf der Kategorie
function filterProdukte(kategorie) {
  renderProdukte(alleProdukte, kategorie);
}

// Öffnet das Modal-Fenster mit Produktdetails
function openModal(produkt) {
  const modal = document.getElementById("modal");
  const modalDetails = document.getElementById("modal-product-details");

  // Hier kannst du die Beschreibung einfügen; falls produkt.description nicht existiert, wird ein Standardtext genutzt
  modalDetails.innerHTML = `
    <img src="${produkt.image}" alt="${produkt.name}" style="width:100%; height:auto; object-fit:cover; border-radius:8px;">
    <h3>${produkt.name}</h3>
    <p>${produkt.description || "Keine detaillierte Beschreibung verfügbar."}</p>
    <p class="price">${produkt.price.toFixed(2)} € ${produkt.oldPrice ? `<span class="old-price">${produkt.oldPrice.toFixed(2)} €</span>` : ""}</p>
  `;

  // Funktion für den "In den Warenkorb"-Button
  document.getElementById("add-to-cart").onclick = () => {
    alert(`${produkt.name} wurde dem Warenkorb hinzugefügt!`);
  };

  modal.style.display = "block";
}

// Schließt das Modal-Fenster
function closeModal() {
  document.getElementById("modal").style.display = "none";
}
