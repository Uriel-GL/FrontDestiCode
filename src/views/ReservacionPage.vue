<template>
    <ion-page>
      <app-bar-custom title="Tus Reservaciones"></app-bar-custom>
  
      <ion-content>
        <div class="bodyReservaciones">
          <ion-card class="card">
            <ion-card-header>
              <ion-segment>
                <ion-segment-button @click="showTickets">
                  <ion-label>Mis Tickets</ion-label>
                </ion-segment-button>
                <ion-segment-button @click="showRutas">
                  <ion-label>Mis Rutas</ion-label>
                </ion-segment-button>
              </ion-segment>
            </ion-card-header>

              <!-- Segmento de Tickets -->
              <ion-card-content v-if="ShowTickets">
                <!-- Por si no hay Rutas reservadas -->
                <ion-card v-if="TusTickets.length == 0">
                  <ion-card-content>
                    <div class="bodyRutasExis ion-text-center">
                      <ion-icon :icon="ticketOutline"></ion-icon>
                      <h2>Actualmente no has hecho reservaciones</h2> 
                    </div>
                  </ion-card-content>
                </ion-card>

                <ion-grid class="gridRutas" v-if="TusTickets.length > 0">
                  <ion-row>
                    <ion-col v-for="ticket in TusTickets" :key="ticket.id_Ruta">
                      <ion-card>
                        <ion-card-header class="header ion-text-center">
                          <ion-card-title><ion-text class="textHeader">Ticket de Ruta</ion-text></ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                          <div class="ion-text-center">
                            <br>
                            <ion-text><b>{{ ticket.lugar_Salida }}</b></ion-text>
                            <br>
                            <ion-icon :icon="arrowDown" color="success"></ion-icon>
                            <br>
                            <ion-text><b>{{ ticket.lugar_Destino }}</b></ion-text>
                            <br>
                            <br>
                          </div>
                          <ion-row>
                            <ion-col size="8">
                              <ion-label>Fecha y hora de salida</ion-label>
                              <br>
                              <ion-text><b>{{ ticket.fecha_Salida }}</b></ion-text>
                            </ion-col>
                            <ion-col size="4">
                              <ion-text>Num Ticket</ion-text>
                              <div class="barcode"></div>
                            </ion-col>
                          </ion-row>
                        </ion-card-content>
                      </ion-card>
                    </ion-col>
                  </ion-row>
                </ion-grid>
                
              </ion-card-content>
              
              <!-- Segmento de Rutas -->
              <ion-card-content v-if="ShowRutas">
                <!-- Por si no hay Rutas publicadas -->
                <ion-card v-if="this.TusRutas.length == 0">
                  <ion-card-content>
                    <div class="bodyRutasExis ion-text-center">
                      <ion-icon :icon="carOutline"></ion-icon>
                      <h2>Actualmente no has publicado una ruta</h2> 
                    </div>
                  </ion-card-content>
                </ion-card>

                <ion-grid class="gridRutas" v-if="this.TusRutas.length > 0">
                  <ion-row>
                    <ion-col v-for="ruta in TusRutas" :key="ruta.id_Ruta" size="12">
                      <ion-card class="cardViaje">
                        <ion-card-content>
                          <ion-row>
                            <ion-col size="10">
                              <h2 class="textCard">
                                <ion-icon :icon="arrowDown"></ion-icon>
                                <ion-icon :icon="ellipse" color="success"></ion-icon>
                                {{ ruta.lugar_Salida }}
                              </h2>
                              <h2 class="textCard">
                                <ion-icon :icon="ellipse" color="success"></ion-icon>
                                {{ ruta.lugar_Destino }}
                              </h2>
                            </ion-col>
                            <ion-col size="2">
                              <h4 class="costo"><b>${{ ruta.costo }}</b></h4>
                            </ion-col>
                          </ion-row>
                          <h4 v-if="ruta.lugares_Disponibles <= 0 && ruta.estatus == false" class="salida">
                            <b>Viaje Lleno</b>
                          </h4>
                          <h3 class="salida">
                            Lugares: 
                            <ion-text color="success"><b> {{ ruta.lugares_Disponibles }} </b></ion-text>
                          </h3>
                          <h3 class="salida">
                            Salida: 
                            <br>
                            <ion-text color="primary"><b>{{ ruta.fecha_Salida }}</b></ion-text> 
                          </h3>
                          
                        </ion-card-content>
                        <ion-button @click="VerSolicitantes(ruta.id_Ruta)" :disabled="ruta.estatus == false" color="success"  class="btnViaje">
                          Ver Solicitudes
                        </ion-button>
                      </ion-card>
                    </ion-col>
                  </ion-row>
                </ion-grid>
            
              </ion-card-content>
            
            </ion-card>
        </div>
      </ion-content>
  
    </ion-page>
  </template>
  
