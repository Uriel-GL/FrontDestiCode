<template>
    <ion-page>
      <app-bar-custom title="Tus Reservaciones"></app-bar-custom>
      <loading :active="isLoading" :can-cancel="false" :is-full-page="true" />
  
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
                    <ion-col v-for="ticket in TusTickets" :key="ticket.id_Reservacion">
                      <ion-card>
                        <ion-card-header class="header ion-text-center">
                          <ion-card-title><ion-text class="textHeader">Ticket de Ruta</ion-text></ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                          <div class="ion-text-center" >
                            <br>
                            <ion-text><b>{{ ticket.rutas.lugar_Salida }}</b></ion-text>
                            <br>
                            <ion-icon :icon="arrowDown" color="success"></ion-icon>
                            <br>
                            <ion-text><b>{{ ticket.rutas.lugar_Destino }}</b></ion-text>
                            <br>
                            <br>
                          </div>
                          <ion-row>
                            <ion-col size="8">
                              <ion-label>Fecha y hora de salida</ion-label>
                              <br>
                              <ion-text><b>{{ formatoFecha(ticket.rutas.fecha_Salida) }}</b></ion-text>
                            </ion-col>
                            <ion-col size="4">
                              <ion-text>Num Ticket</ion-text>
                              <div class="barcode"></div>
                            </ion-col>
                            <ion-col class="colEliminar">
                              <ion-button @click="openModalConfirm(ticket.id_Ruta, ticket.id_Reservacion, ticket.num_Asientos)" fill="clear" color="danger" shape="round" >
                              <ion-icon :icon="trashOutline" slot="icon-only"></ion-icon>
                            </ion-button>
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
                            <ion-text color="primary"><b>{{ formatoFecha(ruta.fecha_Salida) }}</b></ion-text> 
                          </h3>
                          
                        </ion-card-content>
                        <ion-button @click="VerSolicitantes(ruta.id_Ruta)" expand="full" :disabled="ruta.estatus == false" color="success"  class="btnViaje">
                          Ver Solicitudes
                        </ion-button>
                      </ion-card>
                    </ion-col>
                  </ion-row>
                </ion-grid>
            
              </ion-card-content>
            
            </ion-card>
        </div>

        <!-- Modal de confirmación de cancelar -->
        <ion-modal ref="modal" :is-open="showModalConfirm">
          <div class="bodyModal">
            <h2>Cancelar Reservación</h2>
            <ion-icon :icon="trashOutline" color="danger"></ion-icon>
            <h3>Estar por cancelar tu reservación<br>¿Estas seguro?</h3>
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-button @click="showModalConfirm = false" fill="clear" shape="round">
                    Cancelar
                  </ion-button>
                  <ion-button @click="cancelarLugar" shape="round" color="success">
                    Confirmar
                  </ion-button>
                </ion-col>     
              </ion-row>
            </ion-grid>
          </div>
        </ion-modal>

        <!-- Modal de confirmación de cancelacion -->
        <ion-modal ref="modal" :is-open="showModalSuccess">
          <div class="bodyModal">
            <h2>Cancelación Exitosa</h2>
            <ion-icon :icon="checkmarkOutline" color="success"></ion-icon>
            <h3>Se cancelo tu lugar en la ruta.</h3>
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-button @click="showModalSuccess = false" shape="round" color="success">
                    Confirmar
                  </ion-button>
                </ion-col>     
              </ion-row>
            </ion-grid>
          </div>
        </ion-modal>
  
        <!-- Modal de error de actualización de tu vehiculo -->
        <ion-modal ref="modal" :is-open="showModalError">
          <div class="bodyModal">
            <h2>Error al reservar</h2>
            <ion-icon :icon="closeOutline" color="danger"></ion-icon>
            <h3>No pudimos reservar tu lugar, intenta mas tarde.</h3>
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-button @click="showModalError = false" shape="round" color="success">
                    Confirmar
                  </ion-button>
                </ion-col>     
              </ion-row>
            </ion-grid>
          </div>
        </ion-modal>
      </ion-content>
    </ion-page>
  </template>
  
<script>
//Componentes
import AppBarCustom from '../components/NavBarCustom.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css';
//Ionic
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, 
  IonCardSubtitle, IonCardTitle, IonSegment, IonSegmentButton, IonModal
} from '@ionic/vue'
//Iconos
import { 
  arrowDown, ticketOutline, carOutline, ellipse, trashOutline, checkmarkOutline, closeOutline
} from 'ionicons/icons'
//Servicios
import RutaService from '@/Services/RutaService'
import moment from 'moment'
export default {
  components: {
    AppBarCustom,Loading,
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, 
    IonCardSubtitle, IonCardTitle, IonSegment, IonSegmentButton, IonModal
  },
  
  data: () => ({
    //Iconos
    arrowDown,
    ticketOutline,
    carOutline,
    ellipse,
    trashOutline,
    checkmarkOutline,
    closeOutline,

    showModalConfirm: false,
    showModalSuccess: false,
    showModalError: false,
    ShowTickets: false,
    isLoading: false,
    ShowRutas: false,  

    TusTickets: [],
    TusRutas: [],
    Reservaciones: [],

    idRuta: '',
    idReservacion: '',
    numAsientos: 0
  }),

  async created() {
    await this.cargarDatos()
  },
  
  methods: {
    async cargarDatos(){
      var SessionValid = this.$cookies.isKey('AccessToken') && this.$cookies.isKey('Usuario')
      if(SessionValid){
        var id = this.$cookies.get('Usuario')
        const response = await RutaService.getRutaByIdUsuario(id)
        const responseTicket = await RutaService.getTickets(id)
        this.TusRutas = JSON.parse(JSON.stringify(response.data))
        this.TusTickets = JSON.parse(JSON.stringify(responseTicket.data))
      }else{
        this.$router.push('/login')
      }
    },

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
    },

    formatoFecha(date){
      const fechaFormateada = moment(date).format('DD [de] MMMM YYYY, h:mm A');
      return fechaFormateada;
    },

    openModalConfirm(id_Ruta, id_Reservacion, num_Asientos){
      this.idRuta = id_Ruta;
      this.idReservacion = id_Reservacion;
      this.numAsientos = num_Asientos;
      
      this.showModalConfirm = true;
    },

    async cancelarLugar(){
      this.isLoading = true;
      this.showModalConfirm = false;

      const cancelacion = {
        Id_Ruta: this.idRuta,
        Id_Reservacion: this.idReservacion,
        Num_Lugares_Cancelar: this.numAsientos
      }
      
      const response = await RutaService.cancelarLugar(cancelacion);
      setTimeout(() => {
        if(response.status == 201 || response.status == 200){
          this.isLoading = false;
          this.showModalSuccess = true;
        }else{
          this.isLoading = false;
          this.showModalSuccess = false;
          this.showModalError = true;
        }
      }, 3000);

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

.colEliminar{
  margin: 0;
  height: 20px;
}
.colEliminar ion-button {
  margin-top: -10px;
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
  border-radius: 13px;
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

ion-modal {
    --width: fit-content;
    --height: fit-content;
    --border-radius: 10px;
}
.bodyModal {
  padding: 10px;
  text-align: center;
}

.bodyModal ion-icon {
  font-size: 36px;
}
</style>