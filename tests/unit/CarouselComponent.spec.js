import { shallowMount } from '@vue/test-utils'
import TrendingSlider from '../../components/CarouselComponent.vue'

// Mock global fetch para simular llamada a API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        docs: [
          { imagen: { url: '/img1.jpg' } },
          { imagen: { url: '/img2.jpg' } },
          { imagen: { url: '/img3.jpg' } },
        ],
      }),
  })
)

describe('TrendingSlider.vue', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = shallowMount(TrendingSlider, {
      mocks: {
        $nextTick: () => Promise.resolve(),
      },
    })

    // Esperar a que se monte y fetch termine
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()
  })

  it('carga las imágenes desde la API y las guarda en data', () => {
    expect(wrapper.vm.images.length).toBe(3)
    expect(wrapper.vm.images[0]).toBe('http://localhost:5000/img1.jpg')
  })

  it('no inicializa swiper si no hay imágenes', () => {
    wrapper.setData({ images: [] })
    wrapper.vm.initSwiper()
    expect(wrapper.vm.swiperInstance).toBeNull()
  })

  it('inicializa swiper cuando hay imágenes y window.Swiper existe', () => {
    // Mock de window.Swiper
    window.Swiper = jest.fn()

    wrapper.setData({
      images: ['img1', 'img2'],
    })
    wrapper.vm.initSwiper()
    expect(window.Swiper).toHaveBeenCalled()
  })
})
