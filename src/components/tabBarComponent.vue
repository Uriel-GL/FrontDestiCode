<template>
    <ion-page>
      <ion-tabs>
        <!-- Contenido de los tabs -->
        <ion-router-outlet></ion-router-outlet>
  
        <!-- Barra de contenido -->
        <ion-tab-bar slot="bottom">
  
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="home"></ion-icon>
          </ion-tab-button> 
  
          <ion-tab-button tab="publicacion" href="/publicaciones">
            <ion-icon :icon="addCircle"></ion-icon>
          </ion-tab-button>
  
          <ion-tab-button tab="tickets" href="/reservaciones">
            <ion-icon :icon="ticket"></ion-icon>
          </ion-tab-button>
  
          <ion-tab-button tab="cuenta" href="/perfil">
            <ion-icon :icon="person"></ion-icon>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script>
  //Componentes
  import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue'
  //Iconos
  import { home, addCircle, person, ticket } from 'ionicons/icons'
  export default {
    components: {
      IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon,
    },
  
    data: () => ({
      // #region Icons
      home,
      addCircle,
      person,
      ticket,
      // #endregion
  
    }),
  }
  </script>
  
  <style scoped>
  ion-icon {
    font-size: 26px;
  }
  </style>
  