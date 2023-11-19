<template>
  <ion-page>
    <app-bar-custom title="Publicar"></app-bar-custom>
    <loading :active="isLoading" :can-cancel="false" :is-full-page="fullPage" />
  
    <ion-content>
      <div class="bodyContent">

        <ion-card v-if="this.vehiculo.length == 0">
          <ion-card-header>
            <ion-card-title color="danger"><b>Advertencia</b></ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-icon class="carIcon" :icon="carOutline"></ion-icon>
            <h1>Actualmente no cuentas con un vehiculo registrado</h1>
            <br>
            <h2>Registra uno si quieres publicar una ruta</h2>
            <br>
            <ion-button shape="round" color="success">Registrar Vehiculo</ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card v-if="this.vehiculo.length > 0" class="cardPubli">
          <ion-card-header>
            <ion-card-title>Publica tu Ruta</ion-card-title>
            <ion-card-subtitle>Ingresa los datos</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <div class="bodyPublicacion">
              <ion-grid>
                <ion-row>

                  <ion-col class="iconCash" size="1">
                    <ion-icon :icon="location"></ion-icon>
                  </ion-col>

                  <ion-col size="11">
                    <ion-input v-model="nuevaRuta.Lugar_Salida" label="Origen" label-placement="floating" 
                    placeholder="¿De dónde sales?" fill="outline" color="success" />
                  </ion-col>

                  <ion-col class="iconCash" size="1">
                    <ion-icon :icon="location"></ion-icon>
                  </ion-col>

                  <ion-col size="11">
                    <ion-input v-model="nuevaRuta.Lugar_Destino" label="Destino" label-placement="floating" 
                    placeholder="¿A dónde viajas?" fill="outline" color="success"/>
                  </ion-col>

                  <ion-col class="iconCash" size="1">
                    <ion-icon :icon="timeOutline"></ion-icon>
                  </ion-col>

                  <ion-col size="11">
                    <ion-item>
                      <ion-label>Fecha y Hora de <br> salida</ion-label>
                      <ion-input :value="nuevaRuta.Fecha_Salida" 
                        class="ion-text-end" id="date" />
                        <ion-popover trigger="date" size="auto">
                          <ion-content>
                            <ion-datetime v-model="nuevaRuta.Fecha_Salida" display-format="DD/MM/YYYY HH:mm"></ion-datetime>
                          </ion-content>
                        </ion-popover>
                    </ion-item>
                  </ion-col>

                  <ion-col class="iconCash" size="1">
                    <ion-icon :icon="manOutline"></ion-icon>
                  </ion-col>

                  <ion-col size="11">
                    <ion-input type="number" v-model="nuevaRuta.Lugares_Disponibles" label="Espacios Disponibles" color="success" 
                    label-placement="floating" placeholder="Ingresa una cantidad" 
                    fill="outline">
                    </ion-input>
                  </ion-col>

                  <ion-col class="iconCash" size="1">
                    <ion-icon :icon="cashOutline"></ion-icon>
                  </ion-col>

                  <ion-col size="11">
                    <ion-input v-model="nuevaRuta.Costo" label="Costo por Persona" color="success" 
                    label-placement="floating" placeholder="Ingresa un monto" 
                    fill="outline">
                    </ion-input>
                  </ion-col>
                </ion-row>
              </ion-grid>

              <br>
              <ion-card-title>¿Que vehículo utilizaras?</ion-card-title>
              <ion-card-subtitle>Seleccionalo</ion-card-subtitle>

              <ion-grid>
                <ion-row>
                  <ion-col class="iconCash" size="1">
                    <ion-icon :icon="carOutline"></ion-icon>
                  </ion-col>
                  <ion-col size="11">
                    <ion-select v-model="nuevaRuta.Id_Unidad" interface="popover" placeholder="Selecciona un Vehículo" 
                    fill="outline" color="success" @ionChange="RegisterVehiculo">
                      <ion-select-option v-for="car in vehiculo" :key="car.id_Unidad" color="success" 
                      :value="car.id_Unidad">
                        {{ car.modelo }}
                      </ion-select-option>
                      <ion-select-option v-if="vehiculo.length < 2">Registrar</ion-select-option>
                    </ion-select>
                  </ion-col>
                </ion-row>

                <ion-row><ion-col></ion-col></ion-row>

                <ion-row>
                  <ion-col size="12">
                    <ion-button @click="showModal = true" color="success" shape="round" expand="full">
                      Publicar
                    </ion-button>
                  </ion-col>
                </ion-row>
              </ion-grid>

            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>

    <!-- Modal de confirmación de publicación -->
    <ion-modal ref="modal" :is-open="showModal">
      <div class="bodyModal">
        <h2>¿Estás seguro de publicar tu ruta?</h2>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-button @click="showModal = false" color="danger" fill="clear">
                Cancelar
              </ion-button>
              <ion-button @click="publicarRuta" shape="round" color="success">
                Confirmar
              </ion-button>
            </ion-col>     
          </ion-row>
        </ion-grid>
      </div>
    </ion-modal>
  
  </ion-page>
