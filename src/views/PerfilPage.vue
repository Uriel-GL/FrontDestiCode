<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title class="title">Tu Perfil</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <h1>HOLA</h1>
      </ion-content>
  
    </ion-page>
  </template>
  
  <script>
    //Componentes
    import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/vue'
  export default {
    components: {
      IonHeader, IonToolbar, IonTitle, IonContent, IonPage
    },
  
    data: () => ({
  
    }),
  }
  </script>
  
  <style scoped>
  .title {
    text-align: center;
  }
  </style>