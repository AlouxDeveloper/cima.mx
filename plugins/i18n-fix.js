export default ({ app, route }) => {
  if (process.client) {
    // Función para sincronizar idioma
    const syncLanguage = () => {
      const saved = localStorage.getItem("cima-locale") || "es"
      const current = app.i18n.locale

      if (saved !== current) {
        console.log(`🔧 i18n-fix: ${current} → ${saved}`)
        app.i18n.setLocale(saved)
      }
    }

    // Sincronizar inmediatamente
    syncLanguage()

    // Sincronizar en cada cambio de ruta
    app.router.afterEach(() => {
      setTimeout(syncLanguage, 50)
    })

    // Escuchar cambios manuales de idioma
    app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
      localStorage.setItem("cima-locale", newLocale)
      console.log(`💾 Idioma guardado: ${newLocale}`)
    }
  }
}
