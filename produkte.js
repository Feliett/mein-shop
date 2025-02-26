let alleProdukte = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchProdukte();
});

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

function renderProdukte(produkte, kategorie) {
  const container = document.getElementById("produkt-liste");
  container.innerHTML = ""; // Container leeren

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
    container.appendChild(produktElement);
  });
}

function filterProdukte(kategorie) {
  renderProdukte(alleProdukte, kategorie);
}
