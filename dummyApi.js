const productsGrid = document.getElementById('productsGrid')
const navBar = document.getElementById('navBar');
const footer =document.getElementById('footer')
const cartCount = document.getElementById('cartCount')

const cart = JSON.parse(localStorage.getItem("cart")) || [];      
updateCartCount()
// cartCount.textContent = cart.length;
let products = [];//This is a global scope variable 
console.log(products)
async function fetchProducts() {
    try {
        let response = await fetch('https://dummyjson.com/products')
        console.log(response)
        if(!response.ok) {
            throw new Error("Fail to create display products")
        }
        let productData = await response.json();
        console.log(productData)
        products = productData.products;
        console.log(typeof products)
        console.log(products)
        console.log(productData.products)
        productData.products.forEach((product) => {
            console.log(product)
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
                    console.log(event.target);
                    const productId = Number(event.target.dataset.id);
                    console.log(productId)
                    const selectedProduct = products.find((item) => {
                        console.log(item)
                        console.log(item.id)
                        return item.id === productId;
                    });
                    // selectedProduct.quantity = 1;
                    console.log(selectedProduct)
                    const newProduct = {
                        ...selectedProduct,
                        quantity: 1
                    };
                    const productExist = cart.find((item) => {
                        console.log(item)
                        console.log(item.id)
                        return item.id === productId;
                    });
                    console.log(productExist)
                    if(productExist) {
                        productExist.quantity++;
                    }else {
                        // selectedProduct.quantity = 1;
                        cart.push(newProduct);
                    }
                    
                    
                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCartCount()
                    // cartCount.textContent = cart.length;
                    console.log(cart);
                });

                productsGrid.appendChild(productsCard)
        });

        console.log(products)

    } catch (error) {
        productsGrid.classList.remove("grid");
        productsGrid.classList.add("error-page");
        navBar.style.display = 'none'
        footer.style.display = 'none'
        let response = await fetch('404.html')
        let errorPage = await response.text()
        console.log(errorPage)
        productsGrid.innerHTML = errorPage;
    }

}
function updateCartCount() {
    // cartCount.textContent = cart.length;
    cartCount.textContent = cart.reduce((acc, curr) => acc + curr.quantity, 0); 
}

fetchProducts()

