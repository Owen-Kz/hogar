const category = document.getElementById("category").value
const otherProdctsContainer = document.getElementById("otherProductsContainer")


fetch(`/otherProducts?c=${category}`) 
.then(res =>res.json())
.then(data =>{ 
    // otherProdctsContainer.innerHTML = ""
    if(data.success){
        const otherProducts = data.products
        for(let i =0; i<otherProducts.length; i++){
            otherProdctsContainer.innerHTML += `<div class="col-lg-12" >
                                                                               <!-- single-product-wrap start -->
                                        <div class="single-product-wrap">
                                            <div class="product-image">
                                                <a href="single-product.html">
                                                    <img src="${otherProducts[i].thumbnail}" alt="${otherProducts[i].title}">
                                                </a>
                                           
                                            </div>
                                            <div class="product_desc">
                                                <div class="product_desc_info">
                                                    <div class="product-review">
                                                        <h5 class="manufacturer">
                                                            <a href="/category/${otherProducts[i].category}">${otherProducts[i].category}</a>
                                                        </h5>
                                                    
                                                    </div>
                                                    <h4><a class="product_name" href="/product/${otherProducts[i].slug}">${otherProducts[i].title}</a></h4>
                                                    <div class="price-box">
                                                        <span class="new-price">N ${otherProducts[i].price.toFixed(2).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                                <div class="add-actions">
                                                    <ul class="add-actions-link">
                                                        <li class="add-cart active"><a href="#">Contact Us</a></li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- single-product-wrap end -->
                                    </div>`
        }
    }else{
        otherProdctsContainer.innerHTML = `<h1>Nothing to Display</h1>`
    }
    

}) 