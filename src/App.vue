<template>
  <ion-app>
    <ion-content>
      <ion-router-outlet />
    </ion-content>
  </ion-app>
</template>

<script>
  import { IonApp, IonRouterOutlet, IonContent } from '@ionic/vue';

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
    components: { IonApp, IonRouterOutlet, IonContent },
  });
</script>

<style scoped>


</style>
