import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount, createLocalVue } from '@vue/test-utils';
import Recursos from '../../pages/recursos.vue';

Vue.use(Vuetify); // Registrar Vuetify globalmente

const localVue = createLocalVue();

describe('Recursos.vue', () => {
  let vuetify;
  let fetchMock;

  // Datos mock para los tests
  const mockData = {
    docs: [
      {
        tipo: 'noticia',
        img: { url: '/noticia1.jpg' },
        titulo: 'recursos.noticias.ejemplo_titulo',
        descripcionCorta: 'recursos.noticias.ejemplo_descripcion_corta',
        descripcionLarga: 'recursos.noticias.ejemplo_descripcion_larga',
        fecha: new Date().toISOString(),
        nuevo: true,
      },
      {
        tipo: 'evento',
        img: { url: '/evento1.jpg' },
        titulo: 'recursos.eventos.ejemplo_titulo',
        descripcionCorta: 'recursos.eventos.ejemplo_descripcion_corta',
        descripcionLarga: 'recursos.eventos.ejemplo_descripcion_larga',
        fecha: new Date(Date.now() + 86400000).toISOString(), // evento futuro
        lugar: 'recursos.eventos.lugar_ejemplo',
        registro: 'https://registro.evento.com',
        programa: [{ item: 'Actividad 1' }, { item: 'Actividad 2' }],
      },
      {
        tipo: 'evento',
        img: { url: '/evento2.jpg' },
        titulo: 'recursos.eventos.ejemplo_titulo_pasado',
        descripcionCorta: 'recursos.eventos.ejemplo_descripcion_corta_pasado',
        descripcionLarga: 'recursos.eventos.ejemplo_descripcion_larga_pasado',
        fecha: new Date(Date.now() - 86400000).toISOString(), // evento pasado
        lugar: 'recursos.eventos.lugar_ejemplo_pasado',
      },
    ],
  };

  const mocks = {
    $t: (msg) => msg,
    $i18n: { locale: 'es' },
  };

  beforeEach(() => {
    vuetify = new Vuetify({
      icons: {
        iconfont: 'mdi',
      },
    });

    // Mock global de fetch para simular llamada API
    fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  it('renderiza el título principal y descripción', () => {
    const wrapper = mount(Recursos, {
      localVue,
      vuetify,
      mocks,
    });

    expect(wrapper.text()).toContain('recursos.titulo');
    expect(wrapper.text()).toContain('recursos.descripcion');
  });

  it('carga y muestra noticias', async () => {
    const wrapper = mount(Recursos, {
      localVue,
      vuetify,
      mocks,
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const noticias = wrapper.findAll('.v-card');
    expect(noticias.length).toBeGreaterThan(0);
    expect(wrapper.text()).toContain('recursos.noticias.ejemplo_titulo');
  });

  it('muestra mensaje cuando no hay eventos próximos', async () => {
    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            docs: mockData.docs.filter(
              (d) => d.tipo === 'evento' && new Date(d.fecha) <= new Date()
            ),
          }),
      })
    );

    const wrapper = mount(Recursos, {
      localVue,
      vuetify,
      mocks,
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    await wrapper.setData({ activeSection: 'eventos' });
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('recursos.eventos.sin_proximos');
  });

  it('cambia entre pestañas noticias y eventos y cambia pestañas de eventos', async () => {
    const wrapper = mount(Recursos, {
      localVue,
      vuetify,
      mocks,
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    await wrapper.setData({ activeSection: 'eventos' });
    await wrapper.vm.$nextTick();

    const tabs = wrapper.findAll('.v-tab');
    expect(tabs.length).toBeGreaterThan(1);

    await tabs.at(1).trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.eventTab).toBe(1);
  });

  it('actualiza traducciones al cambiar idioma', async () => {
    const wrapper = mount(Recursos, {
      localVue,
      vuetify,
      mocks,
    });

    await wrapper.vm.$nextTick();

    wrapper.vm.$i18n.locale = 'en';
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('recursos.titulo');
  });
  }); 
