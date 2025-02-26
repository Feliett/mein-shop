document.addEventListener("DOMContentLoaded", function () {
    fetch("produkte.json")
        .then(response => response.json())
        .then(produkte => anzeigenProdukte(produkte))
        .catch(error => console.error("Fehler beim Laden der Produkte:", error));
});

function anzeigenProdukte(produkte, kategorie = "Alle") {
    const produktContainer = document.getElementById("produkt-liste");
    produktContainer.innerHTML = ""; // Vorherige Produkte löschen

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

        produktContainer.appendChild(produktElement);
    });
}

// Event-Listener für Kategorien
document.querySelectorAll(".kategorie-button").forEach(button => {
    button.addEventListener("click", function () {
        const kategorie = this.dataset.kategorie;
        fetch("produkte.json")
            .then(response => response.json())
            .then(produkte => anzeigenProdukte(produkte, kategorie));
    });
});
