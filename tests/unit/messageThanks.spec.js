import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import messageThanks from '../../components/messageThanks.vue'
import Vue from 'vue'

Vue.use(Vuetify)

describe('messageThankes.vue', () => {
  let vuetify
  let wrapper
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    vuetify = new Vuetify()

    wrapper = mount(messageThanks, {
      localVue,
      vuetify,
      // si tienes slots o props los agregas aquí
    })
  })

  it('muestra el mensaje de agradecimiento', () => {
    expect(wrapper.text()).toContain('¡Gracias por tu donación!')
    expect(wrapper.text()).toContain('Apreciamos mucho tu apoyo. ❤️')
  })

  it('muestra la imagen con el alt correcto', () => {
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('alt')).toBe('Gracias')
    expect(img.attributes('src')).toContain('gifThanks.gif')
  })

  it('emite evento "cerrar" al hacer click en el botón', async () => {
    const btn = wrapper.find('button')
    expect(btn.exists()).toBe(true)
    await btn.trigger('click')
    expect(wrapper.emitted().cerrar).toBeTruthy()
    expect(wrapper.emitted().cerrar.length).toBe(1)
  })
})
