const productsGrid = document.getElementById('productsGrid')
const navBar = document.getElementById('navBar');

async function fetchProducts() {
    try {
        let response = await fetch('https://dummyjson.com/products')
        console.log(response)
        if(!response.ok) {
            throw new Error("Fail to create display products")
        }
        let productData = await response.json();
        console.log(productData)
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

                <button>Add to Cart</button>
                `
                productsGrid.appendChild(productsCard)
        });

    } catch (error) {
        productsGrid.classList.remove("grid");
        productsGrid.classList.add("error-page");
        navBar.style.display = 'none'
        let response = await fetch('404.html')
        let errorPage = await response.text()
        console.log(errorPage)
        productsGrid.innerHTML = errorPage;
    }
}

fetchProducts()
