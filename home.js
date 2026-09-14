const modeControl = document.querySelector('.mode-control');
const productsGrid = document.getElementById('productsGrid')
const cartCount = document.getElementById('cartCount')

if(localStorage.getItem('darkMode') === 'dark') {
    document.body.classList.add('dark');
}

modeControl.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if(document.body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'dark'); 
    } else {
        localStorage.setItem('darkMode', 'white');
    }
});

const savedCart = JSON.parse(localStorage.getItem("cart")) || []
updateCartCount()
console.log(savedCart)
function updateCartCount() {
    cartCount.textContent = savedCart.reduce((acc, curr) => acc + curr.quantity, 0)
}

async function homeProducts() {
    try {
        
    } catch (error) {
        
    }}