<template>
  <v-card class="pa-4" elevation="10">
    <v-row no-gutters align="center">
      <v-col cols="12" class="text-center">
        <img src="@/assets/gif/gifThanks.gif" alt="Gracias" loop: false  autoplay: true />
        <h2 class="mt-3">¡Gracias por tu donación!</h2>
        <p>Apreciamos mucho tu apoyo. ❤️</p>
        <v-btn color="#035928" class="mt-4 boton" @click="$emit('cerrar')">Cerrar</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<style scoped>
.boton{
  color: white;
}
img{
width: 100%;
 max-width: 300px;
 display: block;
  margin: 0 auto;

}
</style>
