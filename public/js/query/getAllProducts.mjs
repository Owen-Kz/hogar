import { WriteError } from "./alertMessages.mjs";
import { whatsappNumber } from "./constants.mjs";

const ProductsContainer = document.getElementById("productsContainer")
const paginationContainer = document.getElementById("pagination");
const ProductsBottomContainer = document.getElementById("ProductsBottomContainer")
const ProductsTopContainer = document.getElementById("ProductsTopContainer")
const maxLength = 50;

 

function booksNavigation(totalPagesProducts, currentPage) {
    const booksNavContainer = document.getElementById("pagination");
    let Previous = "";
    let AfterPrevious = "";
    let EndPage = "";
    let TotalPagesCount = "";
    let nextPageContainer = "";
    let OtherPages = "";



    if (totalPagesProducts > 0) {
        if (currentPage > 1) {
            Previous = `
        
         <li><a href="?page=${currentPage - 1}" class="Previous"><i class="fa fa-chevron-left"></i> Previous</a>
    </li>
        `;
        }

        const maxPagesToShow = 5;
        const halfMax = Math.floor(maxPagesToShow / 2);
        const startPage = Math.max(currentPage - halfMax, 1);
        const endPage = Math.min(currentPage + halfMax, totalPagesProducts);
        const nextPage = currentPage + 1;



        if (startPage > 1) {
            AfterPrevious = `
        <li><a href="?page=1">1</a></li>
        `;

            if (startPage > 2) {
                AfterPrevious += `
        <li><a href="#">...</a></li>

          `;
            }
        }

        for (let i = startPage; i <= totalPagesProducts; i++) {
            if (i > 8) {
                break;
            }
            let active = (i == currentPage ? 'active' : '');
            OtherPages += `
     
    <li class="${active}"><a href="?page=${i}">${i}</a></li>

        `;
        }

        if (endPage <= totalPagesProducts) {
            if (endPage > totalPagesProducts - 1) {
                EndPage = `
       
           <li><a href="#">...</a></li>
           `;
            }
            TotalPagesCount = `
        <li><a href="?page=${totalPagesProducts}">${totalPagesProducts}</a></li>
        `;
        }

        if (currentPage < totalPagesProducts) {
            nextPageContainer = `
     
        <li>
      <a href="?page=${nextPage}" class="Next"> Next <i class="fa fa-chevron-right"></i></a>
    </li>
        `;
        }
    }

    booksNavContainer.innerHTML = `
     <div class="col-lg-6 col-md-6">
        <p>Showing page ${currentPage} of ${totalPagesProducts}</p>
     </div>

      <div class="col-lg-6 col-md-6">
        <ul class="pagination-box" id="pagination">
        ${Previous}
        ${AfterPrevious}
        ${OtherPages}
        ${EndPage}
        ${TotalPagesCount}
        ${nextPageContainer}
      </ul>
 </div>
     `;
}



{/* <div class="product_description limited-text">
${ProductsList[i].description}
</div>
   */}
const demoData = `         <!-- start single_item  -->
              <div class="product_item loadingItem">
                    <div class="image_container" style="background:transparent;">
                      
                   
                    <div class="actions" style="background:transparent;">
                        <div class="viewsCount" style="background:transparent;">
                          
                        </div>

                        <div class="save_item" style="background:transparent;">

                        </div>
                    </div>
                     </div>
                    <!-- start product info  -->
                     <div class="product_info" style="background:transparent;">
                        <div class="product_name" style="background:transparent;">
                           
                        </div>
                        <div class="location" style="background:transparent;"></div>
                     </div>
                     <!-- end product info  -->
                </div>
                <!-- div.End_single_item  -->`
