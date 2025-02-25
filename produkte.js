document.addEventListener("DOMContentLoaded", function () {
    fetchProdukte();
});

async function fetchProdukte() {
    try {
        const response = await fetch("produkte.json");
        const produkte = await response.json();
        renderProdukte(produkte, "Alle");
    } catch (error) {
        console.error("Fehler beim Laden der Produkte:", error);
    }
}

function renderProdukte(produkte, kategorie) {
    const container = document.getElementById("produkt-container");
    container.innerHTML = "";

    const gefilterteProdukte = kategorie === "Alle" ? produkte : produkte.filter(p => p.kategorie === kategorie);

    gefilterteProdukte.forEach(produkt => {
        const produktElement = document.createElement("div");
        produktElement.classList.add("produkt");

        produktElement.innerHTML = `
            <img src="${produkt.bild}" alt="${produkt.name}">
            <h3>${produkt.name}</h3>
            <p>${produkt.preis} €</p>
        `;

        container.appendChild(produktElement);
    });
}

function filterProdukte(kategorie) {
    fetch("produkte.json")
        .then(response => response.json())
        .then(produkte => renderProdukte(produkte, kategorie))
        .catch(error => console.error("Fehler beim Filtern der Produkte:", error));
}
