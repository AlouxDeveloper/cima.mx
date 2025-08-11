import Vue from 'vue'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import { mount } from '@vue/test-utils'
import Index from '../../pages/index.vue'
import es from '../../locales/es.json'

Vue.use(Vuetify)
Vue.use(VueI18n)

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      docs: [
        { imagen: { url: '/img1.jpg' } },
        { imagen: { url: '/img2.jpg' } },
        { imagen: { url: '/img3.jpg' } },
      ],
    }),
  })
)

const stubVIcon = {
  name: 'v-icon',
  render(h) { return h('span') },
}

describe('Integración: pages/index.vue', () => {
  let vuetify
  let i18n

  beforeEach(() => {
    vuetify = new Vuetify()
    i18n = new VueI18n({
      locale: 'es',
      messages: { es },
    })
  })

  const createWrapper = () =>
    mount(Index, {
      vuetify,
      i18n,
      stubs: {
        NuxtLink: true,
        'v-icon': stubVIcon,
      },
      mocks: {
        $nuxt: { $on: jest.fn(), $off: jest.fn() },
        $route: { path: '/' },
        $router: { push: jest.fn() },
      },
    })

  it('renderiza el título principal de la sección Sobre CIMA', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain(es.index.quienesSomos.titulo)
    expect(wrapper.text()).toContain(es.index.quienesSomos.boton)
  })

  it('renderiza 5 aliados estratégicos', () => {
    const wrapper = createWrapper()
    expect(wrapper.vm.aliados.length).toBe(5)
  })

  it('renderiza 3 iniciativas', () => {
    const wrapper = createWrapper()
    expect(wrapper.vm.iniciativasData.length).toBe(3)
  })

  it('renderiza la sección de preguntas frecuentes', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain(es.cPreguntas.titulo)
    expect(wrapper.text()).toContain(es.cPreguntas.titulo2)
  })
})