function NewPage(page) {
    ProductsContainer.innerHTML = ""

    if (ProductsContainer) {
        for (let i = 0; i < 40; i++) {
            ProductsContainer.innerHTML += `${demoData}`
        }
    }
    if (ProductsBottomContainer) {
        for (let i = 0; i < 20; i++) {
            ProductsBottomContainer.innerHTML += `${demoData}`
        }
    }

    if (ProductsTopContainer) {
        for (let i = 0; i < 20; i++) {
            ProductsTopContainer.innerHTML += `${demoData}`
        }
    }
    fetch(`/allProducts?page=${page}`, {
        method: "POST"
    }).then(res => res.json())
        .then(async (data) => {

            if (data.success) {
                const ProductsList = data.products
                const totalPages = data.totalPages
                const currentPage = data.currentPage
                if (paginationContainer) {
                    booksNavigation(totalPages, currentPage)
                }
                if (ProductsContainer) {
                    // ProductsContainer.innerHTML = ""

                    for (let i = 0; i < ProductsList.length; i++) {
                       
                        // let ItemPrice = ""
                        // let currency = "N"
                    

                    
                    
                        // if()

                        // if (ProductsList[i].price == null) {
                        //     ItemPrice = ``
                        // } else {
                        //     ItemPrice = `${currency} ${ProductsList[i].price.toLocaleString()}`
                        // }
                        ProductsContainer.innerHTML += ` <div class="col-lg-4 col-md-4 col-sm-6 mt-40">
                                                    <!-- single-product-wrap start -->
                                                    <div class="single-product-wrap">
                                                        <div class="product-image">
                                                            <a href="/product/${ProductsList[i].slug}">
                                                                <img src="${ProductsList[i].thumbnail}" alt="${ProductsList[i].title}">
                                                            </a>
                                                            
                                                        </div>
                                                        <div class="product_desc">
                                                            <div class="product_desc_info">
                                                                <div class="product-review">
                                                                    <h5 class="manufacturer">
                                                                        <a href="/category/${ProductsList[i].category}">${ProductsList[i].category}</a>
                                                                    </h5>
                                                                                                        
                                                                </div>
                                                                <h4><a class="product_name limited-text" href="/product/${ProductsList[i].slug}">${ProductsList[i].title}</a></h4>
                                                                
                                                            </div>
                                                            <div class="add-actions">
                                                                <ul class="add-actions-link">
                                                                    <li class="add-cart active"><a href="https://wa.me/${whatsappNumber}?text=Hi,%20I'm%20contacting%20you%20by%20clicking%20on%20the%20whatsapp%20button%20on%20your%20website. %20https://www.hluxegift.com/product/${ProductsList[i].slug}%20I'm%20inquiring%20about%20the%20*${ProductsList[i].title}*%20My%20Name%20is%20..." target=_blank><i class="fa fa-whatsapp"></i> <b>Contact us</b> </a></li>
                                                                    
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- single-product-wrap end -->
                                                </div>`
                    }
                }




                const limitedTextElements = document.getElementsByClassName("limited-text")
               
                // Loop through each element and truncate if necessary
                if (limitedTextElements) {
                    for (var i = 0; i < limitedTextElements.length; i++) {
                        var limitedText = limitedTextElements[i];
                        if (limitedText.textContent.length > maxLength) {
                            limitedText.textContent = limitedText.textContent.substring(0, maxLength) + "...";
                        }
                    }
                }


            } else {
                if (ProductsContainer) {
                    ProductsContainer.innerHTML = `<div>Cannot Retrieve Data At the moment. Please Refresh</div>`
                }
                WriteError(`<strong class="font__weight-semibold">Oops!</strong> ${data.error}`)
            // alert(data.error)
            }

        })
}


function GetParameters(href) {
    // Get the URL string
    const urlString = href;

    // Create a URL object
    const url = new URL(urlString);

    // Get the search parameters from the URL
    const searchParams = new URLSearchParams(url.search);
    return searchParams

}
const Search = GetParameters(window.location.href).get("s")
if(Search && Search !== ""){
    NewPage()
}
const page = GetParameters(window.location.href).get("page")

if (page && page > 0) {
    NewPage(page)
} else {
    NewPage(1)

}