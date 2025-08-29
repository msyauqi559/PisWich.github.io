// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        feather.icons.sun.toSvg().then(svg => {
            icon.outerHTML = svg;
        });
    } else {
        feather.icons.moon.toSvg().then(svg => {
            icon.outerHTML = svg;
        });
    }
}

// Menu Data
const menuItems = [
    {
        id: 1,
        name: "Banana Chocolate Dream",
        price: 15000,
        category: "classic",
        image: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Perpaduan sempurna pisang segar dengan coklat leleh premium"
    },
    {
        id: 2,
        name: "Banana Cheese Delight",
        price: 18000,
        category: "classic",
        image: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Pisang dengan keju mozzarella yang meleleh sempurna"
    },
    {
        id: 3,
        name: "Banana Nutella Heaven",
        price: 20000,
        category: "premium",
        image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Kombinasi pisang dengan Nutella dan kacang hazelnut"
    },
    {
        id: 4,
        name: "Banana Honey Bliss",
        price: 16000,
        category: "classic",
        image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Pisang segar dengan madu alami dan kayu manis"
    },
    {
        id: 5,
        name: "Banana Strawberry Fusion",
        price: 22000,
        category: "premium",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Pisang dengan stroberi segar dan whipped cream"
    },
    {
        id: 6,
        name: "Banana Special Supreme",
        price: 25000,
        category: "special",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Kombinasi premium pisang dengan semua topping spesial"
    }
];

// Render Menu Items
function renderMenuItems(items) {
    const menuGrid = document.querySelector('.menu-grid');
    menuGrid.innerHTML = '';
    
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.setAttribute('data-category', item.category);
        
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="menu-item-img">
            <div class="menu-item-content">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-desc">${item.description}</p>
                <div class="menu-item-price">Rp ${item.price.toLocaleString()}</div>
                <button class="add-to-cart-btn" data-id="${item.id}">
                    <i data-feather="shopping-cart"></i>
                    Tambah ke Keranjang
                </button>
            </div>
        `;
        
        menuGrid.appendChild(menuItem);
    });
    
    feather.replace();
}

// Filter Menu
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        let filteredItems;
        
        if (filter === 'all') {
            filteredItems = menuItems;
        } else {
            filteredItems = menuItems.filter(item => item.category === filter);
        }
        
        renderMenuItems(filteredItems);
    });
});

// Cart Functionality
let cart = [];
const cartCount = document.querySelector('.cart-count');

function updateCartCount() {
    cartCount.textContent = cart.length;
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const itemId = parseInt(e.target.getAttribute('data-id'));
        const item = menuItems.find(menuItem => menuItem.id === itemId);
        
        if (item) {
            cart.push(item);
            updateCartCount();
            
            // Show notification
            showNotification(`${item.name} ditambahkan ke keranjang!`);
        }
    }
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Number Counter Animation
function animateNumberCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                setTimeout(updateCount, 16);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCount();
    });
}

// Image Gallery Rotation
function rotateGalleryImages() {
    const images = document.querySelectorAll('.gallery-img');
    let currentIndex = 0;
    
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 3000);
}

// Form Submission
const contactForm = document.getElementById('message-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
        contactForm.reset();
    });
}

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Terima kasih telah berlangganan newsletter kami!');
        newsletterForm.reset();
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Render initial menu
    renderMenuItems(menuItems);
    
    // Initialize animations
    animateNumberCounters();
    rotateGalleryImages();
    
    // Update feather icons
    feather.replace();
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.story-card, .menu-item, .contact-item').forEach(el => {
    observer.observe(el);
});