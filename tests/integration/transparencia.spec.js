import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import { createLocalVue, mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Transparencia from '../../pages/transparencia.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(VueI18n);

// Mensajes de prueba (mínimos) para que $t funcione
const messages = {
  es: {
    transparencia: {
      categorias: {
        Legal: "Legal",
        Financiero: "Financiero",
        Informativo: "Informativo",
      }
    }
  }
};

const i18n = new VueI18n({
  locale: 'es',
  fallbackLocale: 'es',
  messages,
});

describe('Transparencia.vue', () => {
  let vuetify;

  const mockDocs = [
    {
      nombre: 'Documento Legal 1',
      categoria: 'Legal',
      img: { url: '/uploads/legal1.png' },
      archivo: { url: '/uploads/legal1.pdf' },
    },
    {
      nombre: 'Documento Financiero 1',
      categoria: 'Financiero',
      img: { url: '/uploads/fin1.png' },
      archivo: { url: '/uploads/fin1.xlsx' },
    },
  ];

  beforeEach(() => {
    vuetify = new Vuetify({
      icons: {
        iconfont: 'mdi',
      },
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ docs: mockDocs }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('muestra documentos agrupados por categoría', async () => {
    const wrapper = mount(Transparencia, {
      localVue,
      vuetify,
      i18n,
      attachTo: document.body,
    });

    await flushPromises();

    expect(wrapper.text()).toContain('Legal');
    expect(wrapper.text()).toContain('Financiero');
    expect(wrapper.text()).toContain('Informativo');

    expect(wrapper.text()).toContain('Documento Legal 1');
    expect(wrapper.text()).toContain('Documento Financiero 1');

    const buttons = wrapper.findAll('a.v-btn');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('muestra mensaje cuando no hay documentos', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ docs: [] }),
      })
    );

    const wrapper = mount(Transparencia, {
      localVue,
      vuetify,
      i18n,
      attachTo: document.body,
    });

    await flushPromises();

    expect(wrapper.text()).toContain('No hay documentos disponibles');
  });
});
