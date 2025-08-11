<template>
  <div id="app">
    <!-- Hero Section -->
    <section>
      <v-container class="py-16">
        <h1 class="title-main">
          {{ $t("donaciones.titulo") }}
        </h1>

        <v-divider class="custom-divider my-4"></v-divider>
       <p class="description-main">
  {{ $t("donaciones.descripcion") }}
</p>
        <!-- iconos que indican que el sitio web es seguro-->
        <div class="d-flex flex-wrap mb-6">
          <v-chip
            color="white"
            text-color="green darken-2"
            small
            class="mr-3 mb-2"
          >
            <v-icon left small>mdi-shield-check</v-icon>
            {{ $t("donaciones.seguridad.seguro") }}
          </v-chip>
          <!-- <v-chip color="white" text-color="green darken-2" small class="mr-3 mb-2">
                <v-icon left small>mdi-check-circle</v-icon>
                {{ $t('donaciones.seguridad.deducible') }}
              </v-chip> -->
          <v-chip
            color="white"
            text-color="green darken-2"
            small
            class="mr-3 mb-2"
          >
            <v-icon left small>mdi-heart</v-icon>
            {{ $t("donaciones.seguridad.impacto") }}
          </v-chip>
        </div>
      </v-container>
    </section>

    <!-- CTA Section -->
    <v-container class="my-12">
      <v-card class="cta-card pa-8 text-center" elevation="8">
        <h2 class="subtitle">
          {{ $t("donaciones.cta.titulo") }}
        </h2>

        <lottie
          :options="defaultOptions"
          :height="200"
          :width="200"
          class="mx-auto mb-4"
        />

        <p class="text">{{ $t("donaciones.cta.mensaje1") }}</p>
        <p class="text">{{ $t("donaciones.cta.mensaje2") }}</p>
        <p class="subtitle">
          {{ $t("donaciones.cta.mensaje3") }}
        </p>

        <v-btn rounded @click="dialog = true">
          <v-icon left>mdi-heart</v-icon>
          {{ $t("donaciones.cta.boton") }}
        </v-btn>
      </v-card>
    </v-container>

    <!-- FAQ Section -->
    <section class="faq-section">
      <v-container class="my-12">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2
            class="title-main"
          >
            {{ $t("donaciones.faq.titulo") }}
          </h2>

          <v-divider class="custom-divider mb-4"></v-divider>
          <p class="description-main">
            {{ $t("donaciones.faq.subtitulo") }}
          </p>
        </div>

        <!-- FAQ Content - 2 Columns -->
        <v-row>
          <!-- panel izquierdo -->
          <v-col cols="12" md="6">
            <v-card class="faq-card pa-6" elevation="8">
              <v-expansion-panels multiple>
                <v-expansion-panel
                  v-for="(item, i) in leftFaqItems"
                  :key="'left-' + i"
                  class="mb-2"
                >
                  <v-expansion-panel-header
                    class="text-h6 font-weight-medium green--text text--darken-2"
                    expand-icon="mdi-chevron-down"
                  >
                    {{ $t(`donaciones.faq.preguntas.${item}.pregunta`) }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content
                    class="text-body-1 grey--text text--darken-1"
                  >
                    <p class="text-default">
                      {{ $t(`donaciones.faq.preguntas.${item}.respuesta`) }}
                    </p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>

          <!-- panel derecho -->
          <v-col cols="12" md="6">
            <v-card class="faq-card pa-6" elevation="8">
              <v-expansion-panels multiple>
                <v-expansion-panel
                  v-for="(item, i) in rightFaqItems"
                  :key="'right-' + i"
                  class="mb-2"
                >
                  <v-expansion-panel-header
                    class="text-h6 font-weight-medium green--text text--darken-2"
                    expand-icon="mdi-chevron-down"
                  >
                    {{ $t(`donaciones.faq.preguntas.${item}.pregunta`) }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content
                    class="text-body-1 grey--text text--darken-1"
                  >
                    <p class="text-default">
                      {{ $t(`donaciones.faq.preguntas.${item}.respuesta`) }}
                    </p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- Modal de Donación -->
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card class="donation-modal">
        <v-card-title class="text-center pa-6 green lighten-5">
          <div class="w-100 text-center">
            <v-icon color="green darken-2" size="40" class="mb-2"
              >mdi-heart</v-icon
            >
            <h2 class="text-h5 green--text text--darken-2">
              {{ $t("donaciones.formulario.titulo") }}
            </h2>
          </div>
        </v-card-title>

        <v-card-text class="pa-6">
          <v-form @submit.prevent="pagarConStripe">
            <!-- Datos personales -->
            <div class="mb-6">
              <h3 class="text-h6 font-weight-medium mb-4 d-flex align-center">
                <v-icon color="green darken-2" class="mr-2">mdi-account</v-icon>
                {{ $t("donaciones.formulario.datos_personales") }}
              </h3>

              <v-text-field
                v-model="nombre"
                :label="$t('donaciones.formulario.nombre')"
                outlined
                dense
                class="mb-2"
                :error-messages="errores.nombre"
              />

              <v-text-field
                v-model="correo"
                :label="$t('donaciones.formulario.correo')"
                type="email"
                outlined
                dense
                class="mb-2"
                :error-messages="errores.correo"
              />

              <vue-phone-number-input
                ref="phoneInput"
                v-model="telefono"
                default-country="MX"
                :placeholder="$t('donaciones.formulario.telefono')"
                class="mb-2"
              />
              <div v-if="errores.telefono" class="campo-error">
                {{ errores.telefono }}
              </div>
            </div>

            <!-- Selección de monto -->
            <div class="mb-6">
              <h3 class="text-h6 font-weight-medium mb-4 d-flex align-center">
                <v-icon color="green darken-2" class="mr-2"
                  >mdi-credit-card</v-icon
                >
                {{ $t("donaciones.formulario.monto") }}
              </h3>

              <v-row dense class="mb-4">
                <v-col v-for="(monto, i) in montos" :key="i" cols="6" sm="3">
                  <v-btn
                    block
                    :color="
                      montoSeleccionado === monto
                        ? 'green darken-2'
                        : 'grey lighten-2'
                    "
                    :dark="montoSeleccionado === monto"
                    @click="
                      montoSeleccionado = monto;
                      otro = '';
                    "
                    class="amount-btn"
                  >
                    {{ monto }}
                  </v-btn>
                </v-col>
              </v-row>

              <v-text-field
                v-model="otro"
                :label="$t('donaciones.formulario.otro_monto')"
                type="number"
                outlined
                dense
                @input="montoSeleccionado = ''"
                :error-messages="errores.monto"
              />
            </div>

            <!-- Comentario -->
            <div class="mb-6">
              <h3 class="text-h6 font-weight-medium mb-4">
                {{ $t("donaciones.formulario.comentario") }}
              </h3>
              <v-textarea
                v-model="comentario"
                :placeholder="
                  $t('donaciones.formulario.comentario_placeholder')
                "
                outlined
                dense
                rows="3"
              />
            </div>

            <!-- Mensaje de seguridad -->
            <v-alert type="info" outlined class="mb-4" border="left">
              <div class="d-flex align-center">
                <v-icon color="blue" class="mr-2">mdi-lock</v-icon>
                <div>
                  <div class="font-weight-medium">
                    {{ $t("donaciones.formulario.seguridad_mensaje") }}
                  </div>
                  <div class="text-caption">
                    {{ $t("donaciones.formulario.seguridad_descripcion") }}
                  </div>
                </div>
              </div>
            </v-alert>

            <!-- Mensajes de error/éxito -->
            <v-alert
              v-if="mensajeError"
              type="error"
              class="mb-4"
              dense
              border="left"
            >
              <v-icon left>mdi-alert-circle</v-icon>
              {{ mensajeError }}
            </v-alert>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-btn text large @click="dialog = false" class="flex-grow-1">
            {{ $t("donaciones.formulario.cancelar") }}
          </v-btn>
          <v-btn
          class="btn-donar flex-grow-1"
            color="green darken-2"
            dark
            large
            @click="pagarConStripe"
            :loading="loading"
          >
            <v-icon left>mdi-heart</v-icon>
            {{ $t("donaciones.formulario.donar") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de agradecimiento -->
    <v-dialog v-model="messageThanks" max-width="500">
      <messageThanks @cerrar="messageThanks = false" />
    </v-dialog>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import Lottie from "vue-lottie";
import animacion from "@/assets/gif/Animation - 1749592877393";
import messageThanks from "@/components/messageThanks.vue";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

export default {
  components: {
    Lottie,
    messageThanks,
    VuePhoneNumberInput,
  },
  computed: {
    isValidPhone() {
      return this.$refs.phoneInput ? this.$refs.phoneInput.isValid() : false;
    },
  },
  name: "DonacionForm",
  data() {
    return {
      titulo: "CIMA A.C.",
      faqItems: [
        "uso",
        "proyectos",
        "seguridad",
        "datos",
        "fiscal",
        "recibo",
        "beneficios",
        "contacto",
      ],

      // Campos del formulario
      nombre: "",
      correo: "",
      telefono: "",
      montos: ["$50", "$100", "$200", "$500"],
      montoSeleccionado: "",
      otro: "",
      comentario: "",

      // Mensajes y estados
      mensaje: "",
      mensajeError: "",
      loading: false,

      // Errores por campo
      errores: {
        nombre: "",
        correo: "",
        telefono: "",
        monto: "",
      },

      // Animación
      defaultOptions: {
        animationData: animacion,
        loop: false,
        autoplay: true,
      },

      // Modales
      dialog: false,
      messageThanks: false,
    };
  },
  methods: {
 async pagarConStripe() {
  this.loading = true;
  this.mensajeError = "";
  this.errores = { nombre: "", correo: "", telefono: "", monto: "" };

  // Validaciones
  if (!this.nombre) {
    this.errores.nombre = this.$t("donaciones.errores.nombre_requerido");
  } else if (this.nombre.length < 4) {
    this.errores.nombre = this.$t("donaciones.errores.nombre_corto");
  }

  if (!this.correo) {
    this.errores.correo = this.$t("donaciones.errores.correo_requerido");
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(this.correo)) {
    this.errores.correo = this.$t("donaciones.errores.correo_invalido");
  }

  // Validación teléfono
  let telefonoLimpio = "";
  if (
    typeof this.telefono === "object" &&
    this.telefono &&
    typeof this.telefono.nationalNumber === "string" &&
    this.telefono.nationalNumber.trim() !== ""
  ) {
    telefonoLimpio = this.telefono.nationalNumber.replace(/\D/g, "");
  } else if (typeof this.telefono === "string") {
    telefonoLimpio = this.telefono.replace(/\D/g, "");
  }

  if (!telefonoLimpio) {
    this.errores.telefono = this.$t("donaciones.errores.telefono_requerido");
  } else if (telefonoLimpio.length !== 10) {
    this.errores.telefono = this.$t("donaciones.errores.telefono_invalido");
  }

  // Validación monto
  let monto = 0;
  if (this.montoSeleccionado) {
    monto = parseInt(this.montoSeleccionado.replace(/\D/g, "")) * 100;
  } else if (this.otro) {
    monto = parseInt(this.otro.replace(/\D/g, "")) * 100;
  }

  if (!monto || monto <= 0) {
    this.errores.monto = this.$t("donaciones.errores.monto_requerido");
  }

  // Si hay errores, no continuar
  if (Object.values(this.errores).some((e) => e)) {
    this.loading = false;
    return;
  }

  try {
    const data = await this.$axios.$post("/api/payments/create-checkout-session", {
      amount: monto,
      nombre: this.nombre,
      correo: this.correo,
      telefono: telefonoLimpio,
      comentario: this.comentario,
    });

    if (!this.$config.stripePublicKey) {
      this.mensajeError = "No se encontró la clave pública de Stripe.";
      this.loading = false;
      return;
    }
    if (!data || !data.id) {
      this.mensajeError = "No se pudo iniciar el pago. Intenta más tarde.";
      this.loading = false;
      return;
    }

    const stripe = await loadStripe(this.$config.stripePublicKey);
    await stripe.redirectToCheckout({ sessionId: data.id });

    // Limpiar campos
    this.nombre = "";
    this.correo = "";
    this.telefono = "";
    this.montoSeleccionado = "";
    this.otro = "";
    this.comentario = "";
  } catch (error) {
    console.error(error);
    this.mensajeError = "No se pudo conectar con el servidor. Intenta más tarde.";
  } finally {
    this.loading = false;
  }
}
    /*
    este es el codigo que es el que estaba antes de las pruebas
    async pagarConStripe() {
      this.loading = true;
      this.mensajeError = "";
      this.errores = { nombre: "", correo: "", telefono: "", monto: "" };

      // Validaciones
      if (!this.nombre) {
        this.errores.nombre = this.$t("donaciones.errores.nombre_requerido");
      } else if (this.nombre.length < 4) {
        this.errores.nombre = this.$t("donaciones.errores.nombre_corto");
      }

      if (!this.correo) {
        this.errores.correo = this.$t("donaciones.errores.correo_requerido");
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(this.correo)) {
        this.errores.correo = this.$t("donaciones.errores.correo_invalido");
      }

      // Validación de teléfono
      let telefonoLimpio = "";
      if (
        typeof this.telefono === "object" &&
        this.telefono &&
        typeof this.telefono.nationalNumber === "string" &&
        this.telefono.nationalNumber.trim() !== ""
      ) {
        telefonoLimpio = this.telefono.nationalNumber.replace(/\D/g, "");
      } else if (typeof this.telefono === "string") {
        telefonoLimpio = this.telefono.replace(/\D/g, "");
      }

      if (!telefonoLimpio) {
        this.errores.telefono = this.$t(
          "donaciones.errores.telefono_requerido"
        );
        this.loading = false;
        return;
      } else if (telefonoLimpio.length !== 10) {
        this.errores.telefono = this.$t("donaciones.errores.telefono_invalido");
        this.loading = false;
        return;
      }

      // Validación de monto
      let monto = this.montoSeleccionado
        ? parseInt(this.montoSeleccionado.replace("$", "")) * 100
        : parseInt(this.otro) * 100;

      if (!monto || monto <= 0) {
        this.errores.monto = this.$t("donaciones.errores.monto_requerido");
        this.loading = false;
        return;
      }

      // Si hay errores, no continuar
      if (Object.values(this.errores).some((e) => e)) {
        this.loading = false;
        return;
      }

console.log('Validaciones OK, enviando petición a backend')

      try {
        // Llamada al backend usando $axios de Nuxt
        const data = await this.$axios.$post('/api/payments/create-checkout-session', {
          amount: monto,
          nombre: this.nombre,
          correo: this.correo,
          telefono: telefonoLimpio,
          comentario: this.comentario,
        });

        // Verifica que la clave pública esté presente
        console.log('Stripe Public Key:', this.$config.stripePublicKey);

        // Redirigir a Stripe solo si hay clave y data.id
        if (!this.$config.stripePublicKey) {
          this.mensajeError = "No se encontró la clave pública de Stripe.";
          return;
        }
        if (!data || !data.id) {
          this.mensajeError = "No se pudo iniciar el pago. Intenta más tarde.";
          return;
        }

        const stripe = await loadStripe(this.$config.stripePublicKey);
        await stripe.redirectToCheckout({ sessionId: data.id });

        // Limpiar campos
        this.nombre = "";
        this.correo = "";
        this.telefono = "";
        this.montoSeleccionado = "";
        this.otro = "";
        this.comentario = "";
      } catch (error) {
        console.error(error); // <-- Para ver el error real
        this.mensajeError =
          "No se pudo conectar con el servidor. Intenta más tarde.";
      } finally {
        this.loading = false;
      }
    },*/
  },
  head() {
    return {
      title: `${this.$t("donaciones.titulo")} - CIMA A.C.`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("donaciones.subtitulo"),
        },
      ],
    };
  },
  computed: {
    leftFaqItems() {
      return this.faqItems.slice(0, Math.ceil(this.faqItems.length / 2));
    },
    rightFaqItems() {
      return this.faqItems.slice(Math.ceil(this.faqItems.length / 2));
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

// Variables
$primary: #035928;
$accent: #a65224;
$text-muted: #555555;

* {
  font-family: "Poppins", sans-serif !important;
}
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%);
  min-height: 500px;
  display: flex;
  align-items: center;
  .custom-divider {
    width: 50rem; // Más ancho solo para el hero
    @media (max-width: 960px) {
      width: 80%; // Más responsive en móviles
    }
}
}
.subtitle {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1ca63f;
  margin: 1rem 0;
  text-align: center;
}
.text {
  font-size: 1rem;
  color: #2a2a2a;
  line-height: 1.6;
}
/* CTA Card */
.cta-card {
  background: linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%);
  border: 2px solid #4caf50;
  border-radius: 20px;
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

/* Modal de donación */
.donation-modal {
  border-radius: 16px;
  overflow: hidden;
}

.amount-btn {
  height: 48px !important;
  border-radius: 8px;
  font-weight: 600;
}

/* Campo de error */
.campo-error {
  color: #d32f2f;
  background: #ffd6d6;
  border-radius: 4px;
  font-size: 0.875em;
  margin-top: 4px;
  margin-bottom: 8px;
  padding: 4px 8px;
}
.v-btn {
  display: block;
  margin-left: auto;
  margin-right: auto;

  background-color: $primary !important;
  color: white !important;
  top: -10px;
  position: relative;
}

.custom-divider {
  background-color: $accent !important;
  height: 0.25rem;
  width: 50rem;
  margin: 1rem auto;
  border-radius: 0.125rem;
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 960px) {
  .hero-section {
    min-height: 400px;
  }
}
</style>
