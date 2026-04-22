const slides = document.querySelectorAll('.slide-content');
let currentSlide = 0;
let autoSlideTimer;

function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    // hide all slides, show current
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);

    // reset auto-advance timer on manual click
    clearInterval(autoSlideTimer);
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
}

// attach arrow button events
document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.next').addEventListener('click', () => changeSlide(1));

// initialize first slide + auto-advance
showSlide(currentSlide);
startAutoSlide();

let cart = [];

// Update the cart count badge in the nav
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Add item to cart
function addToCart(name, price, imgSrc) {
    cart.push({ name, price, imgSrc });
    updateCartCount();
    alert(name + ' added to cart');
}

// Build and show the cart modal
function openCart() {
    // remove existing modal if any
    const existing = document.getElementById('cart-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'cart-modal';
    modal.innerHTML = buildCartHTML();
    document.body.appendChild(modal);

    // close on backdrop click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeCart();
    });
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.remove();
}

function buildCartHTML() {
    let itemsHTML = '';

    if (cart.length === 0) {
        // Empty cart state
        itemsHTML = '';
    } else {
        // Cart with items 
        itemsHTML = '<div class="cart-items">';
        cart.forEach(item => {
            itemsHTML += `
                <div class="cart-item">
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <div class="cart-item-info">
                        <span class="cart-item-name">Item: ${item.name}</span>
                        <span class="cart-item-price">Price: ${item.price}</span>
                    </div>
                </div>
            `;
        });
        itemsHTML += '</div>';
    }

    return `
        <div class="cart-modal-backdrop">
            <div class="cart-modal-box">
                <button class="cart-modal-close" onclick="closeCart()">&#10005;</button>
                <h2 class="cart-modal-title">Cart</h2>
                <p class="cart-modal-count">Number of items in the cart: ${cart.length}</p>
                ${itemsHTML}
                <button class="cart-modal-checkout" onclick="alert('Checkout coming soon!')">Checkout</button>
            </div>
        </div>
    `;
}

// Hook up cart button in nav
document.querySelector('.cart-btn').onclick = openCart;

// Hook up all "Add to Cart" buttons on product cards
document.querySelectorAll('.card').forEach(card => {
    const addBtn = card.querySelectorAll('.btn-order')[1]; // second button = Add to Cart
    const name   = card.querySelector('.card-name').textContent;
    const price  = card.querySelector('.card-price').textContent;
    const imgSrc = card.querySelector('.shoe-img').src;

    addBtn.addEventListener('click', () => addToCart(name, price, imgSrc));
});

const cartStyles = document.createElement('style');
cartStyles.textContent = `
    .cart-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .cart-modal-box {
        background: #ffffff;
        border-radius: 12px;
        padding: 32px;
        width: 100%;
        max-width: 700px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
    }

    .cart-modal-close {
        position: absolute;
        top: 16px;
        right: 20px;
        background: none;
        border: none;
        font-size: 1.2rem;
        color: #aaa;
        cursor: pointer;
    }

    .cart-modal-close:hover { color: #333; }

    .cart-modal-title {
        font-family: 'Segoe UI', sans-serif;
        font-size: 1.2rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 8px;
    }

    .cart-modal-count {
        font-size: 0.88rem;
        color: #444;
        margin-bottom: 24px;
    }

    .cart-items {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 24px;
    }

    .cart-item {
        border: 1px solid #e0e4f0;
        border-radius: 10px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: calc(50% - 8px);
        text-align: center;
    }

    .cart-item img {
        width: 100%;
        max-height: 140px;
        object-fit: contain;
        border-radius: 6px;
    }

    .cart-item-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .cart-item-name {
        font-size: 0.82rem;
        font-weight: 600;
        color: #1a1a1a;
    }

    .cart-item-price {
        font-size: 0.82rem;
        color: #555;
    }

    .cart-modal-checkout {
        background: #005bea;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        padding: 11px 28px;
        font-size: 0.9rem;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s;
    }

    .cart-modal-checkout:hover { background: #0d1b3e; }

    @media (max-width: 480px) {
        .cart-item { width: 100%; }
        .cart-modal-box { padding: 24px 18px; }
    }
`;
document.head.appendChild(cartStyles);