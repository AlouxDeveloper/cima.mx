export default ({ app }, inject) => {
  // Variable global para el idioma
  const globalLanguage = {
    current: "es",

    // Función para cambiar idioma
    set(locale) {
      this.current = locale

      // Cambiar en i18n
      app.i18n.setLocale(locale)

      // Guardar en localStorage
      if (process.client) {
        localStorage.setItem("cima-language", locale)
        window.CIMA_LANGUAGE = locale

        // Emitir evento para que los componentes se actualicen
        if (app.$nuxt) {
          app.$nuxt.$emit("languageChanged", locale)
        }
      }

      console.log(`🌐 Idioma global cambiado a: ${locale}`)
    },

    // Función para obtener idioma
    get() {
      if (process.client) {
        // Prioridad: variable global > localStorage > default
        return window.CIMA_LANGUAGE || localStorage.getItem("cima-language") || "es"
      }
      return this.current
    },

    // Función para aplicar idioma guardado
    apply() {
      const saved = this.get()
      if (saved !== app.i18n.locale) {
        app.i18n.setLocale(saved)
        this.current = saved
        console.log(`🔄 Idioma aplicado: ${saved}`)
      }
    },
  }

  // Inyectar globalmente
  inject("language", globalLanguage)

  // Aplicar idioma guardado al iniciar
  if (process.client) {
    const saved = localStorage.getItem("cima-language") || "es"
    window.CIMA_LANGUAGE = saved
    globalLanguage.current = saved
    globalLanguage.apply()
  }
}
