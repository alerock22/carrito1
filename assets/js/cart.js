/* Cart */

// #1 Data base

const products = [
    {
        id: 1,
        name: "Apple Ultimate 16Gb",
        price: 300,
        image: "assets/img/Apple.png",
        category: "laptop",
        quantity: 10
    },
    {
        id: 2,
        name: "HP DualCore",
        price: 230,
        image: "assets/img/HP.png",
        category: "laptop",
        quantity: 9
    },
    {
        id: 3,
        name: "Samsung 264Ram",
        price: 285,
        image: "assets/img/Samsung.png",
        category: "laptop",
        quantity: 12
    },
    {
        id: 4,
        name: "Iphone 11 Pro Max",
        price: 98,
        image: "assets/img/11_pro_max.png",
        category: "iphone",
        quantity: 5
    },
    {
        id: 5,
        name: "Iphone 12 Ultimate",
        price: 115,
        image: "assets/img/12_mini-.png",
        category: "iphone",
        quantity: 7
    },
    {
        id: 6,
        name: "Iphone 12 Mini",
        price: 156,
        image: "assets/img/12.png",
        category: "iphone",
        quantity: 5
    },
    {
        id: 7,
        name: "Auriculares bluetooth",
        price: 25,
        image: "assets/img/Auri-Bluet.png",
        category: "headphones",
        quantity: 7
    },
    {
        id: 8,
        name: "Auriculares Gamer",
        price: 35,
        image: "assets/img/Auri-Gamer.png",
        category: "headphones",
        quantity: 8
    },
     {
        id: 9,
        name: "Auriculares c/Cable",
        price: 18,
        image: "assets/img/Auri-Cable.png",
        category: "headphones",
        quantity: 5
    },
   
];

// #2 Print products in the DOM
const productContainer = document.getElementById("products__content")
function printProducts() {
    let html = ""
    for (const product of products) {
        html += `
        <article class="products__card ${product.category}">
            <div class="products__shape">
              <img src="${product.image}" alt="${product.name}" class="products__img">
            </div>

            <div class="products__data">
              <h2 class="products__name">${product.name}</h2>
              <div class="">
                <h3 class="products__price">$${product.price}</h3>
                <span class="products__quantity">Only ${product.quantity} units available</span>
              </div>
              <button type="button" class="button products__button addToCart" data-id="${product.id}">
                <i class="bx bx-plus"></i>
              </button>
            </div>
          </article>
        `;
    }
    productContainer.innerHTML = html
}


printProducts()

// #3 Cart
let cart = []
cartContainer = document.getElementById("cart__container")
const cartCount = document.getElementById("cart-count")
const itemsCount = document.getElementById("items-count")
const cartTotal = document.getElementById("cart-total")

function printCart() {
    let html = ""
    for (const article of cart) {
        const product = products.find(p => p.id === article.id)
        html += `
        <article class="cart__card">
        <div class="cart__box">
          <img src="${product.image}" alt="${product.name}" class="cart__img">
        </div>

        <div class="cart__details">
          <h3 class="cart__title">${product.name} <span class="cart__price">$${product.price}</span></h3>

          <div class="cart__amount">
            <div class="cart__amount-content">
              <span class="cart__amount-box removeToCart" data-id="${product.id}">
                <i class="bx bx-minus"></i>
              </span>

              <span class="cart__amount-number">${article.qty}</span>

              <span class="cart__amount-box addToCart" data-id="${product.id}">
                <i class="bx bx-plus"></i>
              </span>
            </div>

            <i class="bx bx-trash-alt cart__amount-trash deleteToCart" data-id="${product.id}"></i>
          </div>

          <span class="cart__subtotal">
            <span class="cart__stock">Quedan ${product.quantity - article.qty} unidades</span>
            <span class="cart__subtotal-price">${product.price * article.qty}</span>
            </span>
            </div>
            </article>
        `;
    }
    cartContainer.innerHTML = html
    cartCount.innerHTML = totalArticles()
    itemsCount.innerHTML = totalArticles()
    cartTotal.innerHTML = numberToCurrency(totalAmount())
    checkButtons() 
}


printCart()
// #4 Add to cart
function addToCart(id, qty = 1) {
    const product = products.find(p => p.id === id)
    if (product && product.quantity > 0) {
        const article = cart.find(a => a.id === id)
    
        if (article) {
            if (checkStock(id, qty + article.qty)) {
                article.qty++ 
            } else {
                modalInsuficienteStock.classList.add("modal--show--insuficiente-stock")
            }
        } else {
            cart.push({id, qty})
        }
        
    } else {
        modalInsuficienteStock.classList.add("modal--show--insuficiente-stock")
    }
    printCart()
}

