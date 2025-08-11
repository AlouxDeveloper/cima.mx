import colors from "vuetify/es5/util/colors"

export default {
  ssr: false,
  target: "static",

  head: {
    titleTemplate: "%s - CIMA A.C.",
    title: "CIMA A.C.",
    htmlAttrs: {
      lang: "es",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.4.5/css/swiper.min.css",
      },
    ],
  },

  css: [
    'vue-phone-number-input/dist/vue-phone-number-input.css',
    '@/assets/styles/main.scss'
  ],

  plugins: [
    { src: "~/plugins/i18n-fix.js", mode: "client" },
    { src: "~/plugins/global-language.js", mode: "client" },
  ],

  components: true,


  buildModules: ["@nuxtjs/vuetify"],

  modules: ["@nuxtjs/axios", "@nuxtjs/i18n"],

  router: {
    middleware: ["language-route"],
  },

  i18n: {
    locales: [
      {
        code: "es",
        name: "Español",
        iso: "es-MX",
        file: "es.json",
      },
      {
        code: "en",
        name: "English",
        iso: "en-US",
        file: "en.json",
      },
    ],
    defaultLocale: "es",
    lazy: false,
    langDir: "locales/",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: false,
      fallbackLocale: "es",
    },
    vueI18n: {
      fallbackLocale: "es",
      silentTranslationWarn: true,
      silentFallbackWarn: true,
    },
  },

  axios: {
    baseURL: 'http://localhost:4000',
  },

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile:['swiper']
  },

  publicRuntimeConfig: {
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY
  }
}
