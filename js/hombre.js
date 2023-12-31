// Obtener elementos del DOM
const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const closeCartBtn = document.querySelector(".close-cart-btn"); // Obtener el botón "Cerrar carrito"
const checkoutBtn = document.querySelector(".checkout"); // Obtener el botón "Finalizar compra"
const cartItemCount = document.querySelector(".cart-item-count"); // Elemento para mostrar el número de productos

const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
let changeColorInterval; // Variable para almacenar el intervalo de cambio de color
let isDarkMode = false; // Variable para verificar si el modo rafaga de colores está activado

// Función para obtener un color aleatorio
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para cambiar el color de fondo aleatoriamente
function changeBackgroundColor() {
    if (isDarkMode) {
        var newColor = getRandomColor();
        body.style.backgroundColor = newColor;
    }
}

// Evento para alternar el modo rafaga de colores
darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode; // Alternar el estado del modo rafaga de colores
    darkModeToggle.classList.toggle('dark', isDarkMode); // Agregar clase 'dark' si el modo rafaga de colores está activado

    // Si se desactiva el modo rafaga de colores, restaurar el color de fondo original y detener el cambio de color
    if (!isDarkMode) {
        body.style.backgroundColor = "#e1d5ff";
        clearInterval(changeColorInterval);
    } else {
        // Si se activa el modo rafaga de colores, iniciar el cambio de color de fondo aleatoriamente
        changeColorInterval = setInterval(changeBackgroundColor, 100);
    }
});

// Evento para mostrar/ocultar el carrito al hacer clic en el ícono
cartIcon.addEventListener("click", () => {
    cart.classList.toggle("show");
});

// Evento para cerrar el carrito al hacer clic en el botón "Cerrar carrito"
closeCartBtn.addEventListener("click", () => {
    cart.classList.remove("show");
});

// Evento para cerrar el carrito cuando se haga clic fuera de él
document.addEventListener("click", (event) => {
    if (!cart.contains(event.target) && !cartIcon.contains(event.target)) {
        cart.classList.remove("show");
    }
});

// Array para almacenar los productos agregados al carrito
const cartProducts = [];

const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItemsList = document.querySelector(".cart-items");

// Establecer límite máximo de productos en el carrito
const maxProductsInCart = 11;


// Función para actualizar el número de productos en el carrito
function updateCartItemCount() {
    cartItemCount.textContent = cartProducts.length;
}

// Evento para agregar productos al carrito al hacer clic en el botón "Agregar al carrito"
addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        // Verificar si se ha alcanzado el límite máximo de productos en el carrito
        if (cartProducts.length >= maxProductsInCart) {
            alert("¡Lamentamos informarte que el carrito solo soporta 11 articulos por compra por favor finaliza tu ticket y luego vuelve por mas!");
            return; // Detener la ejecución si se ha alcanzado el límite
        }

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

        // Actualizar el número de productos en el carrito
        updateCartItemCount();
    });
});
// Función para detectar si el dispositivo es Android
function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

// Evento para finalizar la compra y mostrar notificación
checkoutBtn.addEventListener("click", () => {
    // Obtener el nombre del cliente ingresado en el carrito
    const customerName = document.getElementById("customer-name").value;

    // Verificar si el nombre del cliente está vacío
    if (!customerName) {
        alert("Por favor, ingresa tu nombre antes de finalizar la compra.");
        return;
    }

    // Generar el PDF con los productos del carrito y el nombre del cliente
    generatePDF(cartProducts, customerName);

    // Verificar si el navegador admite notificaciones
    if ("Notification" in window) {
        // Comprobar si las notificaciones están permitidas
        if (Notification.permission === "granted") {
            // Mostrar la notificación si las notificaciones están permitidas
            showNotification();
        } else {
            // Si las notificaciones no están permitidas, solicitar permiso
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    // Mostrar la notificación si el permiso es concedido
                    showNotification();
                }
            });
        }
    }

    // Si el dispositivo es Android, redirigir al usuario a la página de compra
    if (isAndroid()) {
        window.location.href = "/Hombres.html";
    }
});


function showNotification() {
    const notificationOptions = {
        body: "Gracias por tu compra, vuelve pronto! 🎉",
        icon: "/images/kawaii.jpeg", // URL del ícono que deseas mostrar
    };
    const notification = new Notification("¡Compra finalizada!", notificationOptions);

    // Agregar evento de clic a la notificación
    notification.addEventListener("click", () => {
        // Redirigir al usuario a la página de compra
        window.location.href = "/Hombres.html";
    });

    // Mostrar la notificación
    new Notification("¡Compra finalizada!", notificationOptions);
}



// Función para generar el PDF con los productos del carrito
function generatePDF(products) {
    // Tamaño inicial de la imagen kawaii
    const imageSize = 50;

    
    // Convertir la imagen a datos URI
    const cuteImage = 'data:image/jpeg;base64,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'; // Agrega aquí el código de datos URI de la imagen cute.jpeg

// Obtener la imagen kawaii con fondo rosa y esquinas redondeadas
const cuteImageWithStyle = {
    image: cuteImage,
    width: 50, // Ajusta el tamaño de la imagen a tu preferencia
    height: 50,
    margin: [0, 5, 10, 0],
    fit: [100, 100], // Hace que la imagen ocupe el 100% del espacio disponible
    alignment: "right", // Alinea la imagen a la derecha
    style: {
        border: [5, "#ffffff"], // Agrega un borde blanco de 5 puntos alrededor de la imagen
        borderRadius: 25 // Hace que las esquinas de la imagen sean redondeadas
    }
};

    // Obtener el nombre del cliente ingresado en el carrito (reemplaza "customerName" con la variable que contenga el nombre del cliente)
    const customerName = document.getElementById("customer-name").value;
    // Crear la definición del documento PDF
    const docDefinition = {
        pageSize: 'A4', // Tamaño de la página
        pageMargins: [40, 60, 40, 60], // Márgenes de la página (izquierda, arriba, derecha, abajo)
        background: { // Color de fondo para toda la página del PDF
            canvas: [{ type: 'rect', x: 0, y: 0, w: 595.28, h: 841.89, color: '#09ffc1' }]
        },
        // Función para agregar el título en la parte superior de cada página
        header: (currentPage, pageCount) => {
            return { text: 'Carrito de compras (Seccion de hombres)', fontSize: 24, margin: [0, 10, 0, 20], bold: true, alignment: 'center', color: '#ff007f' };
        },
        // Función para agregar el número de página en la parte inferior de cada página
        footer: (currentPage, pageCount) => {
            return { text: `Página ${currentPage} de ${pageCount}`, alignment: 'center', margin: [0, 20] };
        },
        content: [
            // Agregar la imagen kawaii con estilo en la esquina derecha
            { 
                absolutePosition: { x: 530, y: 700  }, // Posición absoluta en la esquina derecha
                ...cuteImageWithStyle
            },
            // Agregar los productos al PDF con estilo kawaii
            ...products.map((product, index) => {
                return [
                    { text: product.name, fontSize: 18, bold: true, color: '#ff007f' },
                    { text: product.description, fontSize: 14, margin: [0, 5], color: '#333333' },
                    { text: '', margin: [0, 10, 0, 0] }
                ];
            }),
            // Agregar el nombre del cliente debajo de la sección de productos
            { 
                text: `Nombre del cliente: ${customerName}`, 
                fontSize: 16, 
                margin: [0, 20], 
                color: '#ff007f',
                bold: true,
                alignment: 'center'
            }
        ]
    };

    // Generar el documento PDF
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.open();
}