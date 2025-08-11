export default function ({ route, redirect, app }) {
  // Solo ejecutar en el cliente
  if (process.client) {
    const savedLocale = localStorage.getItem("cima-locale") || "es"
    const currentPath = route.path
    const currentLocale = app.i18n.locale

    console.log("🛣️ Middleware language-route:", {
      savedLocale,
      currentLocale,
      currentPath,
      routeLocale: route.params?.lang || "es",
    })

    // Si el idioma guardado es diferente al actual
    if (savedLocale !== currentLocale) {
      let newPath = currentPath

      if (savedLocale === "es") {
        // Para español, remover prefijo /en
        newPath = currentPath.replace("/en", "") || "/"
      } else if (savedLocale === "en") {
        // Para inglés, agregar prefijo /en
        if (!currentPath.startsWith("/en")) {
          newPath = currentPath === "/" ? "/en" : `/en${currentPath}`
        }
      }

      // Redirigir solo si la ruta cambió
      if (newPath !== currentPath) {
        console.log(`🔄 Redirigiendo de ${currentPath} a ${newPath}`)
        return redirect(newPath)
      }
    }

    // Aplicar el idioma guardado
    app.i18n.setLocale(savedLocale)
  }
}
