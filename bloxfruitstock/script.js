// ===== SETTINGS: change these =====
const INSTAGRAM_USERNAME = "bloxythetrader"; // without the @
const DM_LINK = "https://ig.me/m/" + INSTAGRAM_USERNAME;

// ===== STOCK LIST: edit name, price, stock, or image here =====
const fruits = [
    { name: "Dragon[physical]", price: 899, stock: 0, image: "images/dragon.png" },  
  { name: "Kitsune[physical]",  price: 499,  stock: 1, image: "images/kitsune.png"  },
  { name: "Control[physical]",  price: 149,  stock: 1, image: "images/controls.png"  },
  { name: "Tiger[physical]",  price: 119, stock: 1, image: "images/tiger.png"  },
  { name: "Yeti[physical]",   price: 109, stock: 1, image: "images/yeti.png"   },
  { name: "Gas[physical]",  price: 79,  stock: 1, image: "images/gass.png"  }, 
  { name: "Lightning[physical]",  price: 65,  stock: 1, image: "images/lightning.png"  },
  { name: "Dough[physical]",  price: 59,  stock: 1, image: "images/dough.png"  },
  { name: "Venom[physical]",  price: 40,  stock: 1, image: "images/venom.png"  },
  { name: "Portal[physical]", price: 20,  stock: 1, image: "images/portal.png" },
  { name: "Buddha[physical]", price: 20,  stock: 1, image: "images/buddhaa.png" },
  { name: "Gravity[physical]",  price: 20,  stock: 1, image: "images/gravity.png"  },
  { name: "Blizzard[physical]",  price: 10,  stock: 1, image: "images/blizzards.png"  }
    
];

const container = document.getElementById("fruit-container");
const searchBox = document.getElementById("search");
const openBtn = document.getElementById("open-ig");

if (openBtn) {
    openBtn.href = DM_LINK;
}

function showFruits(list) {
    container.innerHTML = "";

    list.forEach(function (fruit) {
        const inStock = fruit.stock > 0;
        const card = document.createElement("div");
        card.className = "fruit-card";

        card.innerHTML = `
            <img src="${fruit.image}" alt="${fruit.name}">
            <h3>${fruit.name}</h3>
            <p class="price">₹${fruit.price}</p>
            <span class="stock ${inStock ? "" : "out"}">
                ${inStock ? "In Stock x" + fruit.stock : "Out of Stock"}
            </span>
            ${inStock ? `<a class="buy-btn" href="${DM_LINK}" target="_blank" rel="noopener">Buy via Instagram DM</a>` : ""}
        `;

        container.appendChild(card);
    });
}

searchBox.addEventListener("input", function () {
    const text = searchBox.value.toLowerCase();
    const filtered = fruits.filter(function (fruit) {
        return fruit.name.toLowerCase().includes(text);
    });
    showFruits(filtered);
});

showFruits(fruits);
