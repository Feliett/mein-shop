let alleProdukte = [];
let warenkorb = [];

// Beim Laden der Seite: Produkte und Warenkorb (aus LocalStorage) laden sowie Event-Listener setzen
document.addEventListener("DOMContentLoaded", () => {
  fetchProdukte();
  loadWarenkorbFromLocalStorage();

  // Schließen des Produktdetail-Modals
  document.getElementById("modal-close").addEventListener("click", closeModal);
  // Schließen des Warenkorb-Modals
  document.getElementById("cart-close").addEventListener("click", closeCartModal);
  document.getElementById("continue-shopping").addEventListener("click", closeCartModal);
  document.getElementById("checkout").addEventListener("click", () => {
    alert("Checkout-Funktionalität ist noch nicht implementiert.");
  });

  // Schließen des Warenkorb-Modals, wenn außerhalb geklickt wird
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
    // Beim Klick auf ein Produkt wird das Modal mit Details geöffnet
    produktElement.addEventListener("click", () => openModal(produkt));
    container.appendChild(produktElement);
  });
}

function filterProdukte(kategorie) {
  renderProdukte(alleProdukte, kategorie);
}

// Öffnet das Modal für Produktdetails
function openModal(produkt) {
  const modal = document.getElementById("modal");
  const modalDetails = document.getElementById("modal-product-details");

  modalDetails.innerHTML = `
    <img src="${produkt.image}" alt="${produkt.name}" style="width:100%; height:auto; object-fit:cover; border-radius:8px;">
    <h3>${produkt.name}</h3>
    <p>${produkt.description || "Keine detaillierte Beschreibung verfügbar."}</p>
    <p class="price">${produkt.price.toFixed(2)} € ${produkt.oldPrice ? `<span class="old-price">${produkt.oldPrice.toFixed(2)} €</span>` : ""}</p>
  `;

  // "In den Warenkorb"-Button: Fügt das Produkt dem Warenkorb hinzu
  document.getElementById("add-to-cart").onclick = () => {
    addToCart(produkt);
  };

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Warenkorb-Funktionen:

// Fügt ein Produkt dem Warenkorb hinzu oder erhöht die Menge, falls es bereits vorhanden ist
function addToCart(produkt) {
  const index = warenkorb.findIndex(item => item.id === produkt.id);
  if (index !== -1) {
    warenkorb[index].quantity += 1;
  } else {
    // Füge das Produkt hinzu und setze die Anfangsmenge auf 1
    warenkorb.push({ ...produkt, quantity: 1 });
  }
  saveWarenkorbToLocalStorage();
  alert(`${produkt.name} wurde dem Warenkorb hinzugefügt!`);
}

// Lädt den Warenkorb aus LocalStorage
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

// Speichert den aktuellen Warenkorb in LocalStorage
function saveWarenkorbToLocalStorage() {
  localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
}

// Öffnet das Warenkorb-Modal und rendert die darin enthaltenen Produkte
function openCartModal() {
  renderCartProducts();
  document.getElementById("cart-modal").style.display = "block";
}

// Schließt das Warenkorb-Modal
function closeCartModal() {
  document.getElementById("cart-modal").style.display = "none";
}

// Rendert die Produkte im Warenkorb, inkl. Plus/Minus Buttons und Gesamtsumme
function renderCartProducts() {
  const cartList = document.getElementById("cart-product-list");
  cartList.innerHTML = "";

  if (warenkorb.length === 0) {
    cartList.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
    updateCartTotal();
    return;
  }

  warenkorb.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-product");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover;">
      <span>${item.name}</span>
      <span>${item.price.toFixed(2)} €</span>
      <div class="quantity-controls">
        <button onclick="decreaseQuantity(${item.id})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${item.id})">+</button>
      </div>
      <button onclick="removeFromCart(${item.id})">Entfernen</button>
    `;
    cartList.appendChild(div);
  });

  updateCartTotal();
}

// Aktualisiert die Gesamtsumme im Warenkorb
function updateCartTotal() {
  let total = 0;
  warenkorb.forEach(item => {
    total += item.price * item.quantity;
  });

  let totalDiv = document.getElementById("cart-total");
  if (!totalDiv) {
    totalDiv = document.createElement("div");
    totalDiv.id = "cart-total";
    totalDiv.style.marginTop = "20px";
    totalDiv.style.fontWeight = "bold";
    document.querySelector("#cart-modal .modal-content").appendChild(totalDiv);
  }
  totalDiv.innerHTML = "Gesamtsumme: " + total.toFixed(2) + " €";
}

// Erhöht die Menge eines Produktes im Warenkorb
function increaseQuantity(productId) {
  const index = warenkorb.findIndex(item => item.id === productId);
  if (index !== -1) {
    warenkorb[index].quantity += 1;
    saveWarenkorbToLocalStorage();
    renderCartProducts();
  }
}

// Verringert die Menge eines Produktes im Warenkorb oder entfernt es, wenn die Menge 1 erreicht
function decreaseQuantity(productId) {
  const index = warenkorb.findIndex(item => item.id === productId);
  if (index !== -1) {
    if (warenkorb[index].quantity > 1) {
      warenkorb[index].quantity -= 1;
    } else {
      // Entferne das Produkt, wenn die Menge 1 ist
      warenkorb.splice(index, 1);
    }
    saveWarenkorbToLocalStorage();
    renderCartProducts();
  }
}

// Entfernt ein Produkt komplett aus dem Warenkorb
function removeFromCart(productId) {
  const index = warenkorb.findIndex(item => item.id === productId);
  if (index !== -1) {
    warenkorb.splice(index, 1);
    saveWarenkorbToLocalStorage();
    renderCartProducts();
  }
}
