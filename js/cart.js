/* Cart Modal */

// ── STATE ──────────────────────────────────
let cart = [];

// ── INJECT CART MODAL HTML INTO PAGE ───────
function initCartModal() {
    const backdrop = document.createElement('div');
    backdrop.id = 'cart-modal-backdrop';
    backdrop.className = 'cart-modal-backdrop hidden';
    backdrop.innerHTML = `
        <div class="cart-modal-box" id="cart-modal-box">
            <button class="cart-modal-close" id="cart-close-btn">&#10005;</button>
            <h2 class="cart-modal-title">Cart</h2>
            <p class="cart-modal-count" id="cart-modal-count">Number of items in the cart: 0</p>
            <div class="cart-items" id="cart-items-container"></div>
            <hr class="cart-divider" id="cart-divider" style="display:none;">
            <div class="cart-total" id="cart-total-row" style="display:none;">
                <span class="cart-total-label">Total</span>
                <span class="cart-total-amount" id="cart-total-amount">₱0</span>
            </div>
            <button class="cart-modal-checkout" id="cart-checkout-btn">Checkout</button>
        </div>
    `;
    document.body.appendChild(backdrop);

    // Load cart.css dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/cart.css';
    document.head.appendChild(link);

    // Events
    document.getElementById('cart-close-btn').addEventListener('click', closeCart);
    document.getElementById('cart-checkout-btn').addEventListener('click', () => {
        alert('Checkout coming soon!');
    });

    // Close on backdrop click
    backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) closeCart();
    });
}

// ── OPEN CART ──────────────────────────────
function openCart() {
    renderCartItems();
    document.getElementById('cart-modal-backdrop').classList.remove('hidden');
}

// ── CLOSE CART ─────────────────────────────
function closeCart() {
    document.getElementById('cart-modal-backdrop').classList.add('hidden');
}

// ── RENDER CART ITEMS ──────────────────────
function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const countEl   = document.getElementById('cart-modal-count');
    const totalEl   = document.getElementById('cart-total-amount');
    const totalRow  = document.getElementById('cart-total-row');
    const divider   = document.getElementById('cart-divider');

    countEl.textContent = `Number of items in the cart: ${cart.length}`;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty-msg">
                <span>🛒</span>
                No items in the cart yet.
            </div>
        `;
        totalRow.style.display = 'none';
        divider.style.display  = 'none';
    } else {
        // Build items HTML
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <span class="cart-item-name">Item: ${item.name}</span>
                    <span class="cart-item-price">Price: ₱${item.price.toLocaleString()}</span>
                </div>
            </div>
        `).join('');

        // Calculate and show total
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalEl.textContent    = '₱' + total.toLocaleString();
        totalRow.style.display = 'flex';
        divider.style.display  = 'block';
    }
}

// ── ADD TO CART ────────────────────────────
function addToCart(name, price, image) {
    cart.push({ name, price: Number(price), image });
    updateCartCount();
    alert(name + ' added to cart');
}

// ── UPDATE CART COUNT ───────────────────────────
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', function () {
    initCartModal();

    // Hook cart button in nav
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) cartBtn.addEventListener('click', openCart);
});
