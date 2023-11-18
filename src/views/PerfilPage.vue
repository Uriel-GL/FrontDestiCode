<template>
    <ion-page>
      <nav-bar-custom-vue title="Tu Perfil"></nav-bar-custom-vue>
  
      <ion-content>
        <div>
          <ion-card class="cardPerfil">
            <ion-avatar>
              <img src="https://ionicframework.com/docs/img/demos/avatar.svg" >
            </ion-avatar>
          </ion-card>
        </div>
      </ion-content>
  
    </ion-page>
  </template>
  
<script>
//Componentes
import NavBarCustomVue from '@/components/NavBarCustom.vue'
//Ionic
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardTitle,
  IonCardHeader, IonLabel, IonItem, IonText, IonAvatar, IonIcon
} from '@ionic/vue'
//Iconos
//Servicios

export default {
  components: {
    NavBarCustomVue,
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardTitle,
    IonCardHeader, IonLabel, IonItem, IonText, IonAvatar, IonIcon
  },
  
  data: () => ({
  
  }),
}
</script>
  
<style scoped>
.bodyPerfil {
  padding: 10px;
}
.cardPerfil {
  max-width: 450px;
  margin: 0 auto;
  padding: 16px;
}

.cardPerfil ion-avatar img {
  
}
</style>