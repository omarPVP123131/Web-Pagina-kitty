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
    // Generar el PDF con los productos del carrito
    generatePDF(cartProducts);
});

// Función para generar el PDF con los productos del carrito
function generatePDF(products) {
    // Crear un nuevo objeto jsPDF
    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(24);
    doc.text("Carrito de compras Kawaii", 20, 20);

    // Imagen kawaii
    const kawaiiImg = new Image();
    kawaiiImg.src = "/ruta/a/la/imagen-kawaii.jpg"; // Reemplaza esta ruta con la ruta correcta de la imagen kawaii

    // Agregar los productos al PDF con estilo kawaii
    products.forEach((product, index) => {
        const yPos = 40 + (index * 40);

        // Agregar la imagen kawaii junto al nombre y descripción del producto
        doc.addImage(kawaiiImg, "JPEG", 20, yPos - 10, 20, 20);
        doc.setFontSize(16);
        doc.text(`${product.name}`, 50, yPos);
        doc.setFontSize(12);
        doc.text(`${product.description}`, 50, yPos + 15);
    });

    // Mostrar el PDF en una ventana emergente para que el usuario pueda guardarlo o imprimirlo
    const pdfString = doc.output('datauristring');
    const iframe = '<iframe width="100%" height="100%" src="' + pdfString + '"></iframe>'
    const x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
}