<script>
//Componentes
import AppBarCustom from '../components/NavBarCustom.vue'
//Ionic
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, 
  IonCardSubtitle, IonCardTitle, IonSegment, IonSegmentButton
} from '@ionic/vue'
//Iconos
import { arrowDown, ticketOutline, carOutline, ellipse } from 'ionicons/icons'
//Servicios
import RutaService from '@/Services/RutaService'
export default {
  components: {
    AppBarCustom,
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, 
    IonCardSubtitle, IonCardTitle, IonSegment, IonSegmentButton
  },
  
  data: () => ({
    //Iconos
    arrowDown,
    ticketOutline,
    carOutline,
    ellipse,

    ShowTickets: false,
    ShowRutas: false,  
    TusTickets: [],
    TusRutas: [],
  }),

  async created() {
    var id = this.$cookies.get('Usuario')
    const response = await RutaService.getRutaByIdUsuario(id)
    const responseTicket = await RutaService.getTickets(id)
    this.TusRutas = JSON.parse(JSON.stringify(response.data))
    this.TusTickets = JSON.parse(JSON.stringify(responseTicket.data))
    console.log(this.TusRutas)
    console.log(this.TusTickets)
  },

  methods: {
    showTickets(){
      this.ShowTickets = true;
      this.ShowRutas = false;
    },

    showRutas(){
      this.ShowTickets = false;
      this.ShowRutas = true;
    },

    VerSolicitantes(Id_Ruta){
      console.log(Id_Ruta)
    }
  },

}
</script>
  
<style scoped>
.bodyReservaciones{
  padding: 12px;
}
.card{
  max-width: 450px;
  margin: 0 auto;
}

.bodyRutasExis ion-icon {
  font-size: 46px;
}

.header{
  height: 40px;
  background-color: #e44d26;
  color: white;
}

.header ion-card-title {
  margin-top: -9px;
}

.textHeader {
  color: white;
}

.barcode {
  height: 30px;
  width: 0;
  box-shadow: 1px 0 0 1px #343434,
              5px 0 0 1px #343434,
              10px 0 0 1px #343434,
              11px 0 0 1px #343434,
              15px 0 0 1px #343434,
              18px 0 0 1px #343434,
              22px 0 0 1px #343434,
              23px 0 0 1px #343434,
              26px 0 0 1px #343434,
              30px 0 0 1px #343434,
              35px 0 0 1px #343434,
              37px 0 0 1px #343434,
              41px 0 0 1px #343434,
              44px 0 0 1px #343434,
              47px 0 0 1px #343434,
              51px 0 0 1px #343434,
              56px 0 0 1px #343434,
              59px 0 0 1px #343434,
              64px 0 0 1px #343434,
              68px 0 0 1px #343434,
              72px 0 0 1px #343434,
              74px 0 0 1px #343434,
              77px 0 0 1px #343434,
              81px 0 0 1px #343434;
}

.gridRutas {
  padding: 0;
}

.gridRutas ion-row {
  padding: 0;
}

.gridRutas ion-row ion-col {
  margin-top: 10px;
  padding: 0;
}

.cardViaje {
  max-width: 450px;
  padding: 0px;
  margin: 0 auto;
}

ion-card-title {
  text-align: center;
  margin-top: 18px;
}

ion-card-subtitle{
  text-align: center;
}

.title {
  text-align: center;
}

.btnViaje {
  margin: 0;
  width: 100%;
}

.salida {
  text-align: center;
  font-size: 15px;
}

.costo {
  margin-left: 5px;
  font-size: 15px;
}

.colBtnBuscar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btnBuscar {
  width: 100%;
}

.textCard {
  font-weight: bold;
}
  
</style>