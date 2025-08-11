<template>
  <section class="initiatives-section">
    <v-container>
      <!-- Encabezado -->
      <div class="section-header">
        <h1 class="title-main">{{ $t('iniciativas.titulo') }}</h1>
        <v-divider class="custom-divider my-4"></v-divider>
        <p class="description-main">{{ $t('iniciativas.subtitulo') }}</p>
      </div>

      <v-row>
        <v-col
          v-for="(item, index) in iniciativasData"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="hover-card">
            <!-- Imagen -->
            <v-img :src="item.img" height="200" class="card-img" />

            <!-- Descripción corta -->
            <v-card-text>
              <h3>{{ item.titulo }}</h3>
            </v-card-text>

            <!-- Descripción larga (expandible) -->
            <v-expand-transition>
              <div v-if="item.expandido">
                <v-card-text class="text--secondary">
                  {{ item.descripcionLarga }}
                </v-card-text>
              </div>
            </v-expand-transition>

            <!-- Botón ver más -->
            <v-card-actions class="justify-end">
              <v-btn rounded @click="toggleExpansion(index)">
                <v-icon color="white">
                  {{ item.expandido ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  // Datos iniciales
  data() {
    return {
      iniciativasData: [],
    };
  },
  mounted() {
    this.fetchIniciativas();
  },
    watch: {
    '$i18n.locale'() {
      this.fetchIniciativas();
    },
  },
  methods: {
    // Método para obtener las iniciativas de la API
   async fetchIniciativas() {
      try {
        const idiomaActual = this.$i18n.locale || 'es'
        const baseURL = process.env.CMS_URL;
    //Consume la API para obtener iniciativas
        const response = await fetch(`${baseURL}/api/iniciativas?locale=${idiomaActual}`);
        const data = await response.json();
        console.log('Datos de iniciativas:', data);
        // Mapea los datos para adaptarlos a la estructura requerida
        this.iniciativasData = data.docs.map((item) => ({
          titulo: item.titulo,
          descripcionCorta: item.descripcionCorta,
          descripcionLarga: item.descripcionLarga,
          // Asegura que si existe la imagen, se use la URL completa desde el backend
          img: item.img?.url ? `${baseURL}${item.img.url} ` : '',
          expandido: false,
        }));
      } catch (error) {
        console.error('Error al obtener iniciativas:', error);
      }
    },
    toggleExpansion(index) {
      this.iniciativasData[index].expandido = !this.iniciativasData[index].expandido;
    },
  },
};
</script>

<style lang="scss" scoped>
$primary: #035928;
$accent: #a65224;
$text-muted: #555555;

.initiatives-section {
  .custom-divider {
    background-color: $accent !important;
    height: 0.25rem;
    width: 50rem;
    margin: 2rem auto;
    border-radius: 0.125rem;
    opacity: 0.9;
  }

  .hover-card {
    border-radius: 1rem;
    overflow: hidden;
    height: 100%;
    transition: all 0.3s ease;
    box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.05);

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

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: $primary;
      margin: 1rem 0;
      text-align: justify;
    }

    .v-btn {
      background-color: $primary !important;
      color: white !important;
      display: block;
      margin-left: auto;
      margin-right: 1rem;
      position: relative;
      top: -15px;

      &:hover {
        background-color: darken($primary, 5%) !important;
      }
    }
  }
}
</style>
