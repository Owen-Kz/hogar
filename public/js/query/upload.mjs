const messages = `  
      <div class="col-sm-12">
        <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert" id="errorMessage">
          <button type="button" class="close font__size-18" data-dismiss="alert">
									<span aria-hidden="true">
										<i class="fa fa-times danger "></i>
									</span>
									<span class="sr-only">Close</span>
								</button>
          <i class="start-icon far fa-times-circle faa-pulse animated"></i>
          <!-- <strong class="font__weight-semibold">Oh snap!</strong> Change a few things up and try submitting again. -->
        </div>
      </div>`

const alertContainer = document.getElementById("alertContainer")
function WriteError(message) {
    alertContainer.innerHTML = `      <div class="col-sm-12">
        <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert" id="errorMessage">
          <button type="button" class="close font__size-18" data-dismiss="alert">
									<span aria-hidden="true">
										<i class="fa fa-times danger "></i>
									</span>
									<span class="sr-only">Close</span>
								</button>
          <i class="start-icon far fa-times-circle faa-pulse animated"></i>
          <!-- <strong class="font__weight-semibold">Oh snap!</strong> Change a few things up and try submitting again. -->
          ${message}
        </div>
      </div>`
}

function WriteSucess(message){
alertContainer.innerHTML = `<div class="col-sm-12">
        <div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" id="sucessMessage">
          <button type="button" class="close font__size-18" data-dismiss="alert">
									<span aria-hidden="true"><a>
                    <i class="fa fa-times greencross"></i>
                    </a></span>
									<span class="sr-only">Close</span> 
								</button>
          <i class="start-icon far fa-check-circle faa-tada animated"></i>
      
          ${message}
        </div>
      </div>`
}

const imageInput = document.getElementById('product-images');
        const imagePreview = document.getElementById('image-preview');
        const categorySearch = document.getElementById('category-search');
        const categoryOptions = document.getElementById('category-options');
        const productCategory = document.getElementById('category');

        // Handle image previews
        imageInput.addEventListener('change', () => {
            imagePreview.innerHTML = ''; // Clear existing previews
            const files = Array.from(imageInput.files).slice(0, 5); // Limit to 5 files

            files.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const imageContainer = document.createElement('div');
                    imageContainer.className = 'image-container';

                    const img = document.createElement('img');
                    img.src = reader.result;

                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'remove-btn';
                    removeBtn.textContent = '×';
                    removeBtn.addEventListener('click', () => {
                        imageContainer.remove();
                        const dt = new DataTransfer();
                        const remainingFiles = Array.from(imageInput.files).filter((_, i) => i !== index);
                        remainingFiles.forEach(file => dt.items.add(file));
                        imageInput.files = dt.files;
                    });

                    imageContainer.appendChild(img);
                    imageContainer.appendChild(removeBtn);
                    imagePreview.appendChild(imageContainer);
                };
                reader.readAsDataURL(file);
            });
        });

        // Handle category dropdown filtering
        const categories = [
            "Air Fresheners",
            "Bags",
            "T-Shirts",
            "Jerseys",
            "Towel",
            "Caps",
            "Clothing",
            "Gift Cards",
            "Graphic Design",
            "Scarfs",
            "Key Holders",
            "Drink wares",
            "Lanyards",
            "Notebook",
            "Notepads",
            "AirPods",
            "Power banks",
            "Wristbands",
            "Wristwatch",
            "Wireless charging Notepad",
            "Wireless charging diary",
            "Hogar Luxe Executive Gift Box",
            "HL Tech Gifts"
          ];
          
       

        categorySearch.addEventListener('input', () => {
            const query = categorySearch.value.toLowerCase();
            categoryOptions.innerHTML = ''; // Clear existing options

            categories
                .filter(category => category.toLowerCase().includes(query))
                .forEach(category => {
                    const div = document.createElement('div');
                    div.textContent = category;
                    div.addEventListener('click', () => {
                        productCategory.value = category;
                        categorySearch.value = category;
                        categoryOptions.style.display = 'none';
                    });
                    categoryOptions.appendChild(div);
                });

            categoryOptions.style.display = categories.some(cat => cat.toLowerCase().includes(query)) ? 'block' : 'none';
        });

        document.addEventListener('click', (e) => {
            if (!categorySearch.contains(e.target) && !categoryOptions.contains(e.target)) {
                categoryOptions.style.display = 'none';
            }
        });



// Handle File submission 
const postAdForm = document.getElementById("product-upload-form");
const loaderbody = document.querySelector("#loaderbody")

postAdForm.addEventListener("submit", function(e) {
    e.preventDefault();

    loaderbody.setAttribute("class", "loaderbody")

    const newData = new FormData(postAdForm);


    const imageFile = document.querySelectorAll('input[name="product-images[]"]')
    imageFile.forEach(image =>{

     image.addEventListener("change", function(){
         const fileType = this.files[0].type 
    
         if(fileType  !== 'image/jpeg' && fileType !== 'image/jpg' && fileType !== 'image/png'){
            
            WriteError(`<strong class="font__weight-semibold">Unsupported File!</strong> Choose a JPG or PNG file`)
            
             image.files[0] = []
             image.value = ""
         }
     })
    })
    let error = false
    


    if(!error){
            fetch(`/upload`, {
        method: "POST",
        body: newData, // Send FormData directly
        // No need to set Content-Type header
    })
    .then(response => response.json())
    .then(data =>{
        if(data.success){
           loaderbody.classList.add("hide");
            WriteSucess(`<strong class="font__weight-semibold">Sucess</strong> ${data.success}.`)
            // window.location.href = "/dashboard"
        }else{
            loaderbody.classList.add("hide");
            WriteError(`<strong class="font__weight-semibold">Oops!</strong> ${data.error}`)
            // alert(data.error)
        }
         })
    .catch(error => console.error('Error:', error));
}else{
    alert("Please Check all fields and ensure they are correct")
}
});
