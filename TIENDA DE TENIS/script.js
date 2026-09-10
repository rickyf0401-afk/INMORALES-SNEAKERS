const products = [
  // ===== PRODUCTO 1 =====
  {
    id: 1,
    brand: "Alexander McQueen",
    name: "Oversized Sneaker",
    price: 1539,
    discount: 35,
    sizes: ["25", "26", "27", "28"],
    image: "imagenes/mcqueen.jpg"
  },
  // ===== PRODUCTO 2 =====
  {
    id: 2,
    brand: "Adidas",
    name: "Ozelia",
    price: 1667,
    discount: 40,
    sizes: ["25", "26", "27", "28"],
    image: "imagenes/ozelia.jpg"
  },
  // ===== PRODUCTO 3 =====
  {
    id: 3,
    brand: "Adidas",
    name: "Response CL",
    price: 1539,
    discount: 35,
    sizes: ["25", "26", "27", "28"],
    image: "imagenes/response-cl.jpg"
  },
  // ===== PRODUCTO 4 =====
  {
    id: 4,
    brand: "New Balance",
    name: "9060",
    price: 1667,
    discount: 40,
    sizes: ["25", "26", "27", "28"],
    image: "imagenes/nb-9060.jpg"
  },
  // ===== PRODUCTO 5 =====
  {
    id: 5,
    brand: "Nike",
    name: "Blazer Mid '77 Vintage",
    price: 1539,
    discount: 35,
    sizes: ["25", "26", "27", "28"],
    image: "imagenes/blazer-mid-77.jpg"
  },
  // ===== PRODUCTO 6 =====
  {
    id: 6,
    brand: "Nike",
    name: "Air Max 270",
    price: 1667,
    discount: 40,
    sizes: ["25", "26", "27", "28"],
    image: "imagenes/air-max-270.jpg"
  },
  // ===== PRODUCTO 7 =====
  {
    id: 7,
    brand: "Nike",
    name: "Air Max 720",
    price: 1667,
    discount: 40,
    sizes: ["25", "26", "27", "28"],
    image: "imagenes/air-max-720.jpg"
  },
  // ===== PRODUCTO 8 =====
  {
    id: 8,
    brand: "On Running",
    name: "Cloudtilt (CloudTec Phase)",
    price: 1539,
    discount: 35,
    sizes: ["25", "26", "27", "28"],
    image: "imagenes/cloudtilt.jpg"
  },
  // ===== PRODUCTO 9 =====
  {
    id: 9,
    brand: "Jordan",
    name: "Air Jordan 1 High",
    price: 1539,
    discount: 35,
    sizes: ["25", "26", "27", "28"],
    image: "imagenes/jordan-1-high.jpg"
  },
  // ===== PRODUCTO 10 =====
  {
    id: 10,
    brand: "Nike",
    name: "P-6000",
    price: 1667,
    discount: 40,
    sizes: ["25", "26", "27", "28"],
    image: "imagenes/p-6000.jpg"
  },
  // ===== PRODUCTO 11 =====
  {
    id: 11,
    brand: "Nike",
    name: "Runner Retro Blanco/Plateado",
    price: 1539,
    discount: 35,
    sizes: ["25", "26", "27", "28"],
    image: "imagenes/runner-retro.jpg"
  }
];
let filter = "Todos";
let cart = [];
const money = n =>
  n.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  });
