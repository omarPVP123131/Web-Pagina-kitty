// Obtener elementos del DOM
const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const checkoutBtn = document.querySelector(".checkout"); // Obtener el botón "Finalizar compra"

// Evento para mostrar/ocultar el carrito al hacer clic en el ícono
cartIcon.addEventListener("click", () => {
    cart.classList.toggle("show");
});

// Array para almacenar los productos agregados al carrito
const cartProducts = [];

const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsList = document.querySelector(".cart-items");

// Evento para agregar productos al carrito al hacer clic en el botón "Agregar al carrito"
addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const product = button.parentElement;
        const productName = product.querySelector("img").alt;
        const productDescription = product.querySelector(".product-info p").textContent;

        // Agregar el producto al array del carrito
        cartProducts.push({
            name: productName,
            description: productDescription
        });

        // Crear un nuevo elemento de lista con el nombre y la descripción del producto
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${productName}</span>
            <span>${productDescription}</span>
        `;
        cartItemsList.appendChild(listItem);
    });
});

// Evento para finalizar la compra y generar el PDF
checkoutBtn.addEventListener("click", () => {
    console.log("evento1")
    // Generar el PDF con los productos del carrito
    generatePDF(cartProducts);
});

// Función para generar el PDF con los productos del carrito
function generatePDF(products) {
    // Crear la definición del documento PDF
    const docDefinition = {
        content: [
            { text: 'Carrito de compras Kawaii', fontSize: 24, margin: [0, 0, 0, 20] },
            // Agregar los productos al PDF con estilo kawaii
            ...products.map((product, index) => {
                return [
                    { image: '/images/cute.jpeg', width: 20, height: 20, margin: [0, 5, 10, 0] },
                    { text: product.name, fontSize: 16 },
                    { text: product.description, fontSize: 12 },
                    { text: '', margin: [0, 10, 0, 0] } // Espacio entre productos
                ];
            })
        ]
    };

    // Generar el documento PDF
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.open();
}
