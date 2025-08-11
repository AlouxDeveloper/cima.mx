import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueI18n from "vue-i18n";
import flushPromises from "flush-promises";
import Initiatives from "../../pages/iniciativas.vue";

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueI18n);

describe("Integración: iniciativas.vue", () => {
  let vuetify;
  let i18n;

  const messages = {
    es: {
      iniciativas: {
        titulo: "Últimas Iniciativas",
        subtitulo: "Conoce nuestras acciones más recientes",
      },
    },
  };

  beforeEach(() => {
    vuetify = new Vuetify();
    i18n = new VueI18n({
      locale: "es",
      messages,
    });

    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            docs: [
              {
                titulo: "Iniciativa 1",
                descripcionCorta: "Breve descripción",
                descripcionLarga: "Descripción larga de la iniciativa",
                img: { url: "/img1.jpg" },
              },
            ],
          }),
      })
    );
  });

  it("renderiza correctamente título y subtítulo traducidos", async () => {
    const wrapper = mount(Initiatives, { localVue, vuetify, i18n });
    await flushPromises();

    expect(wrapper.text()).toContain("Últimas Iniciativas");
    expect(wrapper.text()).toContain("Conoce nuestras acciones más recientes");
  });

  it("renderiza una tarjeta con datos mockeados", async () => {
    const wrapper = mount(Initiatives, { localVue, vuetify, i18n });
    await flushPromises();

    const titles = wrapper.findAll("h3");
    expect(titles.at(0).text()).toBe("Iniciativa 1");

    const image = wrapper.find(".v-image__image");
    expect(image.exists()).toBe(true);
  });

  it("expande la descripción al hacer clic en el botón", async () => {
    const wrapper = mount(Initiatives, { localVue, vuetify, i18n });
    await flushPromises();

    const btn = wrapper.find(".v-btn");
    expect(btn.exists()).toBe(true);

    await btn.trigger("click");
    await flushPromises();

    expect(wrapper.text()).toContain("Descripción larga de la iniciativa");
  });
})