function finalPrice(product) {
  if (!product.discount) {
    return product.price;
  }
  return Math.round(
    product.price * (1 - product.discount / 100)
  );
}
function renderProducts() {
  const searchInput =
    document.getElementById("search");
  const query = searchInput
    ? searchInput.value.toLowerCase()
    : "";
  const list = products.filter(product =>
    (filter === "Todos" || product.brand === filter) &&
    product.name.toLowerCase().includes(query)
  );
  const container =
    document.getElementById("products");
  if (!list.length) {
    container.innerHTML = `
      <p style="grid-column:1/-1;text-align:center;padding:40px;">
        No encontramos ese modelo.
      </p>
    `;
    return;
  }
  container.innerHTML = list.map(product => {
    const price = finalPrice(product);
    const imageHTML = product.image
      ? `<img src="${product.image}" alt="${product.name}">`
      : `<div class="no-image">FOTO DEL TENIS</div>`;
    const priceHTML = product.discount
      ? `
        <div class="discount">
          -${product.discount}%
        </div>
        <div class="old-price">
          ${money(product.price)}
        </div>
        <div class="price">
          ${money(price)}
        </div>
      `
      : `
        <div class="price">
          ${money(product.price)}
        </div>
      `;
    return `
      <article class="product">
        <div class="product-img">
          ${imageHTML}
        </div>
        <div class="info">
          <div class="brand">
            ${product.brand}
          </div>
          <div class="name">
            ${product.name}
          </div>
          ${priceHTML}
          <div class="sizes">
            ${product.sizes.map(size => `
              <button
                class="size"
                onclick="selectSize(this)"
              >
                ${size}
              </button>
            `).join("")}
          </div>
          <button
            class="add"
            onclick="addToCart(${product.id}, this)"
          >
            Agregar al carrito
          </button>
        </div>
      </article>
    `;
  }).join("");
}
function selectSize(button) {
  const buttons =
    button.parentElement.querySelectorAll(".size");
  buttons.forEach(btn =>
    btn.classList.remove("selected")
  );
  button.classList.add("selected");
}
function setFilter(category, button) {
  filter = category;
  document.querySelectorAll(".filter").forEach(btn =>
    btn.classList.remove("active")
  );
  button.classList.add("active");
  renderProducts();
}
function addToCart(id, button) {
  const card =
    button.closest(".product");
  const selectedSize =
    card.querySelector(".size.selected");
  if (!selectedSize) {
    alert("Selecciona una talla primero.");
    return;
  }
  const product =
    products.find(item => item.id === id);
  const size =
    selectedSize.textContent.trim();
  const key =
    id + "-" + size;
  const existingItem =
    cart.find(item => item.key === key);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({
      key: key,
      id: id,
      size: size,
      qty: 1
    });
  }
  updateCart();
  openCart();
}
function updateCart() {
  const count =
    cart.reduce(
      (total, item) => total + item.qty,
      0
    );
  document.getElementById("cartCount").textContent =
    count;
  const cartItems =
    document.getElementById("cartItems");
  if (!cart.length) {
    cartItems.innerHTML =
      "<p style='color:#888'>Tu carrito está vacío.</p>";
    document.getElementById("cartTotal").textContent =
      money(0);
    return;
  }
  cartItems.innerHTML =
    cart.map((item, index) => {
      const product =
        products.find(p => p.id === item.id);
      const price =
        finalPrice(product);
      return `
        <div class="cart-item">
          <div class="thumb">
            TENIS
          </div>
          <div class="cart-item-info">
            <b>
              ${product.name}
            </b>
            <br>
            <small>
              Talla ${item.size} ·
              ${item.qty} pieza(s)
            </small>
            <br>
            <strong>
              ${money(price * item.qty)}
            </strong>
            ${
              product.discount
                ? `
                  <br>
                  <small>
                    Precio con
                    ${product.discount}% de descuento
                  </small>
                `
                : ""
            }
            <br>
            <button
              class="remove"
              onclick="removeItem(${index})"
            >
              Eliminar
            </button>
          </div>
        </div>
      `;
    }).join("");
  const total =
    cart.reduce((sum, item) => {
      const product =
        products.find(p => p.id === item.id);
      return sum +
        finalPrice(product) * item.qty;
    }, 0);
  document.getElementById("cartTotal").textContent =
    money(total);
}
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}
function openCart() {
  document
    .getElementById("cart")
    .classList.add("open");
  document
    .getElementById("overlay")
    .classList.add("open");
}
function closeCart() {
  document
    .getElementById("cart")
    .classList.remove("open");
  document
    .getElementById("overlay")
    .classList.remove("open");
}
function checkout() {
  if (!cart.length) {
    alert("Agrega al menos un par.");
    return;
  }
  const lines =
    cart.map(item => {
      const product =
        products.find(p => p.id === item.id);
      const price =
        finalPrice(product);
      return (
        `${product.name} - ` +
        `talla ${item.size} - ` +
        `${item.qty} pieza(s) - ` +
        `${money(price * item.qty)}`
      );
    }).join("\n");
  const total =
    cart.reduce((sum, item) => {
      const product =
        products.find(p => p.id === item.id);
      return sum +
        finalPrice(product) * item.qty;
    }, 0);
  const phone =
    "527292455835";
  const message =
    "Hola, quiero hacer este pedido:\n\n" +
    lines +
    "\n\nTotal: " +
    money(total);
  const url =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
renderProducts();
updateCart();