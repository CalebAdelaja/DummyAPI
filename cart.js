const cartContainer = document.getElementById('cartContainer')
const totalPrice = document.getElementById("totalPrice");
const cartCount = document.getElementById('cartCount');
const modeControl = document.querySelector('.mode-control');

const savedTheme = localStorage.getItem('darkMode')
if(savedTheme === "dark") {
    document.body.classList.add('dark')
}

modeControl.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem(
        'darkMode',
        document.body.classList.contains('dark') ? 'dark' : 'white'
    );
});

const carts = JSON.parse(localStorage.getItem("cart")) || []
function displayCart() {
    cartContainer.innerHTML = "";
    if(carts.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty 🛒</h2>
                <p>Add some products first.</p>
            </div>
        `;

        totalPrice.innerHTML = `<h3> Total Price: - </h3>`

        return;
    }else {
        carts.forEach((cart) => {
            console.log(cart)
            console.log(carts.length)
            const cartCard = document.createElement('div')
            cartCard.classList.add('product-card');

            function getCartCount() {
                const cartCount = carts
                return cartCount.reduce((acc, curr) => acc + curr.quantity, 0)
            }
            
            cartCount.innerHTML = getCartCount()

            cartCard.innerHTML = `
            <img src="${cart.thumbnail}" alt="${cart.title}">
            <div class="product-info">
                <h3>${cart.title}</h3>
                <p class="price">Price: $${cart.price}</p>

                <div class="quantity-box"> 
                    <button class="plus-btn" data-id="${cart.id}">+</button>

                    <div class="quantity">
                        <p>Quantity: <span>${cart.quantity}</span> </p>
                    </div>

                    <button class="minus-btn" data-id="${cart.id}">-</button>
                </div>

                <button class="remove-btn" data-id="${cart.id}">
                    Remove
                </button>
            </div>    
            `
            cartContainer.appendChild(cartCard)
        })
    }

    const plusBtn = document.querySelectorAll('.plus-btn')
    const minusBtn = document.querySelectorAll('.minus-btn')

    plusBtn.forEach((button) => {
        button.addEventListener("click", (event) => {
            // console.log(event.target)
            const productId = Number(event.target.dataset.id)
            // console.log(productId)
            const cartItem = carts.find((item) => item.id === productId)
            // console.log(cartItem)
            if(cartItem) {
                cartItem.quantity++;
                localStorage.setItem("cart", JSON.stringify(carts));
                displayCart()
            }
        })
    })
    
    minusBtn.forEach((button) => {
        button.addEventListener("click", (event) => {
            // console.log(event.target)
            const productId = Number(event.target.dataset.id)
            // console.log(productId)
            const cartItem = carts.find((item) => item.id === productId)
            if(cartItem && cartItem.quantity > 1) {
                cartItem.quantity--;
                localStorage.setItem("cart", JSON.stringify(carts));
                displayCart()
            }
        })
    })
    


    const removeCartbtn = document.querySelectorAll('.remove-btn')
    removeCartbtn.forEach((button) =>{
        button.addEventListener("click", (event) => {
            // console.log(event.target)
            const productId = Number(event.target.dataset.id)
            // console.log(productId)//
            const cartIndex = carts.findIndex((item) => {
                // console.log(item)
                // console.log(item.id)// 1 
                return item.id === productId;
            })
            //console.log(cartIndex)// How can this is 0 the output? I return the index of the position of the item in the array
            carts.splice(cartIndex, 1);
            // console.log(carts)
            // console.log(cartIndex)
            localStorage.setItem("cart", JSON.stringify(carts));
            displayCart()
        })
    })

    function updateTotalPrice(){
        const total = carts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        // console.log(total);
        totalPrice.innerHTML = `<h3>Total Price - $${total.toFixed(2)}</h3>`
    }
    updateTotalPrice()
    
}

displayCart()