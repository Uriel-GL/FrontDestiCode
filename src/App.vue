<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-title>DestiCode</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-router-outlet />
    </ion-content>
    
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style scoped>


</style>
