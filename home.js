const modeControl = document.querySelector('.mode-control');
const productsGrid = document.getElementById('productsGrid')
const cartCount = document.getElementById('cartCount')
const modeIcon = modeControl.querySelector('i')

if(localStorage.getItem('darkMode') === 'dark') {
    document.body.classList.add('dark');
}

function updateThemeIcon() {
    const isDarkMode = document.body.classList.contains('dark');
    modeIcon.classList.toggle('fa-moon', !isDarkMode);
    modeIcon.classList.toggle('fa-sun', isDarkMode);
}

modeControl.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if(document.body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'dark'); 
    } else {
        localStorage.setItem('darkMode', 'white');
    }
    updateThemeIcon();
});

updateThemeIcon();

const savedCart = JSON.parse(localStorage.getItem("cart")) || []
if(savedCart.length === 0) {
    cartCount.style.display = 'none'
}
updateCartCount()

function updateCartCount() {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = currentCart.reduce((acc, curr) => acc + curr.quantity, 0)
}

async function homeProducts() {
    try {
        
    } catch (error) {
        
    }
}