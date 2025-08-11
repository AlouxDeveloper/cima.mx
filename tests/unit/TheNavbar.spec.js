import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import TheNavbar from '../../components/TheNavbar.vue'
import VueI18n from 'vue-i18n'

import en from '../../locales/en.json'
import es from '../../locales/es.json'

const localVue = createLocalVue()
localVue.use(VueI18n)
localVue.use(VueRouter)

describe('TheNavbar.vue', () => {
  let vuetify
  let wrapper
  let router
  let i18n

  const messages = {
    es: {
      nav: {
        inicio: 'Inicio',
        nosotros: 'Nosotros',
        iniciativas: 'Iniciativas',
        recursos: 'Recursos',
        transparencia: 'Transparencia',
        donar: 'Donar',
      },
    },
    en: {
      nav: {
        inicio: 'Home',
        nosotros: 'About',
        iniciativas: 'Initiatives',
        recursos: 'Resources',
        transparencia: 'Transparency',
        donar: 'Donate',
      },
    },
  }

  beforeEach(() => {
    vuetify = new Vuetify()
    router = new VueRouter({
      routes: [
        { path: '/', name: 'inicio' },
        { path: '/nosotros', name: 'nosotros' },
        { path: '/iniciativas', name: 'iniciativas' },
        { path: '/recursos', name: 'recursos' },
        { path: '/transparencia', name: 'transparencia' },
        { path: '/donaciones', name: 'donaciones' },
      ],
    })
    router.push('/')

    i18n = new VueI18n({
      locale: 'es',
      fallbackLocale: 'es',
      messages,
    })

    wrapper = shallowMount(TheNavbar, {
      localVue,
      vuetify,
      i18n,
      router,
      mocks: {
        $language: {
          get: () => 'es',
          set: jest.fn(),
          apply: jest.fn(),
        },
      },
      stubs: {
        NuxtLink: true,
        VAppBar: true,
        VAppBarNavIcon: true,
        VToolbarTitle: true,
        VNavigationDrawer: true,
        VList: true,
        VListItem: true,
        VListItemAvatar: true,
        VListItemTitle: true,
        VImg: true,
        VBtn: true,
        VMenu: true,
        VIcon: true,
        VSpacer: true,
        VDivider: true,
      },
    })
  })

  it('renderiza el logo con el texto correcto', () => {
    expect(wrapper.find('.logo').text()).toBe('CIMA A. C.')
  })

  it('muestra los enlaces de navegación', () => {
    const links = wrapper.findAll('.custom-nav-link')
    expect(links.length).toBeGreaterThan(0)
    expect(links.at(0).text()).toBe('Inicio')
  })

  it('muestra el botón Donar con texto correcto', () => {
    const btnDonar = wrapper.find('.btn-primary')
    expect(btnDonar.exists()).toBe(true)
    expect(btnDonar.text()).toBe('Donar')
  })

  it('cambia el idioma a inglés correctamente', async () => {
    await wrapper.vm.changeLanguage('en')
    expect(wrapper.vm.currentLang).toBe('en')
    expect(i18n.locale).toBe('en')
  })

  it('detecta correctamente ruta activa', () => {
    const item = { key: 'inicio', link: '/' }
    expect(wrapper.vm.isActive(item)).toBe(true)
  })
})


