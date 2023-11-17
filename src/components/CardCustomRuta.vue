<template>
  <ion-card class="cardViaje">
    <ion-card-content>
      <ion-row>
        <ion-col size="10">
          <h2 class="textCard">
            <ion-icon :icon="arrowDown"></ion-icon>
            <ion-icon :icon="ellipse" color="success"></ion-icon>
            {{ Item.lugar_Salida }}
          </h2>
          <h2 class="textCard">
            <ion-icon :icon="ellipse" color="success"></ion-icon>
            {{ Item.lugar_Destino }}
          </h2>
        </ion-col>
        <ion-col size="2">
          <h4 class="costo">
            <b>${{ Item.costo }}</b>
          </h4>
        </ion-col>
      </ion-row>
      <h4
        v-if="Item.lugares_Disponibles <= 0 && Item.estatus == false"
        class="salida"
      >
        <b>Viaje Lleno</b>
      </h4>
      <h3 class="salida">
        Lugares:
        <ion-text color="success"
          ><b>{{ Item.lugares_Disponibles }}</b></ion-text
        >
      </h3>
      <h3 class="salida">
        Salida:
        <ion-text color="primary"
          ><b>{{ Item.fecha_Salida }}</b></ion-text
        >
      </h3>
    </ion-card-content>
    <ion-button
      @click="IrADetalle(Item.id_Ruta)"
      color="success"
      :disabled="ruta.estatus == false"
      class="btnViaje"
      >Ver Viaje</ion-button
    >
  </ion-card>
</template>

<script>
export default {
    props: ['Item'],

    data: () => ({

    }),
};
</script>

<style scoped>
.cardViaje {
  max-width: 450px;
  padding: 0px;
  margin: 0 auto;
}

.textCard {
  font-weight: bold;
}

.costo {
  margin-left: 5px;
  font-size: 15px;
}
</style>