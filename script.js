const products = [
    {id: 1,name:"T-Shirt",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/p/w/f/xs-amu11-csk-jeryellow-ms-dhoni7-yutu-original-imagzphgg2fzhcyx.jpeg?q=70",price: 299},
    {id: 2,name:"T-Shirt",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/p/w/f/xs-amu11-csk-jeryellow-ms-dhoni7-yutu-original-imagzphgg2fzhcyx.jpeg?q=70",price: 299},
    {id: 3,name:"Boll",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/ball/o/j/v/59-cricket-standard-6-86-3-9854-tennis-ball-lycan-original-imah8gzrzvshhmbv.jpeg?q=70",price: 115},
    {id: 4,name:"Boll",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/ball/o/j/v/59-cricket-standard-6-86-3-9854-tennis-ball-lycan-original-imah8gzrzvshhmbv.jpeg?q=70",price: 115},
    {id: 5,name:"Bat",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/bat/n/d/x/1-boundry-beliver-hard-tennis-ak47-long-handle-na-grade-1-original-imah57fm5atx7ev4.jpeg?q=70",price: 1949},   
    {id: 6,name:"Bat",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/bat/n/d/x/1-boundry-beliver-hard-tennis-ak47-long-handle-na-grade-1-original-imah57fm5atx7ev4.jpeg?q=70",price: 1949},   
    {id: 7,name:"Teddy",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/stuffed-toy/k/0/2/strawberry-bunny-plush-toy-adorable-strawberry-rabbit-plushie-35-original-imagusvqsukxfdyf.jpeg?q=70",price: 202},  
    {id: 8,name:"Teddy",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/stuffed-toy/k/0/2/strawberry-bunny-plush-toy-adorable-strawberry-rabbit-plushie-35-original-imagusvqsukxfdyf.jpeg?q=70",price: 202},  
    {id: 9,name:"Watch",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/watch/9/z/r/-original-imahy88tggx3nyk5.jpeg?q=70",price: 1695},   
    {id: 10,name:"Watch",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/watch/9/z/r/-original-imahy88tggx3nyk5.jpeg?q=70",price: 1695}, 
    {id: 11,name:"Chocoloates",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/chocolate/1/k/r/-original-imah8v9j3urthyqh.jpeg?q=70",price: 303},   
    {id: 12,name:"Chocoloates",Image:"https://rukminim2.flixcart.com/image/612/612/xif0q/chocolate/1/k/r/-original-imah8v9j3urthyqh.jpeg?q=70",price: 303},   
    
]

//Render Products

function renderProducts(products,productList){
    const container = document.getElementById(productList);
    container.innerHTML="";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML=`
        <img src= "${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        `
        container.appendChild(productDiv);
    })
}


//Search functionality
function searchProducts(query){
    const filterProducts = products.filter(product =>
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    renderProducts(filterProducts,"productList");
}


//Add EventListner to button
document.getElementById("searchButton")?.addEventListener("click",() => {
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
})

//Sorting
function sortProducts(criteria){
    if(criteria == "price"){
        return products.sort((a,b) => a.price-b.price);
    }
    return products;
}

//Adding Event listner
document.getElementById("sortOptions")?.addEventListener("change",(event)=>{
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts,"productList");
})

//Add to cart

function addToCart(productId){
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${product.name} is added to cart`)
    renderCart();
}

//Render items in cart

function renderCart(){
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    const container = document.getElementById("cartItems");
    container.innerHTML="";
    if(cart.length == 0){
        container.innerHTML="<h1>Your Cart is Empty</h1>"
    }
    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML=`
        <img src="${item.Image}"/>
        <h3>${item.name}</h3>
        <h2>${item.price}</h2>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        `
        container.appendChild(cartDiv);
    })
    renderSubtotal(cart);
}

//Remove from cart
function removeFromCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart =cart.filter(item => item.id !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Product is removed successfully");
    renderCart(); 
}

//Calculate subtotal
function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total + item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    }else{
        subtotalContainer.innerHTML = `No items in the cart`
    }
}

if(document.getElementById("productList"))renderProducts(products,"productList");
if(document.getElementById("cartItems"))renderCart();

