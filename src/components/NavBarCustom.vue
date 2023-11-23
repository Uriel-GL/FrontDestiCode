<template>
    <ion-header>
      <ion-toolbar>
        <ion-title class="title">{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
</template>

<script>
//Componentes
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue'
export default {
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle
    },

    props: ['title'],

    date: () => ({

    }),
}
</script>

<style scoped>
.title {
  text-align: center;
}
</style>