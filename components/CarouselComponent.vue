<template>
  <section id="tranding">
    <div class="container">
      <div class="swiper tranding-slider" ref="trandingSlider">
        <div class="swiper-wrapper">
          <!-- 2) Copia aquí tantas <div class="swiper-slide"> como
                 imágenes tengas. Ajusta src a la ruta real en tu proyecto -->
          <div
            class="swiper-slide tranding-slide"
            v-for="(img, i) in images"
            :key="i"
          >
            <div class="tranding-slide-img">
              <img :src="img" alt="Tranding" />
            </div>
          </div>
        </div>
        <!-- Paginación abajo
        <div class="swiper-pagination"></div>-->
      </div>
      <!---- 3) Controles (prev, next, pagination)
      -- Flechas a los lados
      <div class="swiper-button-prev slider-arrow">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </div>
      <div class="swiper-button-next slider-arrow">
        <ion-icon name="arrow-forward-outline"></ion-icon>
      </div> -->
    </div>
  </section>
</template>

<script>
/*
import Swiper from "swiper";
import { onMounted, ref } from "vue";
import "swiper/swiper-bundle.css";*/
export default {
  layout: "dashboard",
  name: "TrendingSlider",

  head() {
    return {
      link: [
        // 4) Cargamos el CSS de Swiper desde CDN
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css",
        },
        // (Opcional) Si quieres el font Montserrat global, lo puedes incluir aquí:
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
        },
      ],
      script: [
        // 5) Ionicons (para las flechas)
        //{
        //  type: "module",
        //  src: "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js",
        //},
        //{
        // nomodule: "",
        //  src: "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js",
        //},
        // 6) Swiper JS desde CDN
        {
          src: "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js",
          defer: true,
        },
      ],
    };
  },

data() {
  return {
    images: [],
    swiperInstance: null,// Referencia a la instancia de Swiper
  };
},


  methods: {
    //Método para inicializar Swiper
   initSwiper() {
  if (!this.images.length) {
    console.warn("Aún no hay imágenes para el carrusel");
    return;
  }

  if (typeof window.Swiper === "undefined") {
    setTimeout(this.initSwiper, 100);
    return;
  }
// Verifica si ya hay una instancia de Swiper
  this.swiperInstance = new window.Swiper(this.$refs.trandingSlider, {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 18.5,
      depth: 80,
      modifier: 2.5,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
}

  },
  //Cargamos las imágenes del carrusel desde la API
mounted() {
  fetch('http://localhost:5000/api/carrusel')
    .then(res => res.json())
    .then(data => {
    this.images = data.docs.map(doc => `http://localhost:5000${doc.imagen.url}`);
    })
    .then(() => {
      this.$nextTick(() => {
        this.initSwiper();
      });
    });
}

};
</script>

<!-- =============================
     11) Estilos CSS “tal cual” del ejemplo
     (puedes pegarlo en style global o en scoped)
     ============================= -->
<style scoped>
/* -------------------------------------
   Reset y variables (idéntico a style.css)
   ------------------------------------- */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
}

:root {
  --primary: #ec994b;
  --white: #ffffff;
  --bg: #f5f5f5;
}

html {
  font-size: 62.5%;
  font-family: "Montserrat", sans-serif;
  scroll-behavior: smooth;
}

@media (min-width: 1440px) {
  html {
    zoom: 1.5;
  }
}

@media (min-width: 2560px) {
  html {
    zoom: 1.7;
  }
}

@media (min-width: 3860px) {
  html {
    zoom: 2.5;
  }
}

::-webkit-scrollbar {
  width: 1.3rem;
}

::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background: #797979;
  transition: all 0.5s ease-in-out;
}

::-webkit-scrollbar-thumb:hover {
  background: #222224;
}

::-webkit-scrollbar-track {
  background: #f9f9f9;
}

body {
  font-size: 1.6rem;
  background: var(--bg);
}

/* -------------------------------------
   Contenedor centrado y responsive
   ------------------------------------- */
.container {
  max-width: 124rem;
  padding: 0 1rem;
  margin: 0 auto;

}


/* -------------------------------------
   Títulos de sección
   ------------------------------------- */
.text-center {
  text-align: center;
}
.section-subheading {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}
.section-heading {
  font-size: 3rem;
  color: var(--primary);
  margin-bottom: 2rem;
}
/* -------------------------------------
   1) #tranding: padding vertical
   ------------------------------------- */
#tranding {
  padding: 4rem 5rem;
  background-color: var(--bg);

}

@media (max-width: 1440px) {
  #tranding {
    padding: 2rem 0;
  }
}

/* -------------------------------------
   2) .tranding-slider: altura y padding
   ------------------------------------- */
#tranding .tranding-slider {
  height: 30rem;
  padding: 2rem 0;
  position: relative;

}

@media (max-width: 500px) {
  .container {
  padding: 0 2rem;
}
  #tranding .tranding-slider {
    height: 28rem;
    margin: 0;
  }
}

