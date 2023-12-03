<template>
  <ion-page>
    <app-bar-custom title="Publicar"></app-bar-custom>
    <loading :active="isLoading" :can-cancel="false" :is-full-page="fullPage" />
  
    <ion-content class="ion-padding">
      <!-- Refresher -->
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="bodyContent">

        <!-- Si no tiene un vehiculo registrado no puedo publicar una ruta -->
        <ion-card v-if="this.vehiculo.length == 0">
          <ion-card-header>
            <ion-card-title color="danger"><b>Advertencia</b></ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-icon class="carIcon" :icon="carOutline"></ion-icon>
            <h1>Actualmente no cuentas con un vehículo registrado</h1>
            <br>
            <h2>Registra uno si quieres publicar una ruta</h2>
            <br>
            <ion-button shape="round" color="success" @click="goToVehiculo">Registrar Vehiculo</ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card v-if="this.vehiculo.length > 0" class="cardPubli" :disabled="isRefresher">
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
                      <ion-input :value="nuevaRuta.Fecha_Salida" class="ion-text-end" id="date">
                        <ion-popover trigger="date" size="auto">
                          <ion-content>
                            <ion-datetime v-model="nuevaRuta.Fecha_Salida" display-format="DD/MM/YYYY HH:mm"></ion-datetime>
                          </ion-content>
                        </ion-popover>
                      </ion-input>
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
                    fill="outline" type="number">
                    </ion-input>
                  </ion-col>
                </ion-row>
              </ion-grid>

              <br>
              <ion-card-title>¿Qué vehículo utilizarás?</ion-card-title>
              <ion-card-subtitle>Selecciónalo</ion-card-subtitle>

              <ion-grid>
                <ion-row>
                  <ion-col class="iconCash" size="1">
                    <ion-icon :icon="carOutline"></ion-icon>
                  </ion-col>
                  <ion-col size="11">
                    <ion-select v-model="nuevaRuta.Id_Unidad" interface="popover" placeholder="Selecciona un Vehículo" 
                    fill="outline" color="success" @ionChange="goToRegister">
                      <ion-select-option v-for="car in vehiculo" :key="car.id_Unidad" color="success" 
                      :value="car.id_Unidad">
                        {{ car.modelo }}
                      </ion-select-option>
                      <ion-select-option v-if="vehiculo.length == 0" value="null">Registrar</ion-select-option>
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

    <!-- Modal de confirmación de registro de tu ruta -->
    <ion-modal ref="modal" :is-open="showModalConfirm">
      <div class="bodyModal">
        <h2>Registro Exitoso</h2>
        <ion-icon :icon="checkmarkOutline" color="success"></ion-icon>
        <h3>Tu ruta ahora se encuentra publicada</h3>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-button @click="showModalConfirm = false" shape="round" color="success">
                Confirmar
              </ion-button>
            </ion-col>     
          </ion-row>
        </ion-grid>
      </div>
    </ion-modal>

    <!-- Modal de alerta de registro de tu ruta -->
    <ion-modal ref="modal" :is-open="ShowAlertLimite">
      <div class="bodyModal">
        <h2>Advertencia</h2>
        <ion-icon :icon="alertOutline" color="warning"></ion-icon>
        <h3>Solo puedes publicar 2 rutas y actualmente excedes el límite, borra una para continuar </h3>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-button @click="ShowAlertLimite = false" shape="round" color="success">
                Confirmar
              </ion-button>
            </ion-col>     
          </ion-row>
        </ion-grid>
      </div>
    </ion-modal>

    <!-- Modal de error de tus datos FORMULARIO -->
    <ion-modal ref="modal" :is-open="showModalError">
        <div class="bodyModal">
            <h2>Adevertencia</h2>
            <ion-icon :icon="alertCircleOutline" color="warning"></ion-icon>
            <h3>Los datos ingresados no son válidos.</h3>
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

    <!-- Totas de error en la api invalidas -->
    <ion-toast 
      position="top" 
      position-anchor="header" 
      message="Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
      :is-open="isErrorRuta"
      color="danger"
      :duration="2000"
      :icon="wifiOutline"
    ></ion-toast>
  
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
  IonItem, IonIcon, IonSelect, IonSelectOption,IonButton, IonPopover, IonToast, IonRefresher, 
  IonRefresherContent, IonCardHeader,

} from '@ionic/vue'
//Iconos
import { 
  location, cashOutline, timeOutline, carOutline, manOutline, checkmarkOutline, wifiOutline,
  alertOutline, alertCircleOutline
} from 'ionicons/icons'
//Servicios 
import VehiculoService from '../Services/VehiculoService'
import RutaService from '@/Services/RutaService';
export default {
  components: {
    AppBarCustom,Loading,
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonInput, IonGrid, IonRow, IonCol,
    IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonDatetimeButton, IonModal, IonDatetime,
    IonLabel, IonItem, IonIcon, IonSelect, IonSelectOption, IonButton, IonPopover, IonToast, IonRefresher,
    IonRefresherContent,IonCardHeader
  },
  
  data: () => ({
    //Iconos
    location, 
    cashOutline, 
    timeOutline,
    carOutline,
    manOutline,
    checkmarkOutline,
    wifiOutline,
    alertOutline,
    alertCircleOutline,

    //Variables
    showModalError: false,
    showModal: false,
    showModalConfirm: false,
    isLoading: false,
    fullPage: true,
    ShowAlertLimite: false,
    isErrorRuta: false,
    isRefresher: false,

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
    await this.cargarDatos()
  },

  methods: {
    async cargarDatos(){
      var SessionValid = this.$cookies.isKey('AccessToken') && this.$cookies.isKey('Usuario')
      if(SessionValid){
        var id = this.$cookies.get('Usuario')
        const response = await VehiculoService.getVehiculosByUsuario(id)
        this.vehiculo = JSON.parse(JSON.stringify(response.data))
        console.log(this.vehiculo)
      }else{
        this.$router.push('login')
      }
    },

    validarFormulario(){
      let errorMessage = "";

      if(!this.nuevaRuta.Lugar_Salida) errorMessage += "Campo ORIGEN Obligatorio\n"

      if(!this.nuevaRuta.Lugar_Destino) errorMessage += "Campo DESTINO obligatorio\n";

      if(!this.nuevaRuta.Fecha_Salida) errorMessage += "El costo es requerido";

      if(!this.nuevaRuta.Lugares_Disponibles) errorMessage += "El costo es requerido";

      if(!this.nuevaRuta.Costo) errorMessage += "El costo es requerido";

      if(!this.nuevaRuta.Id_Unidad) errorMessage += "El vehículo es obligatorio";

      if(errorMessage == "") return true;

      return false;
    },

    async publicarRuta(){
      try{
        this.isErrorRuta = false;
        this.showModal = false
        this.isLoading = true

        if(this.validarFormulario()){
          const limiteRegistro = await RutaService.getRutaByIdUsuario(this.$cookies.get('Usuario'));
          var data = JSON.parse(JSON.stringify(limiteRegistro.data))
          
          if(data.length == 2){
            this.isLoading = false;
            this.ShowAlertLimite = true;
            return;
          }

          var costo = parseFloat(this.nuevaRuta.Costo)
          var lugares = parseInt(this.nuevaRuta.Lugares_Disponibles, 10)

          this.nuevaRuta.Costo = costo
          this.nuevaRuta.Lugares_Disponibles = lugares
          this.nuevaRuta.Id_Usuario = this.$cookies.get('Usuario')

          const response = await RutaService.registerRuta(this.nuevaRuta)

          setTimeout(() => {
            this.isLoading = false;
            if(response.status == 201 || response.status == 200){
              this.limpiarFormulario()
              this.showModalConfirm = true;
            }
          }, 4000);
        }else{
          this.isLoading = false;
          this.showModalError = true;
        }

      }catch(error){
        this.isLoading = false;
        this.isErrorRuta = true;
      }
        
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
    
    goToRegister() {
      if(this.nuevaRuta.Id_Unidad == "null"){
        this.$router.push('/vehiculos')
        this.nuevaRuta.Id_Unidad = '';
      }
    },

    goToVehiculo(){
      this.$router.push('/vehiculos')
    },

    async handleRefresh(event){
      this.isRefresher = true;
      await this.cargarDatos()

      setTimeout(() => {
        this.isRefresher = false;
        event.target.complete();
      }, 3000);

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

.bodyModal ion-icon {
  font-size: 36px;
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