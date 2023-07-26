const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  darkModeToggle.classList.toggle('dark');
});

const gallery = document.querySelector(".gallery");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const images = gallery.querySelectorAll("img");
const imageWidth = images[0].clientWidth;

let currentIndex = 0;

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > images.length - 1) {
    currentIndex = 0; // Regresa al inicio cuando llega al final
  }
  updateGalleryPosition();
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1; // Regresa al final cuando llega al inicio
  }
  updateGalleryPosition();
});

function updateGalleryPosition() {
  gallery.style.transform = `translateX(-${currentIndex * (imageWidth + 10)}px)`;
}

// Función para avanzar al siguiente slide automáticamente
function autoPlay() {
  interval = setInterval(() => {
    currentIndex++;
    if (currentIndex > images.length - 4) {
      currentIndex = 0;
    }
    updateGalleryPosition();
  }, 1000); // Cambiar cada 3 segundos (ajustar el intervalo según tus preferencias)
}

// Iniciar el autoplay al cargar la página
autoPlay();

// Detener el autoplay al hacer hover sobre el slider
gallery.addEventListener("mouseenter", () => {
  clearInterval(interval);
});

// Reanudar el autoplay al sacar el mouse del slider
gallery.addEventListener("mouseleave", () => {
  autoPlay();
});

 // Array de reseñas
 const reviews = [
    {
      name: "Ana",
      review: "Los productos de [nombre de la marca] son increíbles. ¡Mi piel nunca se ha visto mejor!",
    },
    {
      name: "Carlos",
      review: "Excelente atención al cliente y productos de alta calidad. ¡Totalmente recomendado!",
    },
    // Agrega más reseñas aquí
  ];

  // Función para agregar las reseñas al contenedor
  function addReviews() {
    const testimonialContainer = document.querySelector(".testimonial-container");
    testimonialContainer.innerHTML = ""; // Limpia el contenedor antes de agregar las reseñas

    reviews.forEach((review) => {
      const testimonial = document.createElement("div");
      testimonial.classList.add("testimonial");
      testimonial.innerHTML = `
        <blockquote>"${review.review}"</blockquote>
        <p>- ${review.name}</p>
      `;
      testimonialContainer.appendChild(testimonial);
    });
  }

  // Llama a la función para agregar las reseñas al cargar la página
  addReviews();
  