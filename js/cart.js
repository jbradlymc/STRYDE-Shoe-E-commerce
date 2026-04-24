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
            <button class="cart-modal-checkout" id="cart-checkout-btn")>Checkout</button>
        </div>
    `;
    document.body.appendChild(backdrop);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/cart.css';
    document.head.appendChild(link);

    document.getElementById('cart-close-btn').addEventListener('click', closeCart);
    
    document.getElementById('cart-checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        const confirmed = confirm(
            `Order Summary\n` +
            `─────────────────────\n` +
            cart.map(item => `${item.name} x${item.quantity} — ₱${(item.price * item.quantity).toLocaleString()}`).join('\n') +
            `\n─────────────────────\n` +
            `Total: ₱${total.toLocaleString()}\n` +
            `\nConfirm your order?`
        );

        if (confirmed) {
            alert(`✅ Order placed! Thank you for shopping at STRYDE.\nTotal paid: ₱${total.toLocaleString()}`);
            cart = [];
            updateCartCount();
            closeCart();
            location.reload();
        }
    });

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

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = `Number of items in the cart: ${totalItems}`;

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
        container.innerHTML = cart.map(item => {
            const priceHTML = item.originalPrice
                ? `<span class="cart-item-price">
                    <span class="cart-price-original">₱${item.originalPrice.toLocaleString()}</span>
                    <span class="cart-price-sale">₱${item.price.toLocaleString()}</span>
                </span>`
                : `<span class="cart-item-price">₱${item.price.toLocaleString()}</span>`;

            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <span class="cart-item-name">Item: ${item.name}</span>
                        ${priceHTML}
                        <span class="cart-item-qty">Qty: ${item.quantity}</span>
                    </div>
                </div>
            `;
        }).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalEl.textContent    = '₱' + total.toLocaleString();
        totalRow.style.display = 'flex';
        divider.style.display  = 'block';
    }
}

// ── ADD TO CART ────────────────────────────
function addToCart(name, price, image, originalPrice = null) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price: Number(price), image, quantity: 1, originalPrice: originalPrice ? Number(originalPrice) : null });
    }

    updateCartCount();
    alert(name + ' added to cart');
}

// ── UPDATE BADGE ───────────────────────────
function updateCartCount() {
    const badge = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (badge) badge.textContent = totalItems;
}

// ── INIT ON LOAD ───────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    initCartModal();
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) cartBtn.addEventListener('click', openCart);
});
