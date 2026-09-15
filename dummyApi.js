const productsGrid = document.getElementById('productsGrid');
const navBar = document.getElementById('navBar');
const footer = document.getElementById('footer');
const cartCount = document.getElementById('cartCount');
const resultsCount = document.getElementById('resultsCount');
const loader = document.getElementById('loader');
const loadingText = document.getElementById('loadingText');
const shopToolbar = document.getElementById('shopToolbar')
const modeControl = document.querySelector('.mode-control')
const modeIcon = modeControl.querySelector('i')

const savedTheme = localStorage.getItem('darkMode')
if(savedTheme === "dark") {
    document.body.classList.add('dark')
}

function updateThemeIcon() {
    const isDarkMode = document.body.classList.contains('dark')
    modeIcon.classList.toggle('fa-moon', !isDarkMode)
    modeIcon.classList.toggle('fa-sun', isDarkMode)
}

modeControl.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    localStorage.setItem(
        'darkMode',
        document.body.classList.contains('dark') ? 'dark' : 'white'
    )
    updateThemeIcon()
})

updateThemeIcon()

const cart = JSON.parse(localStorage.getItem("cart")) || [];    
if(cart.length === 0) {
    cartCount.style.display = 'none'
}  
updateCartCount()

let products = []; //This is a global scope variable 
// console.log(products)
async function fetchProducts() {
    try {
        loader.style.display = 'flex'
        loadingText.classList.add('show')
        footer.style.display = 'none'
        let response = await fetch('https://dummyjson.com/products')
        console.log(response)
        if(!response.ok) {
            throw new Error("Fail to load product")
        }else {
            loader.style.display = 'none'
            loadingText.classList.remove('show')
            footer.style.display = 'block'
        }
        let productData = await response.json();
        // console.log(productData)
        products = productData.products;
        resultsCount.textContent = `${products.length} products`;
        // console.log(typeof products)
        // console.log(products)
        // console.log(productData.products)
        products.forEach((product) => {
            // console.log(product)
            const productsCard = document.createElement('div')
            productsCard.classList.add("product-card") 
            const safeDescription = product.description.replace(/"/g, '&quot;').replace(/\n/g, ' ')
            productsCard.innerHTML = `
                <div class="image-box">
                    <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
                </div>
                <p class="category">${product.category}</p>

                <h3 class="product-title">${product.title}</h3>

                <p class="product-description" title="${safeDescription}">${product.description.slice(0, 60)}...</p>

                <div class="price-box">
                    <span class="new-price">$${product.price}</span>
                </div>

                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                `;

                const addToCartBtn = productsCard.querySelector(".add-to-cart");
                addToCartBtn.addEventListener("click", (event) => {
                    // console.log(event.target);
                    const productId = Number(event.target.dataset.id);
                    // console.log(productId)
                    const selectedProduct = products.find((item) => {
                        // console.log(item)
                        // console.log(item.id)
                        return item.id === productId;
                    });
                    // console.log(selectedProduct)
                    const newProduct = {
                        ...selectedProduct,
                        quantity: 1
                    };
                    // console.log(newProduct);
                    const productExist = cart.find((item) => {
                        // console.log(item)
                        // console.log(item.id)
                        return item.id === productId;
                    });
                    // console.log(productExist)
                    if(productExist) {
                        productExist.quantity++;
                    }else {
                        // selectedProduct.quantity = 1;
                        cart.push(newProduct);
                    }
                     
                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCartCount()
                    // cartCount.textContent = cart.length;
                    // console.log(cart);
                });

                productsGrid.appendChild(productsCard)
        });

        console.log(products)

    } catch (error) {
        loader.style.display = 'none'
        loadingText.classList.remove('show')
        productsGrid.classList.remove("grid");
        productsGrid.classList.add("error-page");
        navBar.style.display = 'none'
        shopToolbar.style.display = 'none'
        footer.style.display = 'none'
        let response = await fetch('404.html')
        // console.log(response)
        let errorPage = await response.text()
        // console.log(errorPage)
        productsGrid.innerHTML = errorPage;
        // console.log(productsGrid)
        const reloadBtn = document.getElementById("reloadBtn");
        reloadBtn.addEventListener("click", () => {
            location.reload();
        });
    }

}

function updateCartCount() {
    // cartCount.textContent = cart.length;
    cartCount.textContent = cart.reduce((acc, curr) => acc + curr.quantity, 0); 
    
}


fetchProducts()