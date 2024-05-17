const apiUrl = 'https://crudcrud.com/api/9ab3aa29079c4ac3ac4ec0348b918548/items';
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const totalPriceElement = document.getElementById('totalPrice');

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const sellingPrice = document.getElementById('sellingPrice').value;

    const product = { productName, sellingPrice };

    try {
        const response = await axios.post(apiUrl, product);
        addProductToDOM(response.data);
        updateTotalPrice();
    } catch (error) {
        console.error('Error adding product:', error);
    }
    
    productForm.reset();
});

async function fetchProducts() {
    try {
        const response = await axios.get(apiUrl);
        response.data.forEach(product => addProductToDOM(product));
        updateTotalPrice();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function addProductToDOM(product) {
    const li = document.createElement('li');
    li.textContent = `${product.productName}: $${product.sellingPrice}`;
    li.dataset.id = product._id;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteProduct(product._id, li));

    li.appendChild(deleteButton);
    productList.appendChild(li);
}

async function deleteProduct(id, element) {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        productList.removeChild(element);
        updateTotalPrice();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

function updateTotalPrice() {
    let totalPrice = 0;
    document.querySelectorAll('#productList li').forEach(li => {
        const price = parseFloat(li.textContent.split('$')[1]);
        totalPrice += price;
    });
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Initial fetch of products on page load
fetchProducts();
