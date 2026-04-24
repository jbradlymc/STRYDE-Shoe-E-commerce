/* Product Details */

// ── OPEN PRODUCT OVERLAY ───────────────────
function openProduct(productId, productsData) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const overlay = document.getElementById('product-overlay');
    const box     = document.getElementById('product-overlay-box');

    // Load product.css if not already loaded
    if (!document.querySelector('link[href="css/product.css"]')) {
        const link = document.createElement('link');
        link.rel   = 'stylesheet';
        link.href  = 'css/product.css';
        document.head.appendChild(link);
    }

    // Build sizes HTML
    const sizesHTML = product.sizes.map(size => `
        <div class="size-tag" onclick="selectSize(this)">${size}</div>
    `).join('');

    // Build colors HTML
    const colorsHTML = product.colors.map(color => `
        <span class="color-tag">${color}</span>
    `).join('');

    box.innerHTML = `
        <button class="overlay-close" onclick="closeProduct()">&#10005;</button>
        <div class="overlay-body">
            <div class="overlay-img-wrap">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="overlay-details">
                <span class="overlay-category">${product.category}</span>
                <h2 class="overlay-name">${product.name}</h2>
                <p class="overlay-brand">Brand: <span>${product.brand}</span></p>

                ${saleItems[product.id] !== undefined ? `
                    <p class="overlay-price">
                        <span class="overlay-price-original">₱${Number(product.price).toLocaleString()}</span>
                        <span class="overlay-price-sale">₱${Number(saleItems[product.id]).toLocaleString()}</span>
                    </p>
                ` : `
                    <p class="overlay-price">₱${Number(product.price).toLocaleString()}</p>
                `}

                <hr class="overlay-divider">
                <p class="overlay-description">${product.description}</p>
                <div>
                    <p class="overlay-label">Available Colors</p>
                    <div class="overlay-colors">${colorsHTML}</div>
                </div>
                <div>
                    <p class="overlay-label">Select Size</p>
                    <div class="overlay-sizes">${sizesHTML}</div>
                </div>
                <button class="overlay-add-btn" onclick="addToCart('${product.name}', ${saleItems[product.id] 
                    ?? product.price}, '${product.image}', ${saleItems[product.id] 
                    !== undefined ? product.price : null})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    overlay.classList.remove('hidden');

    // Close on backdrop click
    overlay.onclick = function (e) {
        if (e.target === overlay) closeProduct();
    };
}

// ── CLOSE OVERLAY ──────────────────────────
function closeProduct() {
    document.getElementById('product-overlay').classList.add('hidden');
}

// ── SIZE SELECTOR ──────────────────────────
function selectSize(el) {
    // deselect all, select clicked
    const allSizes = document.querySelectorAll('.size-tag');
    allSizes.forEach(s => s.classList.remove('selected'));
    el.classList.add('selected');
}

// Close overlay on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeProduct();
});
