let alleProdukte = [];
let warenkorb = [];

// Beim Laden der Seite: Produkte und Warenkorb laden sowie Event-Listener setzen
document.addEventListener("DOMContentLoaded", () => {
  fetchProdukte();
  loadWarenkorbFromLocalStorage();

  // Modal für Produktdetails
  document.getElementById("modal-close").addEventListener("click", closeModal);
  // Modal für Warenkorb
  document.getElementById("cart-close").addEventListener("click", closeCartModal);
  document.getElementById("continue-shopping").addEventListener("click", closeCartModal);
  document.getElementById("checkout").addEventListener("click", () => {
    alert("Checkout-Funktionalität ist noch nicht implementiert.");
  });
  // Schließen des Warenkorb-Modals beim Klick außerhalb
  window.addEventListener("click", (event) => {
    const cartModal = document.getElementById("cart-modal");
    if (event.target === cartModal) {
      closeCartModal();
    }
  });
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
    // Beim Klick auf ein Produkt: Modal mit Details öffnen
    produktElement.addEventListener("click", () => openModal(produkt));
    container.appendChild(produktElement);
  });
}

function filterProdukte(kategorie) {
  renderProdukte(alleProdukte, kategorie);
}

// Modal für Produktdetails öffnen
function openModal(produkt) {
  const modal = document.getElementById("modal");
  const modalDetails = document.getElementById("modal-product-details");

  modalDetails.innerHTML = `
    <img src="${produkt.image}" alt="${produkt.name}" style="width:100%; height:auto; object-fit:cover; border-radius:8px;">
    <h3>${produkt.name}</h3>
    <p>${produkt.description || "Keine detaillierte Beschreibung verfügbar."}</p>
    <p class="price">${produkt.price.toFixed(2)} € ${produkt.oldPrice ? `<span class="old-price">${produkt.oldPrice.toFixed(2)} €</span>` : ""}</p>
  `;

  document.getElementById("add-to-cart").onclick = () => {
    addToCart(produkt);
  };

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Warenkorb-Funktionen
function addToCart(produkt) {
  warenkorb.push(produkt);
  saveWarenkorbToLocalStorage();
  alert(`${produkt.name} wurde dem Warenkorb hinzugefügt!`);
}

function loadWarenkorbFromLocalStorage() {
  const storedCart = localStorage.getItem("warenkorb");
  if (storedCart) {
    try {
      warenkorb = JSON.parse(storedCart);
    } catch (e) {
      warenkorb = [];
    }
  }
}

function saveWarenkorbToLocalStorage() {
  localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
}

function openCartModal() {
  renderCartProducts();
  document.getElementById("cart-modal").style.display = "block";
}

function closeCartModal() {
  document.getElementById("cart-modal").style.display = "none";
}

function renderCartProducts() {
  const cartList = document.getElementById("cart-product-list");
  cartList.innerHTML = "";
  if (warenkorb.length === 0) {
    cartList.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
    return;
  }
  warenkorb.forEach((produkt, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-product");
    div.innerHTML = `
      <img src="${produkt.image}" alt="${produkt.name}" style="width:50px; height:50px; object-fit:cover;">
      <span>${produkt.name} - ${produkt.price.toFixed(2)} €</span>
      <button onclick="removeFromCart(${index})">Entfernen</button>
    `;
    cartList.appendChild(div);
  });
}

function removeFromCart(index) {
  warenkorb.splice(index, 1);
  saveWarenkorbToLocalStorage();
  renderCartProducts();
}
