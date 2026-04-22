// ── SLIDESHOW ──────────────────────
const slides = document.querySelectorAll('.slide-content');
let currentSlide = 0;
let autoSlideTimer;

function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
    clearInterval(autoSlideTimer);
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 4000);
}

document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.next').addEventListener('click', () => changeSlide(1));

showSlide(currentSlide);
startAutoSlide();

// ── LOAD & RENDER PRODUCTS ─────────
let productsData = [];

fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
        productsData = data.products;
        renderProducts(productsData);
    })
    .catch(err => {
        console.error('Failed to load products:', err);
        document.getElementById('products-grid').innerHTML =
            '<p style="color:red;">Failed to load products. Make sure products.json exists.</p>';
    });

function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-wrap">
                <img src="${product.image}" alt="${product.name}" class="shoe-img">
            </div>
            <div class="card-body">
                <span class="card-name">${product.name}</span>
                <span class="card-price">₱${Number(product.price).toLocaleString()}</span>
                <span class="card-colors">Colors: ${product.colors.join(', ')}</span>
                <button class="btn-view" onclick="openProduct(${product.id}, productsData)">View Product</button>
                <button class="btn-cart" onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}
