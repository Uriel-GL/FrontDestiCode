<template>
  <ion-page>
    <div class="HomeBody">
      
      <ion-card class="cardFilter">
        <ion-card-title>Hola</ion-card-title>
        <ion-card-subtitle>Salufos</ion-card-subtitle>

        <ion-card-content>
          Here's a small text description for the card content. Nothing more, nothing less.
        </ion-card-content>
      </ion-card>

    </div>
  </ion-page>
</template>

<script>
import { IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';


export default {
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent
  },

  data: () => ({

  }),
}
</script>

<style scoped>
.HomeBody {
  padding: 12px;
}

.cardFilter {
  padding: 16px;
}

</style>
