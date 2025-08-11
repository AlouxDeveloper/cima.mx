import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Footer from '../../components/Footer.vue'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../../locales/es.json'

Vue.use(Vuetify)

describe('Footer.vue', () => {
  let vuetify
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(VueI18n)

    const i18n = new VueI18n({
      locale: 'es',
      messages: { es: messages }
    })

    vuetify = new Vuetify()

    wrapper = mount(Footer, {
      localVue,
      vuetify,
      i18n,
    })
  })

  it('muestra los íconos de redes sociales', () => {
    const icons = wrapper.findAllComponents({ name: 'v-icon' })
    expect(icons.length).toBeGreaterThan(0)

    // console.log para ver la salida del primer icono
    // console.log(icons.at(0).html())

    expect(icons.at(0).html()).toContain('mdi-instagram')
    expect(icons.at(1).html()).toContain('mdi-facebook')
  })
})
