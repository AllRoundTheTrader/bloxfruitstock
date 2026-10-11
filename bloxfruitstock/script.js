const defaultFruits = [
  { name: "Tiger[physical]",  image: "images/tiger.png",  quantity: 1, price: 149 },
  { name: "Dragon[physical]", image: "images/dragon.png", quantity: 2, price: 899 },
  { name: "Buddha[physical]", image: "images/buddha.png", quantity: 0, price: 20 },
  { name: "Dough[physical]",  image: "images/dough.png",  quantity: 1, price: 59 },
  { name: "Yeti[physical]",  image: "images/yeti.png",  quantity: 1, price: 139 }
];

const rarity = {
  Leopard: "mythical",
  Dragon: "mythical",
  Dough: "mythical",
  Kitsune: "mythical",
  Buddha: "legendary"
};

let fruits = defaultFruits;
try {
  const saved = JSON.parse(localStorage.getItem("fruitStock4"));
  if (saved) {
    fruits = saved;
    defaultFruits.forEach(d => {
      if (!fruits.some(f => f.name === d.name)) fruits.push(d);
    });
  }
} catch (e) {}

const isAdmin = new URLSearchParams(location.search).has("admin");
const list = document.getElementById("fruit-list");
const search = document.getElementById("search");

function save() {
  localStorage.setItem("fruitStock4", JSON.stringify(fruits));
}

function change(name, delta) {
  const f = fruits.find(x => x.name === name);
  f.quantity = Math.max(0, f.quantity + delta);
  save();
  showFruits(search.value);
}

function editPrice(name) {
  const f = fruits.find(x => x.name === name);
  const input = prompt("New price in ₹ for " + name + ":", f.price || 0);
  if (input === null) return;
  const value = Number(input);
  if (isNaN(value) || value < 0) {
    alert("Please enter a valid number");
    return;
  }
  f.price = value;
  save();
  showFruits(search.value);
}

function showFruits(filterText = "") {
  list.innerHTML = "";

  const inStockCount = fruits.filter(f => f.quantity > 0).length;
  document.getElementById("summary").textContent =
    inStockCount + " of " + fruits.length + " fruits in stock";

  fruits
    .filter(f => f.name.toLowerCase().includes(filterText.toLowerCase()))
    .forEach(f => {
      const inStock = f.quantity > 0;
      const card = document.createElement("div");
      card.className = "card " + (rarity[f.name] || "common") + (inStock ? "" : " out");

      card.innerHTML = `
        <div class="art"><img src="${f.image}" alt="${f.name}"></div>
        <h3>${f.name}</h3>
        <p class="price">${f.price ? "₹" + f.price.toLocaleString("en-IN") : "Price not set"}</p>
        <span class="badge ${inStock ? "yes" : "no"}">
          ${inStock ? "In Stock x" + f.quantity : "Out of Stock"}
        </span>
        ${isAdmin ? `
          <div class="admin">
            <button onclick="change('${f.name}', -1)">−</button>
            <button onclick="change('${f.name}', 1)">+</button>
            <button class="price-btn" onclick="editPrice('${f.name}')">Edit ₹</button>
          </div>` : ""}
      `;
      list.appendChild(card);
    });
}

search.addEventListener("input", () => showFruits(search.value));
showFruits();