</template>
  
<script>
//Componentes
import AppBarCustom from '../components/NavBarCustom.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css';
//Ionic
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonInput, IonGrid, IonRow, IonCol,
  IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonDatetimeButton, IonModal, IonDatetime, IonLabel,
  IonItem, IonIcon, IonSelect, IonSelectOption,IonButton, IonPopover
} from '@ionic/vue'
//Iconos
import { location, cashOutline, timeOutline, carOutline, manOutline } from 'ionicons/icons'
//Servicios 
import VehiculoService from '../Services/VehiculoService'
import RutaService from '@/Services/RutaService';
export default {
  components: {
    AppBarCustom,Loading,
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonInput, IonGrid, IonRow, IonCol,
    IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonDatetimeButton, IonModal, IonDatetime,
    IonLabel, IonItem, IonIcon, IonSelect, IonSelectOption, IonButton, IonPopover
  },
  
  data: () => ({
    //Iconos
    location, 
    cashOutline, 
    timeOutline,
    carOutline,
    manOutline,

    //Variables
    showModal: false,
    isLoading: false,
    fullPage: true,
    vehiculo: [],
    nuevaRuta: { 
      Id_Ruta: '6c54d50b-2850-4081-8087-e1954c496a4c', //Guid de ejemplo para evitar problema de empty
      Id_Unidad: '', 
      Id_Usuario: '', 
      Lugar_Salida: '', 
      Lugar_Destino: '', 
      Fecha_Salida: '', 
      Costo: '', 
      Lugares_Disponibles: 0,  
      Estatus: true  
    },
  }),

  async created() {
    var id = this.$cookies.get('Usuario')
    const response = await VehiculoService.getVehiculosByUsuario(id)
    this.vehiculo = JSON.parse(JSON.stringify(response.data))
    console.log(this.vehiculo)
  },

  methods: {
    async publicarRuta(){
      this.showModal = false
      this.isLoading = true

      var costo = parseFloat(this.nuevaRuta.Costo.trim())
      var lugares = parseInt(this.nuevaRuta.Lugares_Disponibles.trim(), 10)

      this.nuevaRuta.Costo = costo
      this.nuevaRuta.Lugares_Disponibles = lugares
      this.nuevaRuta.Id_Usuario = this.$cookies.get('Usuario')

      const response = await RutaService.registerRuta(this.nuevaRuta)

      setTimeout(() => {
        this.isLoading = false
        if(response.status == 201 || response.status == 200){
          this.limpiarFormulario()
          //this.$router.push('/home')
        }
      }, 4000);
    },

    limpiarFormulario(){
      this.nuevaRuta = { 
        Id_Ruta: '6c54d50b-2850-4081-8087-e1954c496a4c',  
        Id_Unidad: '',  
        Id_Usuario: '', 
        Lugar_Salida: '', 
        Lugar_Destino: '', 
        Fecha_Salida: '', 
        Costo: '',  
        Lugares_Disponibles: '',  
        Estatus: true  
      }
    },
    
    RegisterVehiculo() {
      if(this.nuevaRuta.Id_Unidad === 'Registrar'){
        this.$router.push('vehiculos')
        console.log("HOLA")
      }
    }
  }
}
</script>
  
<style scoped>
.custom-toast {
  z-index: 10000;
}
ion-icon {
  font-size: 26px;
}

.carIcon {
  font-size: 46px;
}

ion-card {
  text-align: center;
}

ion-modal {
  --width: fit-content;
  --height: fit-content;
  --border-radius: 10px;
}

.bodyContent {
  padding: 10px;
}

.bodyModal {
  padding: 10px;
  text-align: center;
}

.cardPubli {
  max-width: 450px;
  margin: 0 auto;
}

.iconCash{
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 15px;
}
</style>