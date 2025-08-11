<template>
  <section>
    <v-container>
      <!-- Encabezado -->
      <div class="section-header text-center">
        <h1 class="title-main">{{ $t("recursos.titulo") }}</h1>
        <v-divider class="custom-divider my-4"></v-divider>
        <p class="description-main">{{ $t("recursos.descripcion") }}</p>
      </div>

      <!-- Navegación -->
      <div class="section-nav">
        <div class="nav-container">
          <div
            class="nav-item"
            :class="{ 'active': activeSection === 'noticias' }"
            @click="activeSection = 'noticias'"
          >
            <span>{{ $t("recursos.nav.noticias") }}</span>
            <div class="nav-indicator"></div>
          </div>
          <div
            class="nav-item"
            :class="{ 'active': activeSection === 'eventos' }"
            @click="activeSection = 'eventos'"
          >
            <span>{{ $t("recursos.nav.eventos") }}</span>
            <div class="nav-indicator"></div>
          </div>
        </div>
      </div>

      <!-- Contenido de Noticias -->
      <v-fade-transition>
        <div v-if="activeSection === 'noticias'" class="mt-6">
          <h2 class="section-title">
            <v-icon large color="#035928" class="mr-3">mdi-newspaper</v-icon>
            {{ $t("recursos.noticias.titulo") }}
          </h2>
          <v-row>
            <v-col
              v-for="(noticia, index) in noticiasData"
              :key="'noticia-'+index"
              cols="12"
              sm="6"
              md="4"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  class="hover-card mx-auto"
                  :elevation="hover ? 12 : 4"
                  max-width="400"
                >
                  <v-img
                    :src="noticia.img"
                    height="200"
                    class="card-img"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  >
                    <v-chip v-if="noticia.nuevo" class="ma-2" color="red" text-color="white" small>
                      <v-icon small left>mdi-star</v-icon>
                      {{ $t("recursos.etiquetas.nuevo") }}
                    </v-chip>
                    <v-card-title class="white--text" style="position: absolute; bottom: 0;">
                      {{ $t(noticia.titulo) }}
                    </v-card-title>
                  </v-img>
                  <v-card-subtitle class="px-4 pt-4">
                    <v-icon small color="grey">mdi-clock-outline</v-icon>
                    {{ formatDate(noticia.fecha) }}
                  </v-card-subtitle>
                  <v-card-text class="px-4 pb-0">
                    <p>{{ $t(noticia.descripcionCorta) }}</p>
                  </v-card-text>
                  <v-card-actions class="px-4">
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      class="font-weight-bold"
                      @click.stop="noticia.expandido = !noticia.expandido"
                      :color="noticia.expandido ? 'primary' : ''"
                    >
                      {{ noticia.expandido ? $t('recursos.acciones.leer_menos') : $t('recursos.acciones.leer_mas') }}
                      <v-icon right>{{ noticia.expandido ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-expand-transition>
                    <div v-if="noticia.expandido">
                      <v-divider></v-divider>
                      <v-card-text class="text--secondary px-4">
                        {{ $t(noticia.descripcionLarga) }}
                        <div v-if="noticia.logros" class="mt-3">
                          <v-chip
                            v-for="(logro, i) in noticia.logros"
                            :key="i"
                            class="mr-2 mb-2"
                            color="success"
                            small
                          >
                            <v-icon small left>mdi-check-circle</v-icon>
                            {{ logro.logro }}
                          </v-chip>
                        </div>
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </div>
      </v-fade-transition>

      <!-- Contenido de Eventos -->
      <v-fade-transition>
        <div v-if="activeSection === 'eventos'" class="mt-6">
          <h2 class="section-title">
            <v-icon large color="#035928" class="mr-3">mdi-calendar-month</v-icon>
            {{ $t("recursos.eventos.titulo") }}
          </h2>

          <!-- Pestañas para eventos -->
          <v-tabs v-model="eventTab" centered grow class="mb-6">
            <v-tab>
              <v-icon left>mdi-calendar-clock</v-icon>
              {{ $t("recursos.eventos.proximos") }}
            </v-tab>
            <v-tab>
              <v-icon left>mdi-history</v-icon>
              {{ $t("recursos.eventos.pasados") }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="eventTab">
            <v-tab-item>
              <!-- Eventos próximos -->
              <v-row>
                <v-col
                  v-for="(evento, index) in eventosProximos"
                  :key="'proximo-'+index"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-hover v-slot="{ hover }">
                    <v-card
                      class="hover-card mx-auto"
                      :elevation="hover ? 12 : 4"
                      max-width="400"
                    >
                      <v-img
                        :src="evento.img"
                        height="200"
                        class="card-img"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      >
                        <v-chip class="ma-2" color="green" text-color="white" small>
                          <v-icon small left>mdi-alarm</v-icon>
                          {{ $t("recursos.etiquetas.proximo") }}
                        </v-chip>
                        <v-card-title class="white--text" style="position: absolute; bottom: 0;">
                          {{ $t(evento.titulo) }}
                        </v-card-title>
                      </v-img>
                      <v-card-subtitle class="px-4 pt-4">
                        <div>
                          <v-icon small color="grey">mdi-calendar</v-icon>
                          {{ formatDate(evento.fecha) }}
                        </div>
                        <div v-if="evento.lugar" class="mt-1">
                          <v-icon small color="grey">mdi-map-marker</v-icon>
                          {{ $t(evento.lugar) }}
                        </div>
                      </v-card-subtitle>
                      <v-card-text class="px-4 pb-0">
                        <p>{{ $t(evento.descripcionCorta) }}</p>
                      </v-card-text>
                      <v-card-actions class="px-4">
                        <v-btn
                          v-if="evento.registro"
                          :href="evento.registro"
                          target="_blank"
                          color="secondary"
                          text
                          class="font-weight-bold"
                        >
                          {{ $t("recursos.acciones.registrarse") }}
                          <v-icon right>mdi-account-arrow-right</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          icon
                          @click="evento.expandido = !evento.expandido"
                        >
                          <v-icon>{{ evento.expandido ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                      </v-card-actions>
                      <v-expand-transition>
                        <div v-if="evento.expandido">
                          <v-divider></v-divider>
                          <v-card-text class="text--secondary px-4">
                            {{ $t(evento.descripcionLarga) }}
                            <div v-if="evento.programa" class="mt-3">
                              <h4 class="subtitle-1">{{ $t("recursos.eventos.programa") }}:</h4>
                              <ul>
                                <li v-for="(item, i) in evento.programa" :key="i">{{ item.item }}</li>
                              </ul>
                            </div>
                          </v-card-text>
                        </div>
                      </v-expand-transition>
                    </v-card>
                  </v-hover>
                </v-col>
                <v-col v-if="eventosProximos.length === 0" cols="12" class="text-center py-10">
                  <v-icon large color="grey lighten-1">mdi-calendar-remove</v-icon>
                  <p class="subtitle-1 grey--text mt-3">{{ $t("recursos.eventos.sin_proximos") }}</p>
                </v-col>
              </v-row>
            </v-tab-item>

            <v-tab-item>
              <!-- Eventos pasados -->
              <v-row>
                <v-col
                  v-for="(evento, index) in eventosPasados"
                  :key="'pasado-'+index"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-hover v-slot="{ hover }">
                    <v-card
                      class="hover-card mx-auto"
                      :elevation="hover ? 12 : 4"
                      max-width="400"
                    >
                      <v-img
                        :src="evento.img"
                        height="200"
                        class="card-img"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      >
                        <v-chip class="ma-2" color="grey" text-color="white" small>
                          <v-icon small left>mdi-check-circle</v-icon>
                          {{ $t("recursos.etiquetas.realizado") }}
                        </v-chip>
                        <v-card-title class="white--text" style="position: absolute; bottom: 0;">
                          {{ $t(evento.titulo) }}
                        </v-card-title>
                      </v-img>
                      <v-card-subtitle class="px-4 pt-4">
                        <div>
                          <v-icon small color="grey">mdi-calendar</v-icon>
                          {{ formatDate(evento.fecha) }}
                        </div>
                        <div v-if="evento.lugar" class="mt-1">
                          <v-icon small color="grey">mdi-map-marker</v-icon>
                          {{ $t(evento.lugar) }}
                        </div>
                      </v-card-subtitle>
                      <v-card-text class="px-4 pb-0">
                        <p>{{ $t(evento.descripcionCorta) }}</p>
                        <div v-if="evento.asistentes" class="mt-2">
                          <v-chip small color="info" text-color="white">
                            <v-icon small left>mdi-account-group</v-icon>
                            {{ evento.asistentes }} {{ $t("recursos.eventos.participantes") }}
                          </v-chip>
                        </div>
                      </v-card-text>
                      <v-card-actions class="px-4">
                        <v-spacer></v-spacer>
                        <v-btn
                          icon
                          @click="evento.expandido = !evento.expandido"
                        >
                          <v-icon>{{ evento.expandido ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                      </v-card-actions>
                      <v-expand-transition>
                        <div v-if="evento.expandido">
                          <v-divider></v-divider>
                          <v-card-text class="text--secondary px-4">
                            {{ $t(evento.descripcionLarga) }}
                          </v-card-text>
                        </div>
                      </v-expand-transition>
                    </v-card>
                  </v-hover>
                </v-col>
                <v-col v-if="eventosPasados.length === 0" cols="12" class="text-center py-10">
                  <v-icon large color="grey lighten-1">mdi-calendar-blank</v-icon>
                  <p class="subtitle-1 grey--text mt-3">{{ $t("recursos.eventos.sin_pasados") }}</p>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-fade-transition>
    </v-container>
  </section>
</template>

<script>
export default {
  // Datos iniciales
  data() {
    return {
      activeSection: 'noticias',
      eventTab: 0,
      noticiasData: [],
      eventosData: [],
    };
  },
  mounted() {
    this.fetchRecursos();
  },
  watch: {
    '$i18n.locale'() {
      this.fetchRecursos();
    },
  },
  methods: {
    // Método para obtener los recursos de la API
    async fetchRecursos() {
      try {
        const idiomaActual = this.$i18n.locale || 'es';
        const baseURL = process.env.CMS_URL;
      //Consume la API para obtener noticias y eventos
        const response = await fetch(`${baseURL}/api/recursos?locale=${idiomaActual}`);
        const data = await response.json();

        // Separa noticias y eventos
        this.noticiasData = data.docs
          .filter(item => item.tipo === 'noticia')
          .map(item => ({
            ...item,
            img: item.img?.url ? `${baseURL}${item.img.url}` : '',
            expandido: false,
          }));

        this.eventosData = data.docs
          .filter(item => item.tipo === 'evento')
          .map(item => ({
            ...item,
            img: item.img?.url ?` ${baseURL}${item.img.url} `: '',
            expandido: false,
          }));
      } catch (error) {
        console.error('Error al obtener recursos:', error);
      }
    },
    // Método para formatear la fecha
    formatDate(date) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      };
      const locale = this.$i18n.locale === 'es' ? 'es-ES' : 'en-US';
      return new Date(date).toLocaleDateString(locale, options);
    }
  },
  //Filtra los eventos próximos y pasados
  computed: {
    eventosProximos() {
      return this.eventosData.filter(evento => new Date(evento.fecha) > new Date());
    },
    eventosPasados() {
      return this.eventosData.filter(evento => new Date(evento.fecha) <= new Date())
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    }
  },
  head() {
    return {
      title: `${this.$t('recursos.titulo')} - CIMA A.C.`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('recursos.descripcion')
        }
      ]
    }
  }
};
</script>

<style scoped>
.resources-section {
  padding: 40px 0;
  background-color: #f9f9f9;
}

.section-header {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title-main {
  font-size: 2.5rem;
  color: #035928;
  margin-bottom: 15px;
  font-weight: 700;
}

.custom-divider {
  background-color: #a65224 !important;
  height: 4px;
  width: 100px;
  margin: 0 auto 20px !important;
  opacity: 0.9;
}

.description-main {
  font-size: 1.2rem;
  color: #555;
  margin: 0 auto;
}

/* Estilo de navegación similar al navbar */
.section-nav {
  margin: 40px 0;
  display: flex;
  justify-content: center;
}

.nav-container {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  width: fit-content;
}

.nav-item {
  position: relative;
  padding: 12px 32px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  color: #555;
  transition: all 0.3s ease;
  margin: 0 20px;
}

.nav-item:hover {
  color: #035928;
}

.nav-item.active {
  color: #035928;
}

.nav-indicator {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #a65224;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-item.active .nav-indicator {
  transform: scaleX(1);
}

.section-title {
  color: #035928;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hover-card {
  border-radius: 12px !important;
  overflow: hidden;
  height: 100%;
  transition: all 0.3s ease;
  margin-bottom: 30px;
  border: none !important;
}

.hover-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.card-img {
  transition: transform 0.5s ease;
}

.hover-card:hover .card-img {
  transform: scale(1.05);
}

.v-card__title {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;
  padding-bottom: 0;
  word-break: break-word;
}

.v-card__subtitle {
  color: #666;
  padding-top: 8px;
  font-size: 0.9rem;
}

.v-card__text {
  color: #444;
  font-size: 1rem;
  line-height: 1.6;
}

.text--secondary {
  color: #555 !important;
  font-size: 0.95rem;
  line-height: 1.7;
}

/* Estilos para las pestañas de eventos */
.v-tabs {
  border-bottom: 1px solid #e0e0e0;
}

.v-tab {
  text-transform: none;
  letter-spacing: normal;
  font-weight: 600;
}

.v-tab--active {
  color: #035928 !important;
}

.v-tabs-slider {
  color: #a65224;
  height: 3px;
}

@media (max-width: 960px) {
  .title-main {
    font-size: 2rem;
  }
  .description-main {
    font-size: 1.1rem;
  }
  .section-title {
    font-size: 1.7rem;
  }
  .nav-item {
    padding: 10px 20px;
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .title-main {
    font-size: 1.8rem;
  }
  .description-main {
    font-size: 1rem;
  }
  .section-title {
    font-size: 1.5rem;
  }
  .section-title::after {
    width: 70px;
  }
  .nav-item {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>
