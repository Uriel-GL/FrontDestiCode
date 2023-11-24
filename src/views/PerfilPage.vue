<template>
    <ion-page>
      <nav-bar-custom-vue title="Tu Perfil"></nav-bar-custom-vue>
      <loading :active="isLoading" :can-cancel="false" :is-full-page="true" />
  
      <ion-content class="ion-padding">
        <!-- Refresher -->
        <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <ion-card class="cardPerfil" :disabled="isRefresh">
          <ion-card-header>
            <ion-avatar>
              <img src="https://ionicframework.com/docs/img/demos/avatar.svg" >
            </ion-avatar>
            <ion-card-title>{{ usuario.nombre_Usuario }}</ion-card-title>
            <ion-card-subtitle>{{ usuario.correo }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-card-title>Información Personal</ion-card-title>
            <ion-button fill="clear" shape="round" color="success" @click="editarInfo">
              <ion-icon :icon="createOutline" slot="icon-only"></ion-icon>
            </ion-button>

            <ion-item>
              <ion-icon :icon="callOutline" slot="start"></ion-icon>
              <ion-label>Telefono</ion-label>
              <b>{{ datosP.telefono }}</b>
            </ion-item>
            <ion-item>
              <ion-icon :icon="mailOutline" slot="start"></ion-icon>
              <ion-label>Correo</ion-label>
              <b>{{ datosP.correo }}</b>
            </ion-item>
            <ion-item>
              <ion-icon :icon="schoolOutline" slot="start"></ion-icon>
              <ion-label>Grupo</ion-label>
              <b>{{ datosP.grupo }}</b>
            </ion-item>
            <ion-item>
              <ion-icon :icon="idCardOutline" slot="start"></ion-icon>
              <ion-label>Matricula</ion-label>
              <b>{{ datosP.matricula }}</b>
            </ion-item>

            <br>
            <ion-card-title>Vehiculos Registrados</ion-card-title>
            <ion-list>
              <ion-item v-if="vehiculos.length == 0">
                <ion-label>Agregar Vehiculo</ion-label>
                <ion-button fill="clear" shape="round" color="success" @click="goToVehiculos">
                  <ion-icon style="font-size: 26px;" :icon="addCircleOutline" slot="icon-only"></ion-icon>
                </ion-button>
              </ion-item>
              <ion-item v-for="car in vehiculos" :key="car.id_Unidad">
                <ion-icon :icon="carOutline"></ion-icon>
                <ion-label>{{ car.modelo }}</ion-label>
                <ion-button fill="clear" color="warning" shape="round" @click="editarVehiculo(car.id_Unidad)">
                  <ion-icon :icon="createOutline" slot="icon-only"></ion-icon>
                </ion-button>
                <ion-button fill="clear" color="danger" shape="round" @click="openDeleteModal(car.id_Unidad)">
                  <ion-icon :icon="trashOutline" slot="icon-only"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-list>

            <ion-button @click="showModalConfirm = true" fill="clear" shape="round" expand="full">
              <ion-icon :icon="exitOutline" slot="start"></ion-icon>
              Cerrar Sesión
            </ion-button>

          </ion-card-content>
        </ion-card>
      </ion-content>
      
      <!-- Modal para cerrar sesion -->
      <ion-modal ref="modal" :is-open="showModalConfirm">
        <div class="bodyModal">
          <h2>Salir</h2>
            <ion-icon :icon="sadOutline" ></ion-icon>
              <h3>Estas por cerrar sesion. <br>¿Estas Seguro?</h3>
              <ion-grid>
                <ion-row>
                  <ion-col>
                    <ion-button @click="showModalConfirm = false" shape="round" fill="clear">
                      Cancelar
                    </ion-button>
                    <ion-button @click="cerrarSesion" shape="round">
                      Salir
                    </ion-button>
                  </ion-col>     
                </ion-row>
              </ion-grid>
        </div>
      </ion-modal>

      <!-- Modal de confirmación de eliminar unidad -->
      <ion-modal ref="modal" :is-open="showModalConfirmDelete">
        <div class="bodyModal">
            <h2>Eliminar Vehiculo</h2>
            <ion-icon :icon="trashOutline" color="danger"></ion-icon>
            <h3>Estar por eliminar tu vehiculo<br>¿Estas seguro?</h3>
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-button @click="showModalConfirmDelete = false" fill="clear" shape="round">
                    Cancelar
                  </ion-button>
                  <ion-button @click="eliminarVehiculo" shape="round" color="success">
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
            <h2>Eliminación Exitosa</h2>
            <ion-icon :icon="checkmarkOutline" color="success"></ion-icon>
            <h3>Tu vehiculo fue eliminado.</h3>
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
            <h2>Error</h2>
            <ion-icon :icon="closeOutline" color="danger"></ion-icon>
            <h3>No pudimos eliminar tu vehiculo, intenta mas tarde.</h3>
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
        message="Ocurrio un error intenta mas tarde."
        :is-open="isErrorPerfil"
        color="danger"
        :duration="2000"
        :icon="wifiOutline"
      ></ion-toast>

    </ion-page>
  </template>
  
<script>
//Componentes
import NavBarCustomVue from '@/components/NavBarCustom.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css';
//Ionic
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardTitle,
  IonCardHeader, IonLabel, IonItem, IonText, IonAvatar, IonIcon, IonList, IonModal, IonRefresher, IonToast,
  IonGrid, IonCol, IonRow, IonCardSubtitle, IonRefresherContent, IonButton
} from '@ionic/vue'
//Iconos
import { 
  callOutline, mailOutline, schoolOutline, idCardOutline, todayOutline, createOutline, exitOutline,
  trashOutline, carOutline, sadOutline, closeOutline, checkmarkOutline, addCircleOutline, wifiOutline
} from 'ionicons/icons'
//Servicios
import UsuarioService from '../Services/UsuarioService'
import VehiculoService from '@/Services/VehiculoService'
export default {
  components: {
    NavBarCustomVue, Loading,
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardTitle,
    IonCardHeader, IonLabel, IonItem, IonText, IonAvatar, IonIcon, IonList, IonModal, IonRefresher,
    IonGrid, IonCol, IonRow, IonToast, IonCardSubtitle, IonRefresherContent, IonButton
  },
  
  data: () => ({
    //Iconos
    callOutline,
    mailOutline,
    schoolOutline,
    idCardOutline,
    todayOutline,
    createOutline,
    exitOutline,
    trashOutline,
    carOutline,
    sadOutline,
    closeOutline,
    checkmarkOutline,
    addCircleOutline,
    wifiOutline,

    isErrorPerfil: false,
    showModalConfirm: false,
    showModalConfirmDelete: false,
    showModalSuccess: false,
    showModalError: false,
    isLoading: false,
    isRefresh: false, 

    usuario: {},
    datosP: {},
    vehiculos: [],
    unidad: ''
  }),

  async created() {
    await this.cargarDatos()
  },

  methods: {
    async cargarDatos(){
      try{
        var SesionValid = this.$cookies.isKey('AccessToken') && this.$cookies.isKey('Usuario')
        if(SesionValid){
          const response = await UsuarioService.getUserInfo(this.$cookies.get('Usuario'))
          const responseV = await VehiculoService.getVehiculosByUsuario(this.$cookies.get('Usuario'))
          this.datosP = JSON.parse(JSON.stringify(response.data))
          this.usuario = JSON.parse(JSON.stringify(response.data.usuarios))
          this.vehiculos = JSON.parse(JSON.stringify(responseV.data))
          this.showModalConfirm = false;
        }else{
          this.$router.push('/login')
        }
      }catch(error){
        this.isErrorPerfil = true;
      }
       
    },

    cerrarSesion() {
      this.$cookies.remove('AccessToken')
      this.$cookies.remove('Usuario')
      this.showModalConfirm = false    
      this.$router.push('/login')
    },

    editarInfo(){
      var id = this.$cookies.get('Usuario');
      console.log(this.$cookies.get('Usuario'))
      this.$router.push(`/ActualizarDatosPersonales/${id}`)
    },

    editarVehiculo(Id_Unidad) {
      this.$router.push(`/Actualizar-Vehiculo/${Id_Unidad}`)
    },

    openDeleteModal(id_Unidad){
      this.unidad = id_Unidad;
      this.showModalConfirmDelete = true;
    },

    async eliminarVehiculo(){
      this.isLoading = true;
      this.showModalConfirmDelete = false;
      const response = await VehiculoService.deleteVehiculo(this.unidad);
      
      setTimeout(() => {
        if(response.status == 201 || response.status == 200){
          this.isLoading = false;
          this.showModalSuccess = true;
          const index = this.vehiculos.findIndex(car => car.id_Unidad === this.unidad);
          if(index !== -1){
            this.vehiculos.splice(index, 1);
          }
          this.unidad = '';
        }else{
          this.isLoading = false;
          this.showModalSuccess = false;
          this.showModalError = true;
        }
      }, 3000);
    },

    goToVehiculos(){
      this.$router.push('/vehiculos')
    },

    async handleRefresh(event){
      this.isRefresh = true;
      await this.cargarDatos()

      setTimeout(() => {
        this.isRefresh = false;
        event.target.complete();
      }, 3000);

    }
  }
}
</script>
  
<style scoped>
ion-card-header {
  text-align: center;
}
.cardPerfil ion-avatar {
  margin: 0 auto;
  width: 100px;
  height: 100px;
}
ion-card-content {
  margin-top: 15px;
  text-align: center;
}
.bodyPerfil {
  padding: 10px;
}
.cardPerfil {
  max-width: 450px;
  margin: 0 auto;
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