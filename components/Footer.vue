<template>
  <v-footer class="footer-section py-8 px-4" padless>
    <v-container>
      <v-row align="center" justify="space-between" class="fade-in delay-1 flex-wrap">
        <!-- Logo y nombre -->
        <v-col
          cols="12"
          md="4"
          class="d-flex justify-center justify-md-start align-center mb-4 mb-md-0 fade-in delay-2"
        >
          <v-img
            src="/logo-cima.png"
            alt="Logo CIMA A.C."
            max-height="50"
            max-width="50"
            contain
            class="mr-3"
          />
          <span class="footer-title">CIMA A.C.</span>
        </v-col>

        <!-- Derechos -->
        <v-col
          cols="12"
          md="4"
          class="d-flex justify-center align-center text-center mb-4 mb-md-0 fade-in delay-3"
        >
          <div class="footer-text">
            {{ $t('footer.derechos') }}
          </div>
        </v-col>

        <!-- Redes sociales -->
        <v-col
          cols="12"
          md="4"
          class="d-flex flex-column flex-md-row justify-center justify-md-end align-center gap-3 gap-md-6 fade-in delay-4"
        >
          <span class="footer-text mb-2 mb-md-0">{{ $t('footer.siguenos') }}</span>
          <div class="d-flex gap-2">
            <v-btn
              icon
              class="social-icon"
              href="https://instagram.com"
              target="_blank"
            >
              <v-icon size="22">mdi-instagram</v-icon>
            </v-btn>
            <v-btn
              icon
              class="social-icon"
              href="https://facebook.com"
              target="_blank"
            >
              <v-icon size="22">mdi-facebook</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.footer-section {
  background: linear-gradient(
    to top,
    rgba(111, 156, 166, 0.45) 0%,
    rgba(245, 245, 245, 0.18) 81%
  );
  border-top: 2px solid #035928;
  backdrop-filter: blur(4px);
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #333;
  position: relative;
  overflow: hidden;
}

/* Tipografía */
.footer-title {
  font-weight: 600;
  font-size: 1.3rem;
  color: #035928;
  letter-spacing: 0.5px;
}

.footer-text {
  font-size: 0.85rem;
  color: #444;
}

/* Íconos sociales */
.social-icon {
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.social-icon:hover {
  background-color: #808080;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Animaciones */
.fade-in {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.6s ease forwards;
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
