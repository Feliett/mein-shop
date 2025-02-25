document.addEventListener("DOMContentLoaded", function () {
    ladeProdukte();
});

function ladeProdukte(kategorie = "alle") {
    fetch("produkt.json")
        .then(response => response.json())
        .then(data => {
            const produktListe = document.getElementById("produkt-liste");
            produktListe.innerHTML = ""; // Vorherige Produkte löschen

            data.produkte.forEach(produkt => {
                if (kategorie === "alle" || produkt.kategorie === kategorie) {
                    const produktElement = document.createElement("div");
                    produktElement.classList.add("produkt");
                    produktElement.innerHTML = `
                        <img src="${produkt.bild}" alt="${produkt.name}">
                        <h3>${produkt.name}</h3>
                        <p>${produkt.preis.toFixed(2)} €</p>
                        <button onclick="alert('Produkt ${produkt.name} in den Warenkorb gelegt!')">Kaufen</button>
                    `;
                    produktListe.appendChild(produktElement);
                }
            });
        })
        .catch(error => console.error("Fehler beim Laden der Produkte:", error));
}

// Funktion für die Suche
function sucheProdukte() {
    const suchbegriff = document.getElementById("suche").value.toLowerCase();
    fetch("produkt.json")
        .then(response => response.json())
        .then(data => {
            const produktListe = document.getElementById("produkt-liste");
            produktListe.innerHTML = ""; // Vorherige Produkte löschen

            data.produkte.forEach(produkt => {
                if (produkt.name.toLowerCase().includes(suchbegriff)) {
                    const produktElement = document.createElement("div");
                    produktElement.classList.add("produkt");
                    produktElement.innerHTML = `
                        <img src="${produkt.bild}" alt="${produkt.name}">
                        <h3>${produkt.name}</h3>
                        <p>${produkt.preis.toFixed(2)} €</p>
                        <button onclick="alert('Produkt ${produkt.name} in den Warenkorb gelegt!')">Kaufen</button>
                    `;
                    produktListe.appendChild(produktElement);
                }
            });
        })
        .catch(error => console.error("Fehler beim Laden der Produkte:", error));
}
