<template>
    <ion-page>
      <nav-bar-custom-vue title="Tu Perfil"></nav-bar-custom-vue>
  
      <ion-content class="ion-padding">
        <ion-card class="cardPerfil">
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
              <ion-item v-for="car in vehiculos" :key="car.id_Unidad">
                <ion-icon :icon="carOutline"></ion-icon>
                <ion-label>{{ car.modelo }}</ion-label>
                <ion-button fill="clear" color="warning" shape="round" @click="editarVehiculo(car.id_Unidad)">
                  <ion-icon :icon="createOutline" slot="icon-only"></ion-icon>
                </ion-button>
                <ion-button fill="clear" color="danger" shape="round" @click="eliminarVehiculo(car.id_Unidad)">
                  <ion-icon :icon="trashOutline" slot="icon-only"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-list>

            <ion-button fill="clear" shape="round" expand="full" @click="cerrarSesion">
              <ion-icon :icon="exitOutline" slot="start"></ion-icon>
              Cerrar Sesión
            </ion-button>

          </ion-card-content>
        </ion-card>
      </ion-content>
  
    </ion-page>
  </template>
  
<script>
//Componentes
import NavBarCustomVue from '@/components/NavBarCustom.vue'
//Ionic
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardTitle,
  IonCardHeader, IonLabel, IonItem, IonText, IonAvatar, IonIcon, IonList,
} from '@ionic/vue'
//Iconos
import { 
  callOutline, mailOutline, schoolOutline, idCardOutline, todayOutline, createOutline, exitOutline,
  trashOutline, carOutline
} from 'ionicons/icons'
//Servicios
import UsuarioService from '../Services/UsuarioService'
import VehiculoService from '@/Services/VehiculoService'
export default {
  components: {
    NavBarCustomVue,
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardTitle,
    IonCardHeader, IonLabel, IonItem, IonText, IonAvatar, IonIcon, IonList
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

    usuario: {},
    datosP: {},
    vehiculos: []
  }),

  async created() {
    var SesionValid = this.$cookies.isKey('AccessToken') && this.$cookies.isKey('Usuario')
    if(SesionValid){
      const response = await UsuarioService.getUserInfo(this.$cookies.get('Usuario'))
      const responseV = await VehiculoService.getVehiculosByUsuario(this.$cookies.get('Usuario'))
      this.datosP = JSON.parse(JSON.stringify(response.data))
      this.usuario = JSON.parse(JSON.stringify(response.data.usuarios))
      this.vehiculos = JSON.parse(JSON.stringify(responseV.data))
      console.log(this.datosP)
      console.log(this.usuario)
      console.log(this.vehiculos)
    }else{
      this.$router.push('/login')
    } 
  },

  methods: {
    cerrarSesion() {

    },

    editarInfo(){
      console.log(this.$cookies.get('Usuario'))
    },

    editarVehiculo(Id_Unidad) {
      console.log(Id_Unidad)
    },

    eliminarVehiculo(Id_Unidad){
      console.log(Id_Unidad)
    }
  },
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

</style>