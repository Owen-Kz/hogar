const imageInput = document.getElementById('product-images');
        const imagePreview = document.getElementById('image-preview');
        const categorySearch = document.getElementById('category-search');
        const categoryOptions = document.getElementById('category-options');
        const productCategory = document.getElementById('product-category');

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
        const categories = ["Electronics", "Fashion", "Home & Kitchen", "Books", "Toys", "Sports", "Health", "Beauty"];

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