function checkStock(id, qty) {
    const product = products.find(p => p.id === id)
    return product.quantity - qty >= 0 
}

// #5 Remove article
function removeFromCart(id, qty = 1) {
    const article = cart.find(a => a.id === id)

    if (article && article.qty - qty > 0) {
        article.qty--}
 
    printCart()
}

// #6 delete from cart
function deleteFromCart(id) {
    const article = cart.find(a => a.id === id)
    cart.splice(cart.indexOf(article), 1)
    modalDelete.classList.add("modal--show-delete")
   
}

// #7 Count articles
function totalArticles() {
    return cart.reduce((acc, article) => acc + article.qty, 0)
}

// #8 Total
function totalAmount() {
    return cart.reduce((acc, article) => {
        const product = products.find(p => p.id === article.id)
        return acc + product.price * article.qty
    }, 0)
}

// #9 Clear cart
function clearCart() {
    cart = []
    printCart()
}

// #10 Buy
function checkOut() {
    cart.forEach(article => {
        const product = products.find(p => p.id === article.id)
        product.quantity -= article.qty
    })
    // clearCart()
    printProducts()
    printCart()
}

function checkButtons() {
    if (cart.length > 0) {
        document.getElementById("cart-checkout").removeAttribute("disabled")
        document.getElementById("cart-empty").removeAttribute("disabled")
    } else {
        document.getElementById("cart-checkout").setAttribute("disabled", "disabled")
        document.getElementById("cart-empty").setAttribute("disabled", "disabled")
    }
}

function numberToCurrency (value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

/* Add Events to our buttons */
productContainer.addEventListener("click", function (e) {
    const add = e.target.closest(".addToCart")

    if (add) {
        const id = +add.dataset.id
        addToCart(id)
    }
})

cartContainer.addEventListener("click", function (e) {
    const remove = e.target.closest(".removeToCart")
    const add = e.target.closest(".addToCart")
    const deleteCart = e.target.closest(".deleteToCart")

    if (remove) {
        const id = +remove.dataset.id
        removeFromCart(id)
    }

    if (add) {
        const id = +add.dataset.id
        addToCart(id)
    }

    if (deleteCart) {
        const id = +deleteCart.dataset.id
        deleteFromCart(id)
    }


})

const actionButtons = document.getElementById("action-buttons")

actionButtons.addEventListener("click", function (e) {
    const clear = e.target.closest("#cart-empty")
    const buy = e.target.closest("#cart-checkout")
    
    if (clear) {
        // clearCart()
    }

    if (buy) {
        checkOut()
    }
})
  

// ------------------BUY--------------------

const openModal = document.getElementById("cart-checkout")
const modal = document.querySelector(".modal")
const closeModal = document.querySelector(".modal__close")

openModal.addEventListener("click", (e) => {
    e.preventDefault()
    modal.classList.add("modal--show")
});

closeModal.addEventListener("click", (e) => {
    e.preventDefault()
    modal.classList.remove("modal--show")
    clearCart()
});

//-------------------CLEAR  --------------------

const openModalDelete = document.getElementById("cart-empty")
const modalDelete = document.querySelector(".modal-delete")
const closeModalDelete = document.querySelector(".modal__close-delete-si")
const closeModalDeleteNo= document.querySelector(".modal__close-delete-no")
const openModalClear= document.querySelector(".bx bx-trash-alt cart__amount-trash deleteToCart")

//-------Boton Clear---------


openModalDelete.addEventListener ("click", (e) => {
    e.preventDefault()
    modalDelete.classList.add("modal--show-delete")
});

closeModalDelete.addEventListener("click", (e) => {
    e.preventDefault()
    modalDelete.classList.remove("modal--show-delete")
    clearCart()
});

closeModalDeleteNo.addEventListener("click", (e) => {
    e.preventDefault()
    modalDelete.classList.remove("modal--show-delete")
    
});

//-------Add to cart --- New Product ---------

const addToCartMain = document.querySelector(".home__btns")

addToCartMain.addEventListener("click", function (e) {
    const add = e.target.closest(".button")

    if (add) {
        const id = +add.dataset.id
        addToCart(id)
    }
})

/* ------------------INSUFICIENTE STOCK-------------------- */

const modalInsuficienteStock = document.querySelector(".modal-insuficiente-stock")
const closeModalInsuficienteStock = document.querySelector(".modal__close-insuficiente-stock")

closeModalInsuficienteStock.addEventListener("click", (e) => {
    e.preventDefault()
    modalInsuficienteStock.classList.remove("modal--show--insuficiente-stock")
});

/* ------------------INSUFICIENTE STOCK desde HOME-------------------- */



