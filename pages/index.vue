<template>
  <v-app>
    <CarouselComponent />

    <!-- Sección sobre cima -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center">
          <!-- Texto principal -->
          <v-col cols="12" md="6" class="hero-text">
            <h1 class="title-main">{{ $t("index.quienesSomos.titulo") }}</h1>
            <p class="description-main">
              {{ $t("index.quienesSomos.descripcion") }}
            </p>
            <!-- Botón visible  en escritorio -->
            <div class="actions d-none d-md-flex">
              <v-btn large rounded class="animated-btn" to="/">
                {{ $t("index.quienesSomos.boton") }}
              </v-btn>
            </div>
          </v-col>

          <!-- Imagen del hero -->
          <v-col cols="12" md="6" class="hero-image-wrapper">
            <v-hover v-slot="{ hover }">
              <div class="image-container" :class="{ hovered: hover }">
                <div class="image-bg"></div>
                <v-img
                  src="/cima-logo.jpg"
                  contain
                  class="main-image"
                  alt="Logo CIMA"
                />
                <div class="image-border"></div>
              </div>
            </v-hover>
          </v-col>

          <!-- Botón para móvil -->
          <div class="actions d-flex d-md-none">
            <v-btn class="animated-btn" large rounded to="/">
              {{ $t("index.quienesSomos.boton") }}
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </section>

    <!-- Aliados Estratégicos -->
    <section class="partners-section">
      <v-container>
        <div>
          <h1 class="title-main">{{ $t("index.aliados.titulo") }}</h1>
          <v-divider class="custom-divider"></v-divider>
          <p class="description-main">
            {{ $t("index.aliados.descripcion") }}
          </p>
        </div>

        <v-row justify="center" class="partners-grid">
          <v-col
            cols="12"
            sm="10"
            md="6"
            lg="4"
            v-for="(aliado, i) in aliados"
            :key="i"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 10 : 2"
                class="partner-card"
                :class="{ hovered: hover }"
              >
                <v-avatar size="160" class="mx-auto my-4 avatar-border">
                  <v-img :src="aliado.img" contain></v-img>
                </v-avatar>
                <v-card-text>
                  <p class="text-default">
                    {{ getPartnerText(i) }}
                  </p>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Iniciativas-->
    <section class="initiatives-section">
      <v-container>
        <div>
          <h1 class="title-main">{{ $t("index.iniciativas.titulo") }}</h1>
          <v-divider class="custom-divider"></v-divider>
        </div>

        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="(iniciativa, i) in iniciativasData"
            :key="i"
          >
            <v-card class="modern-card" :to="iniciativa.link">
              <v-img :src="iniciativa.img" height="200px" class="card-img" />
              <v-card-text>
                <h1 class="text-default">{{ getInitiativeTitle(i) }}</h1>
              </v-card-text>
              <v-card-actions>
                <v-btn outlined rounded>
                  {{ $t("index.iniciativas.verMas") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!--  Preguntas-->
    <section class="faq-section">
      <v-container class="my-12">
        <div class="text-center mb-8">
          <h2
            class="title-main"
          >
            {{ $t("cPreguntas.titulo") }}
            <br />
            <span style="color: #035928">{{ $t("cPreguntas.titulo2") }}</span>
          </h2>
          <v-divider class="custom-divider"></v-divider>
          <p class="description-main">
            {{ $t("cPreguntas.descripcion") }}
          </p>
        </div>

        <v-row>
          <!-- Panel izquierdo -->
          <v-col cols="12" md="6">
            <v-card class="faq-card pa-6" elevation="8">
              <v-expansion-panels multiple>
                <v-expansion-panel
                  v-for="(item, index) in $t('cPreguntas.faqsLeft')"
                  :key="'left-' + index"
                  class="mb-2"
                >
                  <v-expansion-panel-header
                    class="text-h6 font-weight-medium green--text text--darken-2"
                    expand-icon="mdi-chevron-down"
                  >
                    {{ item.pregunta }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content
                    class="text-h6 font-weight-medium green--text text--darken-2"
                    expand-icon="mdi-chevron-down"
                  >
                    <p>{{ item.respuesta }}</p>
                    <v-btn text small color="green darken-2" class="mt-2">
                      <v-icon left small>mdi-information</v-icon>
                      {{ $t("cPreguntas.masInformacion") }}
                    </v-btn>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>

          <!-- Panel derecho -->
          <v-col cols="12" md="6">
            <v-card class="faq-card pa-6" elevation="8">
                <v-expansion-panels multiple>
                <v-expansion-panel
                  v-for="(item, index) in $t('cPreguntas.faqsRight')"
                  :key="'right-' + index"
                  class="mb-2"
                >
                  <v-expansion-panel-header
                    class="text-h6 font-weight-medium green--text text--darken-2"
                    expand-icon="mdi-chevron-down"
                  >
                    {{ item.pregunta }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content
                    class="text-body-1 grey--text text--darken-1"
                  >
                    <p class="text-default">{{ item.respuesta }}</p>
                    <v-btn text small color="green darken-2" class="mt-2">
                      <v-icon left small>mdi-information</v-icon>
                      {{ $t("cPreguntas.masInformacion") }}
                    </v-btn>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-app>
</template>

<script>
import CarouselComponent from "~/components/CarouselComponent.vue";

export default {
  components: { CarouselComponent },

  data() {
    return {
      // Solo mantenemos las imágenes y links, el texto viene de i18n
      aliados: [
        { img: "/img/conanp.png" },
        { img: "/img/BLACKS.jpg" },
        { img: "/img/Logotipo_principal_Atzitzintla.jpg.png" },
        { img: "/img/uttecam.png" },
        { img: "/img/logo-aloux.jpeg" },
      ],

      iniciativasData: [],
    };
  },

  methods: {
    //Ultimas iniciativas
       async fetchIniciativas() {
    try {
      const idioma = this.$i18n.locale || 'es';
      const baseURL = process.env.CMS_URL;
      const response = await fetch(`${baseURL}/api/iniciativas?locale=${idioma}`);
      const data = await response.json();

      this.iniciativasData = data.docs
        .map((item) => ({
          titulo: item.titulo,
          descripcionCorta: item.descripcionCorta,
          descripcionLarga: item.descripcionLarga,
          img: item.img?.url ? `${baseURL}${item.img.url}` : '',
          expandido: false,
          link: '/iniciativas',
        }))
        .slice(-3) // Últimos 3
        .reverse(); // Opcional: para que el más reciente aparezca primero
    } catch (err) {
      console.error('Error al obtener iniciativas:', err);
    }

    },
    syncLanguage() {
      if (process.client) {
        const saved = localStorage.getItem("cima-locale") || "es";
        const current = this.$i18n.locale;

        if (current !== saved) {
          console.log(`Index: Sincronizando de ${current} a ${saved}`)  ;
          this.$i18n.setLocale(saved);

          // Forzar re-renderizado
          this.$forceUpdate();
        }
      }
    },

    getPartnerText(index) {
      try {
        const aliados = this.$t("index.aliados.lista");
        return aliados[index] || "Aliado estratégico";
      } catch (error) {
        console.error("Error obteniendo texto de aliado:", error);
        return "Aliado estratégico";
      }
    },

    getInitiativeTitle(index) {
      try {
        const iniciativas = this.$t("index.iniciativas.lista");
        return iniciativas[index]?.titulo || "Iniciativa";
      } catch (error) {
        console.error("Error obteniendo título de iniciativa:", error);
        return "Iniciativa";
      }
    },
    handleLanguageChange() {
      // Forzar actualización cuando cambie el idioma
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
  },

  mounted() {
    // Sincronizar idioma al montar
    this.syncLanguage();
    //Sincronozar iniciativas
  this.fetchIniciativas();
    // Escuchar cambios de idioma
    this.$nuxt.$on("languageChanged", this.handleLanguageChange);

    console.log("🌐 Index montado:", {
      locale: this.$i18n.locale,
      localStorage: localStorage.getItem("cima-locale"),
      route: this.$route.path,
    });
  },

  beforeDestroy() {
    this.$nuxt.$off("languageChanged", this.handleLanguageChange);
  },

  head() {
    return {
      title: this.$t("index.quienesSomos.titulo"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("index.quienesSomos.descripcion"),
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

// Variables
$primary: #035928;
$secondary: #1ca63f;
$accent: #a65224;
$light-bg: #ffffff;
$text-dark: #2a2a2a;
$text-muted: #555555;

.v-container {
  max-width: 75rem;
  margin: 0 auto;
  padding: 0 1rem;
}

section {
  padding: 1rem 0;

  @media (max-width: 60rem) {
    padding: 3rem 0;
  }

  @media (max-width: 37.5rem) {
    padding: 2rem 0;
  }
}

.actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  color: #ffffff;

  @media (max-width: 37.5rem) {
    justify-content: flex-end;
    margin-top: 1.5rem;
  }
}

.animated-btn {
  background: $primary !important;
  color: rgb(255, 255, 255) !important;
  margin-right: 0.75rem;
  position: relative;
  top: -1.25rem;
  font-weight: 600;
  padding: 0.8rem 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: $primary;
  }
}

// Hero image
.hero-image-wrapper {
  display: flex;
  justify-content: center;

  .image-container {
    position: relative;
    width: 70%;
    max-width: 25rem;

    .image-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba($secondary, 0.1);
      border-radius: 1rem;
      filter: blur(0.75rem);
    }

    .main-image {
      position: relative;
      border-radius: 1rem;
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      z-index: 2;
    }

    .image-border {
      position: absolute;
      top: 1rem;
      left: 1rem;
      width: calc(100% - 2rem);
      height: calc(100% - 2rem);
      border: 0.1875rem solid $accent;
      border-radius: 0.8rem;
      transform: rotate(4deg);
      z-index: 1;
      transition: all 0.3s ease;
    }

    &.hovered {
      .main-image {
        transform: scale(1.05);
      }

      .image-border {
        transform: rotate(-2deg);
        border-color: $secondary;
      }
    }
  }
}

// Aliados
.partners-section {
  background: $light-bg;

  .partner-card {
    border-radius: 1rem;
    transition: all 0.3s ease;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &:hover {
      transform: translateY(-0.5rem);
      box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.1);
      background: white;
    }

    .avatar-border {
      border: 0.25rem solid $primary;
      box-shadow: 0 0.375rem 0.75rem rgba($primary, 0.3);
      background-color: #fff;
    }

    .v-img {
      object-fit: contain;
    }
  }
}

// Iniciativas
.initiatives-section {
  .modern-card {
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-0.5rem);
      box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.1);
    }

    .card-img {
      transition: transform 0.3s ease;
    }

    &:hover .card-img {
      transform: scale(1.05);
    }

    .v-btn {
      background: $primary;
      color: white;
      margin-right: 0.75rem;
      position: relative;
      top: -1.25rem;
      font-size: 0.7rem;

      &:hover {
        background: $primary;
      }
      /*Hata aqui */
    }
  }
}

/* FAQ Panels */
.faq-section {

  .faq-card {
    border: 1px solid #eee;
    border-radius: 0.8rem;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    overflow: hidden; // Para mantener los bordes redondeados

    &:hover {
      border-color: $accent;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .v-expansion-panel {
      border-radius: 0.8rem !important;
      margin-bottom: 0.5rem;
      box-shadow: none !important;
      transition: all 0.3s ease;

      &::before {
        box-shadow: none;
      }

      &-header {
        min-height: 64px;
        font-size: 1.2rem;
        font-weight: 600;
        color: $primary;
        transition: all 0.3s ease;

        &:hover {
          color: $accent;
        }

        &__icon {
          color: $primary !important;
        }
      }

      &-content {
        color: $text-muted;
        padding: 16px;

        .v-btn {
          color: $accent;
          padding: 0;
          min-width: auto;

          &:hover {
            text-decoration: underline;
            background-color: transparent !important;
          }

          .v-icon {
            margin-right: 8px;
          }
        }
      }
    }
  }
}
// Divider personalizado
.custom-divider {
  height: 6.25rem;
  background-color: $accent !important;
  width: 50rem;
  margin: 1rem auto;
}
</style>
