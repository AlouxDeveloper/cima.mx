<template>
  <v-main>
    <!-- Hero Section -->
    <section class="section-header">
      <h1 class="title-main">
        {{ $t("nosotros.hero.titulo") }}
      </h1>
      <v-divider class="custom-divider my-4"></v-divider>
      <p class="description-main">
        {{ $t("nosotros.hero.subtitulo") }}
      </p>
    </section>
    <v-container class="pa-0 section-spacing">
      <!-- Misión y Visión -->
      <section class="mb-16">
        <!-- Misión -->
        <v-row class="align-center mb-12" no-gutters>
          <v-col cols="12" md="6" class="pa-4">
            <div class="d-flex align-center mb-4">
              <v-icon color="green darken-2" size="40" class="mr-3"
                >mdi-target</v-icon
              >
              <h1 class="title-main">{{ $t("nosotros.mision.titulo") }}</h1>
            </div>
            <p class="description-main">
              {{ $t("nosotros.mision.texto") }}
            </p>
          </v-col>
          <v-col cols="12" md="6" class="pa-4">
            <v-hover v-slot="{ hover }">
              <v-img
                src="/img/crecer.jpg"
                alt="Imagen Misión"
                height="400"
                class="rounded-xl elevation-8 image-hover"
                :class="{ 'image-scale': hover }"
              />
            </v-hover>
          </v-col>
        </v-row>

        <!-- Visión -->
        <v-row class="align-center mb-12" no-gutters>
          <v-col cols="12" md="6" order="2" order-md="1" class="pa-4">
            <v-hover v-slot="{ hover }">
              <v-img
                src="/img/participacion.jpg"
                alt="Imagen Visión"
                height="400"
                class="rounded-xl elevation-8 image-hover"
                :class="{ 'image-scale': hover }"
              />
            </v-hover>
          </v-col>
          <v-col cols="12" md="6" order="1" order-md="2" class="pa-4">
            <div class="d-flex align-center mb-4">
              <v-icon color="green darken-2" size="40" class="mr-3"
                >mdi-eye</v-icon
              >
              <h1 class="title-main">{{ $t("nosotros.vision.titulo") }}</h1>
            </div>
            <p class="description-main">
              {{ $t("nosotros.vision.descripcion") }}
            </p>
            <ul class="vision-points">
              <li>{{ $t("nosotros.vision.punto1") }}</li>
              <li>{{ $t("nosotros.vision.punto2") }}</li>
              <li>{{ $t("nosotros.vision.punto3") }}</li>
              <li>{{ $t("nosotros.vision.punto4") }}</li>
              <li>{{ $t("nosotros.vision.punto5") }}</li>
              <li>{{ $t("nosotros.vision.punto6") }}</li>
            </ul>
          </v-col>
        </v-row>
      </section>

      <!-- Valores -->
      <section class="section-header">
        <div class="text-center mb-12">
          <h1 class="title-main">{{ $t("nosotros.valores.titulo") }}</h1>
          <v-divider class="custom-divider my-4"></v-divider>
          <p class="description-main">
            {{ $t("nosotros.valores.subtitulo") }}
          </p>
        </div>

        <v-row>
          <v-col
            v-for="(valor, i) in valores"
            :key="i"
            cols="12"
            sm="6"
            md="4"
            class="mb-4"
          >
            <v-card class="valor-card pa-6 text-center h-100" elevation="2">
              <v-avatar size="80" :color="valor.color" class="mb-4">
                <v-icon size="40" color="white">{{ valor.icono }}</v-icon>
              </v-avatar>
              <h3 class="decription-main" :style="{ color: valor.color }">
                {{ $t(valor.texto) }}
              </h3>
              <p class="tecte-default">
                {{ $t(valor.descripcion) }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Agenda 2030 -->
      <section class="section-header">
        <div class="text-center mb-12">
          <h1 class="title-main">{{ $t("nosotros.ods.titulo") }}</h1>
          <v-divider class="custom-divider my-4"></v-divider>
          <p class="description-main">
            {{ $t("nosotros.ods.subtitulo") }}
          </p>
        </div>

        <v-row>
          <v-col
            v-for="(ods, i) in odsList"
            :key="i"
            cols="12"
            sm="6"
            md="4"
            class="mb-3"
          >
            <v-card class="ods-card-new mb-4">
              <div class="ods-header-new" @click="toggleItem(i)">
                <v-avatar size="32" class="ods-number">
                  {{ i + 1 }}
                </v-avatar>
                <span class="ods-title-new">{{ $t(ods.titulo) }}</span>
                <v-icon class="expand-icon" color="#035928">
                  {{
                    activeIndex === i ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}
                </v-icon>
              </div>

              <v-expand-transition>
                <div v-if="activeIndex === i" class="ods-content-new px-4 pb-4">
                  <p>{{ $t(ods.descripcion) }}</p>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Equipo -->
      <section class="section-header">
        <div class="text-center mb-12">
          <h1 class="title-main">{{ $t("nosotros.equipo.titulo") }}</h1>
          <v-divider class="custom-divider my-4"></v-divider>
          <p class="description-main">
            {{ $t("nosotros.equipo.descripcion") }}
          </p>
        </div>

        <v-row>
          <v-col
            v-for="(miembro, index) in miembros"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            class="mb-6"
          >
            <v-card class="team-card" elevation="2">
              <div class="image-container">
                <v-img :src="miembro.imagen" height="250" class="team-image">
                  <template v-slot:placeholder>
                    <v-skeleton-loader type="image"></v-skeleton-loader>
                  </template>
                </v-img>
              </div>
              <v-card-text class="text-center pa-6">
                <h3 class="title-section">
                  {{ $t(miembro.titulo) }}
                </h3>
                <!--
                  <v-chip
                    small
                    outlined
                    color="green darken-2"
                    class="mb-3"
                  >
                    {{ $t(miembro.rol) }}
                  </v-chip>-->
                <p class="text-default">
                  {{ $t(miembro.descripcion) }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: null,
      // Valores con descripciones
      valores: [
        {
          icono: "mdi-lightbulb-on-outline",
          texto: "nosotros.valores.innovacion",
          descripcion: "nosotros.valores.innovacion.descripcion",
          color: "#005977",
        },
        {
          icono: "mdi-hand-heart",
          texto: "nosotros.valores.solidaridad",
          descripcion: "nosotros.valores.solidaridad.descripcion",
          color: "#e3c77b",
        },
        {
          icono: "mdi-leaf",
          texto: "nosotros.valores.sostenibilidad",
          descripcion: "nosotros.valores.sostenibilidad.descripcion",
          color: "green",
        },
        {
          icono: "mdi-account-group",
          texto: "nosotros.valores.juventud",
          descripcion: "nosotros.valores.juventud.descripcion",
          color: "#6F9CA6",
        },
        {
          icono: "mdi-shield-check",
          texto: "nosotros.valores.transparencia",
          descripcion: "nosotros.valores.transparencia.descripcion",
          color: "#A65224",
        },
        {
          icono: "mdi-account-voice",
          texto: "nosotros.valores.inclusion",
          descripcion: "nosotros.valores.inclusion.descripcion",
          color: "#ff7c00",
        },
      ],
      // ODS
      odsList: [
        {
          titulo: "nosotros.ods.punto1",
          descripcion: "nosotros.ods.descripcion1",
        },
        {
          titulo: "nosotros.ods.punto2",
          descripcion: "nosotros.ods.descripcion2",
        },
        {
          titulo: "nosotros.ods.punto3",
          descripcion: "nosotros.ods.descripcion3",
        },
        {
          titulo: "nosotros.ods.punto4",
          descripcion: "nosotros.ods.descripcion4",
        },
        {
          titulo: "nosotros.ods.punto5",
          descripcion: "nosotros.ods.descripcion5",
        },
        {
          titulo: "nosotros.ods.punto6",
          descripcion: "nosotros.ods.descripcion6",
        },
        {
          titulo: "nosotros.ods.punto7",
          descripcion: "nosotros.ods.descripcion7",
        },
        {
          titulo: "nosotros.ods.punto8",
          descripcion: "nosotros.ods.descripcion8",
        },
        {
          titulo: "nosotros.ods.punto9",
          descripcion: "nosotros.ods.descripcion9",
        },
      ],
      // Miembros del equipo
      miembros: [
        {
          imagen: "/img/campañadental.jpg",
          titulo: "nosotros.miembros.presidente.titulo",
          rol: "nosotros.miembros.presidente.rol",
          descripcion: "nosotros.miembros.presidente.descripcion",
        },
        {
          imagen: "/img/campañadental.jpg",
          titulo: "nosotros.miembros.secretario.titulo",
          rol: "nosotros.miembros.secretario.rol",
          descripcion: "nosotros.miembros.secretario.descripcion",
        },
        {
          imagen: "/img/campañadental.jpg",
          titulo: "nosotros.miembros.tesorero.titulo",
          rol: "nosotros.miembros.tesorero.rol",
          descripcion: "nosotros.miembros.tesorero.descripcion",
        },
        {
          imagen: "/img/campañadental.jpg",
          titulo: "nosotros.miembros.operaciones.titulo",
          rol: "nosotros.miembros.operaciones.rol",
          descripcion: "nosotros.miembros.operaciones.descripcion",
        },
        {
          imagen: "/img/campañadental.jpg",
          titulo: "nosotros.miembros.comunicacion.titulo",
          rol: "nosotros.miembros.comunicacion.rol",
          descripcion: "nosotros.miembros.comunicacion.descripcion",
        },
        {
          imagen: "/img/campañadental.jpg",
          titulo: "nosotros.miembros.finanzas.titulo",
          rol: "nosotros.miembros.finanzas.rol",
          descripcion: "nosotros.miembros.finanzas.descripcion",
        },
      ],
    };
  },
  methods: {
    toggleItem(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
  head() {
    return {
      title: `${this.$t("nosotros.mision.titulo")} - CIMA A.C.`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("nosotros.mision.texto"),
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

// Global
* {
  font-family: "Poppins", sans-serif;
}

.section-title {
  font-size: 4rem;
  font-weight: 800;
  color: $primary;
  line-height: 1.2;
}

.line-height-relaxed {
  line-height: 1.8;
}

.image-hover {
  transition: transform 0.4s ease;
}

.image-scale {
  transform: scale(1.05);
}

.section-spacing {
  padding: 0 !important;
}

// Sección título
.section-header {
  padding: 0;
  text-align: center;
  margin-bottom: 3rem;

  .description-main {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .custom-divider {
    height: 6.25rem;
    background-color: $accent !important;
    width: 50rem;
    margin: 1rem auto;
  }

  // Visión
  .vision-points {
    list-style: none;
    padding-left: 0;
    font-family: "Poppins", sans-serif;

    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      line-height: 1.6;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.5rem;
        width: 0.5rem;
        height: 0.5rem;
        background-color: $secondary;
        border-radius: 50%;
      }
    }
  }

  // Valores
  .valor-card {
    border-radius: 1rem;
    transition: all 0.3s ease;
    padding: 1.5rem;
    height: 100%;
    padding: 0.5rem;

    &:hover {
      transform: translateY(-0.5rem);
      box-shadow: 0 0.75rem 1.25rem rgba(0, 0, 0, 0.15) !important;
    }
  }

  // ODS
  .ods-card-new {
    border-radius: 0.75rem;
    border: 1px solid #d3d3d3;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 1rem 1.25rem;
    height: 100%;

    &:hover {
      box-shadow: 0 6px 15px rgba(1, 115, 50, 0.25);
      transform: translateY(-4px);
    }

    .ods-header-new {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.75rem;
      padding: 12px;
      cursor: pointer;

      .ods-number {
        background-color: #027a32; /* verde oscuro */
        color: white;
        font-weight: 700;
        font-size: 1.2rem;
        width: 38px;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.25rem; /* caja con esquinas redondeadas pero no círculo */
        box-shadow: 0 2px 5px rgba(2, 122, 50, 0.4);
        flex-shrink: 0;
      }

      .ods-title-new {
        font-size: 1.125rem;
        font-weight: 700;
        color: #025923;
        line-height: 1.3;
        flex: 1;
        white-space: normal;
        overflow: visible;
        text-overflow: clip;
        word-break: break-word;
        /* user-select: none;*/
      }
    }

    .ods-content-new {
      font-size: 1rem;
      line-height: 1.6;
      color: #444;
      flex-grow: 1;
      user-select: text;

      p {
        margin: 0;
      }
    }
  }

  @media (max-width: 600px) {
    .ods-card-new {
      padding: 0.75rem 1rem;

      .ods-header-new {
        gap: 0.75rem;

        .ods-number {
          width: 32px;
          height: 32px;
          font-size: 1rem;
        }

        .ods-title-new {
          font-size: 1rem;
        }
      }

      .ods-content-new {
        font-size: 0.95rem;
      }
    }
  }

  // RESPONSIVE ADAPTATION
  @media (max-width: 600px) {
    .ods-header-new {
      flex-direction: column;
      align-items: flex-start;

      .ods-title-new {
        font-size: 1rem;
        text-align: left;
      }

      .expand-icon {
        align-self: flex-end;
      }
    }

    .ods-content-new p {
      font-size: 0.95rem;
    }
  }

  // Equipo
  .team-card {
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;
    height: 100%;

    &:hover {
      transform: translateY(-0.625rem);
      box-shadow: 0 1.25rem 2.5rem rgba(0, 0, 0, 0.1) !important;

      .team-image {
        transform: scale(1.1);
      }
    }
    .title-section {
      font-size: 1.1rem;
      font-weight: 600;
      color: $primary;
      margin: 1rem 0;
      text-align: center;
    }
  }

  .image-container {
    overflow: hidden;
  }

  .team-image {
    transition: transform 0.5s ease;
  }

  // Responsive
  @media (max-width: 60rem) {
    .section-title {
      font-size: 2rem;
    }
  }
}
</style>
