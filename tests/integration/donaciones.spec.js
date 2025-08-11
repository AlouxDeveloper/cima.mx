// tests/integration/donaciones.spec.js
import Vue from "vue";
import Vuetify from "vuetify";
import VueI18n from "vue-i18n";
import { createLocalVue, mount } from "@vue/test-utils";
import Donaciones from "../../pages/donaciones.vue";

const localVue = createLocalVue();
localVue.use(VueI18n);

Vue.use(Vuetify);

const messages = {
  donaciones: {
    titulo: "Donaciones",
    descripcion: "Descripción para donaciones.",
    seguridad: {
      seguro: "Sitio seguro",
      impacto: "Impacto positivo",
    },
    cta: {
      titulo: "Haz tu donación",
      mensaje1: "Mensaje 1",
      mensaje2: "Mensaje 2",
      mensaje3: "Mensaje 3",
      boton: "Donar",
    },
    faq: {
      titulo: "Preguntas frecuentes",
      subtitulo: "Respuestas a dudas comunes",
      preguntas: {
        uso: {
          pregunta: "¿Cómo se usan las donaciones?",
          respuesta: "Se usan para proyectos sociales.",
        },
        proyectos: {
          pregunta: "¿Qué proyectos apoyan?",
          respuesta: "Apoyamos educación y salud.",
        },
        seguridad: {
          pregunta: "¿Es seguro donar aquí?",
          respuesta: "Sí, usamos tecnología segura.",
        },
        datos: {
          pregunta: "¿Qué datos se recopilan?",
          respuesta: "Nombre, correo, teléfono.",
        },
        fiscal: {
          pregunta: "¿Se da recibo fiscal?",
          respuesta: "Sí, para deducción de impuestos.",
        },
        recibo: {
          pregunta: "¿Cómo recibo mi comprobante?",
          respuesta: "Por correo electrónico.",
        },
        beneficios: {
          pregunta: "¿Qué beneficios tengo?",
          respuesta: "Beneficios fiscales y sociales.",
        },
        contacto: {
          pregunta: "¿Cómo contacto a CIMA?",
          respuesta: "Por email o teléfono.",
        },
      },
    },
    formulario: {
      titulo: "Formulario de donación",
      datos_personales: "Datos personales",
      nombre: "Nombre completo",
      correo: "Correo electrónico",
      telefono: "Teléfono",
      monto: "Monto a donar",
      otro_monto: "Otro monto",
      comentario: "Comentario",
      comentario_placeholder: "Escribe un comentario (opcional)",
      seguridad_mensaje: "Pago seguro con Stripe",
      seguridad_descripcion: "Tus datos están protegidos.",
      cancelar: "Cancelar",
      donar: "Donar",
    },
    errores: {
      nombre_requerido: "El nombre es obligatorio",
      nombre_corto: "El nombre debe tener al menos 4 caracteres",
      correo_requerido: "El correo es obligatorio",
      correo_invalido: "El correo no es válido",
      telefono_requerido: "El teléfono es obligatorio",
      telefono_invalido: "El teléfono no es válido",
      monto_requerido: "El monto es obligatorio",
    },
  },
};

const i18n = new VueI18n({
  locale: "es",
  messages: { es: messages },
});

function createVuetify() {
  return new Vuetify({
    icons: {
      iconfont: "mdi",
    },
  });
}

function mountComponent() {
  const vuetify = createVuetify();
  return mount(Donaciones, {
    localVue,
    vuetify,
    i18n,
    attachTo: document.body, // importante para que funcione correctamente Vuetify
  });
}

describe("Integración: donaciones.vue", () => {
  test("renderiza título y descripción correctamente", () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain(messages.donaciones.titulo);
    expect(wrapper.text()).toContain(messages.donaciones.descripcion);
  });

  test("abre modal al hacer clic en botón 'Donar'", async () => {
    const wrapper = mountComponent();
    const botonDonar = wrapper.find("button");
    expect(botonDonar.exists()).toBe(true);
    await botonDonar.trigger("click");
    await Vue.nextTick();
    expect(wrapper.vm.dialog).toBe(true);
  });

  test("muestra errores al intentar enviar formulario vacío", async () => {
  const wrapper = mountComponent();

  // Abrir modal
  const botonAbrir = wrapper.find("button");
  await botonAbrir.trigger("click");
  await Vue.nextTick();

  // Llamar directamente al método de validación
  await wrapper.vm.pagarConStripe();
  await Vue.nextTick();

  // Verifica los errores después de que corrió la función
  expect(wrapper.vm.errores.nombre).toBe(messages.donaciones.errores.nombre_requerido);
  expect(wrapper.vm.errores.correo).toBe(messages.donaciones.errores.correo_requerido);
  expect(wrapper.vm.errores.telefono).toBe(messages.donaciones.errores.telefono_requerido);
  expect(wrapper.vm.errores.monto).toBe(messages.donaciones.errores.monto_requerido);
});
})
