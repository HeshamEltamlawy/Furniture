// create an array of objects (containing 6 objects) where each object represents a product with the following properties:-
// - product_name (string, ex: "Gold Coin")
// - product_price (string, ex: "112.55")
// - product_image (string, ex: "gold-coin.png")
// - added_to_cart (boolean, ex: false)

const products = [
    {
        id: 1,
        name: "Sofa 3 seaters",
        price: "$1086",
        image: "./assets/sofa-3-seaters.png",
        added_to_cart: false

    },
    {
        id: 2,
        name: "2 Loveseat",
        price: "$886",
        image: "./assets/2-Loveseat.png",
        added_to_cart: false
    },
    {
        id: 3,
        name: "Bed 180 cm",
        price: "$1360",
        image: "./assets/Bed-180-cm.png",
        added_to_cart: false
    },
    {
        id: 4,
        name: "Bed 160 cm",
        price: "$975",
        image: "./assets/Bed-160-cm.jpg",
        added_to_cart: false
    },
    {
        id: 5,
        name: "Brown Hammock",
        price: "$520",
        image: "./assets/Brown-Hammock.png",
        added_to_cart: false
    },
    {
        id: 6,
        name: "WHITE Relax Sofa",
        price: "$675",
        image: "./assets/WHITE-Relax-Sofa.jpg",
        added_to_cart: false
    }
]




let htmlcode = ``;

products.forEach(function (singleObject) {

    htmlcode =
        htmlcode +
        `
                                <div class="container">
                                    <div class="card">
                                        <img alt="photo" class="product-image" src="${singleObject.image}">
                                            <div class="card-details">
                                            <span class="tag">Available</span>
                                            <p class="name">${singleObject.name}</p>
                                            <p class="product-price"><b>${singleObject.price}</b></p>
                                            <button id="add-to-cart-btn" class="cart-btn">ADD TO CART</button>
                                            <button class="view-btn">QUICK VIEW</button>
                                            </div>
                                    </div>
                                </div>
        `;
})

const productCards = document.querySelector(".all-cards-here");

productCards.innerHTML = htmlcode;

// add products to cart

const addToCart = document.getElementsByClassName("cart-btn");
const productRow = document.getElementsByClassName("dropdown-row");

for(i=0; i< addToCart.length; i++){
    button = addToCart[i];
    button.addEventListener('click', addToCardClicked);
}

function addToCardClicked (event){

    button = event.target;
    let cartItem = button.parentElement;
    let price = cartItem.getElementsByClassName("product-price")[0].innerText;
    let name = cartItem.getElementsByClassName("name")[0].innerText;
    let imageSrc = cartItem.parentElement.getElementsByClassName("product-image")[0].src;
    console.log(name,price,imageSrc);

    addItemToCart(price,name, imageSrc);
}



function addItemToCart (price,name, imageSrc){
    let productRow = document.createElement('div');
    productRow.classList.add("dropdown-row");
    let dropdownContent = document.getElementsByClassName("dropdown-content")[0];
    let cartImage = document.getElementsByClassName('cart-image');

    for(let i= 0; i< cartImage.length; i++){
        if(cartImage[i].src == imageSrc){
            alert("This item has already been added to the cart")
            return;
        }
    }

    let cartRowItem = `
    
    <div class="dropdown-row">
    <img class="cart-image" src="${imageSrc}" alt="">
    <P><b>${name}</p></b>
    <span class="cart-price">${price}</span>
    <input class="product-quantity" type="number" value="1">
    <button class="remove-btn">Remove</button>
    </div>
    `
    productRow.innerHTML = cartRowItem;
    dropdownContent.append(productRow);
    productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
    productRow.getElementsByClassName("product-quantity")[0].addEventListener("change", changeQuantity)
    updateCartPrice()

}

// end of add products to cart

//open quick view

// const openQuick = document.getElementsByClassName("view-btn");

// for(var i = 0; i< openQuick.length; i++);
// button = openQuick[i];
// button.addEventListener("click", viewItem())

// function viewItem (event){
//     let viewContent = document.createElement("div");
//     viewContent.classList.add("quick-view");
// }

const removeBtn = document.getElementsByClassName('remove-btn');
for (var i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i]
  button.addEventListener('click', removeItem)
}

function removeItem (event) {
  btnClicked = event.target
  btnClicked.parentElement.parentElement.remove()
  updateCartPrice()
}

// update quantity input


let quantityInput = document.getElementsByClassName("product-quantity")[0];

for(let i=0; i< quantityInput; i++){
    input = quantityInput[i];
    input.addEventListener("change", changeQuantity)
}

function changeQuantity(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartPrice()

}

// end of update quantity input


// update total price

function updateCartPrice() {
    let total = 0
    for (var i = 0; i < productRow.length; i += 2) {
      cartRow = productRow[i]

      let priceElement = cartRow.getElementsByClassName('cart-price')[0];
      let quantityElement = cartRow.parentElement.getElementsByClassName('product-quantity')[0];
      let price = parseFloat(priceElement.innerText.replace('$', ''));
      let quantity = quantityElement.value;
      total =  (price * quantity )
      
    }
    document.getElementsByClassName('total-price')[0].innerText = '$'+ total;
  
  document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2;
  }

// end of update total price

// let cartItem = document.getElementsByClassName("added_to_cart")[0];
// console.log(cartItem);