/* -------------------------------------
   3) Cada .tranding-slide (ancho fijo)
   se movio para hacer las img mas chicas
   ------------------------------------- */
.tranding-slide {
  width: 20rem;
  height: 24rem;
  position: relative;

}

@media (max-width: 500px) {
  .tranding-slide {
    width: 18rem !important;
    height: 22rem !important;
  }
  .tranding-slide .tranding-slide-img img {
    width: 18rem !important;
    height: 22rem !important;
  }
}

/* -------------------------------------
   4) .tranding-slide-img img
   se movio para hacer las img mas chicas
   ------------------------------------- */

.tranding-slide .tranding-slide-img img {
  width: 20rem;
  height: 24rem;
  border-radius: 1.5rem;
  object-fit: cover;

}

/* -------------------------------------
   5) Si quisieras contenido superpuesto
      (texto, precio, rating, etc.) dentro
      de la tarjeta, puedes usar esta capa:
   ------------------------------------- */
.tranding-slide .tranding-slide-content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.tranding-slide-content .food-price {
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: var(--white);
}

.tranding-slide-content .tranding-slide-content-bottom {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  color: var(--white);
}

.food-rating {
  padding-top: 1rem;
  display: flex;
  gap: 1rem;
}

.rating ion-icon {
  color: var(--primary);
}

/* -------------------------------------
   6) Ocultamos sombras laterales
   para el efecto coverflow (opcional)
   ------------------------------------- */
/*.swiper-slide-shadow-left,
.swiper-slide-shadow-right {
  display: none;
}

/* -------------------------------------
   7) .tranding-slider-control:
      posición relativas de flechas/paginación
   ------------------------------------- */
/* .tranding-slider-control {
  position: relative;
  bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
} */

/* -------------------------------------
   😎 Flecha “Next” (posición responsiva)
   ------------------------------------- */
/* .tranding-slider-control .swiper-button-next {
  left: 58% !important;
  transform: translateX(-58%) !important;
}

@media (max-width: 990px) {
  .tranding-slider-control .swiper-button-next {
    left: 70% !important;
    transform: translateX(-70%) !important;
  }
}

@media (max-width: 450px) {
  .tranding-slider-control .swiper-button-next {
    left: 80% !important;
    transform: translateX(-80%) !important;
  }
} */

/* -------------------------------------
   9) Flecha “Prev” (posición responsiva)
   ------------------------------------- */
/* @media (max-width: 990px) {
  .tranding-slider-control .swiper-button-prev {
    left: 30% !important;
    transform: translateX(-30%) !important;
  }
}

@media (max-width: 450px) {
  .tranding-slider-control .swiper-button-prev {
    left: 20% !important;
    transform: translateX(-20%) !important;
  }
 }  */

/* -------------------------------------
   10) Estilos para el círculo de la flecha
   ------------------------------------- */
/* .tranding-slider-control .slider-arrow {
  background: var(--white);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  left: 42%;
  transform: translateX(-42%);
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
}
.tranding-slider-control .slider-arrow ion-icon {
  font-size: 2rem;
  color: #222224;
}
.tranding-slider-control .slider-arrow::after {
  content: "";
}  */

/* -------------------------------------
   11) Paginación estilo “burbujas” oscuras
   ------------------------------------- */
/* .tranding-slider-control .swiper-pagination {
  position: relative;
  width: 15rem;
  bottom: 1rem;
}
.tranding-slider-control .swiper-pagination .swiper-pagination-bullet {
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
}
.tranding-slider-control .swiper-pagination .swiper-pagination-bullet-active {
  background: var(--primary);
}  */

/* Flechas a los lados */
/*.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  background: var(--white);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
}

.swiper-button-prev {
  left: -1.5rem;
}

.swiper-button-next {
  right: -1.5rem;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  display: none;
}

.swiper-button-prev ion-icon,
.swiper-button-next ion-icon {
  font-size: 2rem;
  color: #222224;
}

=== Posicionamiento general de flechas ===
.swiper-button-next,
.swiper-button-prev {
  top: 50%;
  width: 4rem;
  height: 4rem;
  background: var(--white);
  border-radius: 50%;
  transform: translateY(-50%);
  box-shadow: 0px 8px 24px rgba(18, 28, 53, 0.1);
  z-index: 10;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  content: "";
}

/* Icono dentro de la flecha
.swiper-button-next ion-icon,
.swiper-button-prev ion-icon {
  font-size: 2rem;
  color: #222224;
}

/* === Posiciones en pantallas grandes ===
.swiper-button-prev {
  left: 1rem;
}

.swiper-button-next {
  right: 1rem;
}

/* === Responsivo para pantallas pequeñas === */
/*@media (max-width: 768px) {
  /*.swiper-button-prev {
    left: 0.3rem;
  }

  .swiper-button-next {
    right: 0.3rem;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 3rem;
    height: 3rem;
    top:35%;
  }

  .swiper-button-next ion-icon,
  .swiper-button-prev ion-icon {
    font-size: 1.8rem;
  }


  .tranding-slider .swiper-wrapper {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
  */
</style>
