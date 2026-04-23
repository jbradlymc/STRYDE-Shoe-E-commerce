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

const featuredIds = [1, 2, 3]; //featured products

const saleItems = {
    4: 1000,  
    5: 2000, 
};

function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    products.forEach(product => {

        let badgeHTML = '';
        if (saleItems[product.id] !== undefined) {
            badgeHTML = '<span class="badge badge-sale">SALE</span>';
        } else if (featuredIds.includes(product.id)) {
            badgeHTML = '<span class="badge badge-featured">FEATURED</span>';
        }

        let priceHTML = '';
        if (saleItems[product.id] !== undefined) {
            priceHTML = `
                <span class="card-price">
                    <span class="price-original">₱${Number(product.price).toLocaleString()}</span>
                    <span class="price-sale">₱${Number(saleItems[product.id]).toLocaleString()}</span>
                </span>
            `;
        } else {
            priceHTML = `<span class="card-price">₱${Number(product.price).toLocaleString()}</span>`;
        }

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-wrap">
                <img src="${product.image}" alt="${product.name}" class="shoe-img">
                ${badgeHTML}
            </div>
            <div class="card-body">
                <span class="card-name">${product.name}</span>
                ${priceHTML}
                <span class="card-colors">Colors: ${product.colors.join(', ')}</span>
                <button class="btn-view" onclick="openProduct(${product.id}, productsData)">View Product</button>
                <button class="btn-cart" onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});
