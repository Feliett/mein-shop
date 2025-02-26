const produkte = [
    {
        name: "Coolmax Hemd Regular Fit",
        preis: "24,99 €",
        kategorie: "Bekleidung",
        image: "images/hemd_weiss.png"
    },
    {
        name: "Coolmax T-Shirt Slim Fit",
        preis: "14,99 €",
        kategorie: "Bekleidung",
        image: "images/tshirt_schwarz.png"
    },
    {
        name: "5er-Pack Coolmax Socken",
        preis: "14,99 €",
        kategorie: "Accessoires",
        image: "images/socken_schwarz.png"
    },
    {
        name: "Coolmax Hemd Regular Fit Schwarz",
        preis: "24,99 €",
        kategorie: "Bekleidung",
        image: "images/hemd_schwarz.png"
    },
    {
        name: "Elegante Armbanduhr",
        preis: "99,99 €",
        kategorie: "Uhren",
        image: "images/uhr_elegant.png"
    },
    {
        name: "Sportliche Armbanduhr",
        preis: "89,99 €",
        kategorie: "Uhren",
        image: "images/uhr_sport.png"
    },
    {
        name: "Ledergürtel Braun",
        preis: "19,99 €",
        kategorie: "Accessoires",
        image: "images/guertel_braun.png"
    },
    {
        name: "Lederhandschuhe Schwarz",
        preis: "29,99 €",
        kategorie: "Accessoires",
        image: "images/handschuhe_schwarz.png"
    }
];

function filterProdukte(kategorie) {
    const container = document.getElementById("produkt-container");
    container.innerHTML = ""; // Container leeren
    
    const gefilterteProdukte = kategorie === "Alle" ? produkte : produkte.filter(p => p.kategorie === kategorie);
    
    gefilterteProdukte.forEach(produkt => {
        const produktElement = document.createElement("div");
        produktElement.classList.add("produkt");
        produktElement.innerHTML = `
            <img src="${produkt.image}" alt="${produkt.name}">
            <h3>${produkt.name}</h3>
            <p>${produkt.preis}</p>
        `;
        container.appendChild(produktElement);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    filterProdukte("Alle"); // Standardmäßig alle Produkte anzeigen
});
