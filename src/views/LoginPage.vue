<template>
    <ion-page>
      <app-bar-custom title="DestiCode"></app-bar-custom>

      <ion-content class="ion-padding">
        <!-- Totas de credenciales invalidas -->
        <ion-toast 
          position="top" 
          position-anchor="header" 
          message="Credenciales Inválidas."
          :is-open="isErrorLogin"
          color="danger"
          :duration="2000"
          :icon="closeCircleOutline"
        ></ion-toast>

        <!-- Totas de error de credenciales -->
        <ion-toast 
          position="top" 
          position-anchor="header" 
          message="Las credenciales ingresadas son incorrectas. Por favor, verifica la información proporcionada."
          :is-open="isErrorLogin"
          color="warning"
          :duration="4000"
          :icon="sadOutline"
        ></ion-toast>

        <!-- Totas de error de conexion -->
        <ion-toast 
          position="top" 
          position-anchor="header" 
          message="Se produjo un error al intentar conectar con el servidor. Por favor, inténtalo de nuevo más tarde."
          :is-open="isErrorConnection"
          color="danger"
          :duration="4000"
          :icon="wifiOutline"
        ></ion-toast>

        <ion-card class="ion-card-small">
          <ion-progress-bar type="indeterminate" v-if="isLoading"></ion-progress-bar>
          <ion-card-header>
            <ion-card-title>Bienvenido</ion-card-title>
            <ion-card-subtitle>Ingresa tu Email y Contraseña</ion-card-subtitle>
          </ion-card-header>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/tiendaservicios-b7281.appspot.com/o/Imagenes%2FLogo.jpg?alt=media&token=045bb3d8-886b-4b6e-af3d-1c55197c9594"
            class="login-image" />

          <ion-card-content>
            <ion-grid>
              <ion-row>

                <ion-col size="12">
                  <ion-input v-model="usuario" 
                  label="Email" fill="outline" 
                  :color="validateEmail(usuario)"
                  @ionBlur="onInputBlur"
                  label-placement="floating" 
                  placeholder="Ingresa tu correo" 
                  type="email" 
                  required>
                  </ion-input>
                  <span v-if="!isValidCorreo && inputTouchedCorreo"><ion-text color="danger">Correo Inválido</ion-text></span>
                </ion-col>

                <ion-col size="12">
                  <ion-input v-model="contrasena" 
                  :color="valiteContra(contrasena)" 
                  label="Contraseña" 
                  type="password"
                  @ionBlur="onInputPass" 
                  label-placement="floating" 
                  required placeholder="Ingresa tu contraseña" 
                  fill="outline"
                  show-password-toggle="true">
                  </ion-input>
                  <span v-if="contrasena && contrasena.length < 8"><ion-text color="danger">La contraseña debe tener mínimo 8 caracteres.</ion-text></span>
                </ion-col>

                <ion-col>
                  <ion-text>
                    <a href="/recuperar-contra">¿Olvidaste tu contraseña?</a>
                  </ion-text>
                </ion-col>

                <ion-col size="12">
                  <ion-button expand="full" color="tertiary" :disabled="disabledButton" shape="round" @click="iniciarSesion">
                    Iniciar Sesión
                  </ion-button>
                </ion-col>

                <ion-col size="12" style="text-align: center;">
                  <ion-text>¿No tienes Cuenta?</ion-text>
                  <ion-button expand="full" color="tertiary" @click="registrarUsuario" shape="round" fill="outline">
                    Registrate Aquí
                  </ion-button>
                </ion-col>

              </ion-row>
            </ion-grid>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
<script>
//Componentes
import AppBarCustom from '../components/NavBarCustom.vue'
//Ionic
import { 
  IonInput, IonButton, IonToast, IonPage, IonCard, IonCardHeader, IonCardContent, IonProgressBar,
  IonGrid, IonRow, IonCol, IonCardTitle, IonCardSubtitle, IonText, IonContent,
} from '@ionic/vue';
//Iconos
import { closeCircleOutline, wifiOutline, sadOutline } from 'ionicons/icons'
//Servicios 
import AuthService from '../Services/AuthService'

export default {
  components: { 
    AppBarCustom,
    IonInput, IonButton, IonToast, IonPage,IonCard, IonCardHeader, IonCardContent,
    IonProgressBar, IonGrid, IonRow, IonCol, IonCardTitle, IonCardSubtitle, IonText, IonContent,
    IonProgressBar,
  },
  name: 'Home',
  data: () => ({
    //Iconos
    closeCircleOutline,
    wifiOutline,
    sadOutline,

    usuario: '',
    contrasena: '',

    isLoading: false,
    disabledButton: false,
    mostrarToastError: false,
    isErrorLogin: false,
    isErrorConnection: false,
    isValidCorreo: false,
    isValidContra: false,
    inputTouchedCorreo: false,
    inputTouchedContra: false,
    
      
  }),

  methods: {
    onInputBlur(){
      this.inputTouchedCorreo = true;  
    },

    onInputPass(){
      this.inputTouchedContra = true;
    },

    validateEmail(email) {
      const correoRegex = /@uttt\.edu\.mx$/;

      var isValid = correoRegex.test(email);

      this.isValidCorreo = isValid;

      if(this.isValidCorreo){
        return 'success'
      }else{
        return 'danger'
      }
    },

    valiteContra(pass){
      var data = pass.length >= 3;

      this.isValidContra = data;

      if(this.isValidContra){
        return 'success'
      }else{
        return 'danger'
      }
    },

    async iniciarSesion() {
      try{
        if(!this.isValidCorreo && !this.isValidContra) return;
        
        this.isLoading = true;
        this.disabledButton = true;
        this.isErrorLogin = false;
        this.isErrorConnection = false;

        var credenciales = { Correo: this.usuario, Contrasenia: this.contrasena }
        const response = await AuthService.login(credenciales)

        setTimeout(() => {
          if(response.status == 200 || response.status == 201){
            localStorage.setItem('AccessTokenLocal', response.data.token);
            localStorage.setItem('UsuarioLocal', response.data.usuario);

            this.$cookies.set('AccessToken', localStorage.getItem('AccessTokenLocal'), { expires: 1 });
            this.$cookies.set('Usuario', localStorage.getItem('UsuarioLocal'), { expires: 1 });
            this.isValidCorreo = false;
            this.isValidContra = false;
            this.usuario = '';
            this.contrasena = '';
            this.isLoading = false;
            this.disabledButton = false;
            this.$router.push('/home')
          }
          if(response.status == 400){
            this.isErrorLogin = true;
            this.disabledButton = false;
          }
        }, 3000);
        
      }
      catch(error){
        if(error.message.includes('Network Error')){
          this.isLoading = false;
          this.isErrorConnection = true;
          this.disabledButton = false;
        }else{
          this.isLoading = false;
          this.isErrorLogin = true;
          this.disabledButton = false;
          console.error('Error desconocido');
        }
      }
    },
  
    registrarUsuario() {
      this.$router.push("/registro")
    },

    validarForm(){
      const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.CorreoValido = expresionRegularCorreo.test(this.usuario);
      this.ContraValida = this.contrasena.length > 3 
    }
  },

};
</script>
  
  <style scoped>
  .ion-card-small {
    max-width: 400px;
    margin: 0 auto;
  }

  a{
    text-decoration: none;
  }

  .ion-card-small ion-card-header {
    text-align: center;
  }
  
  ion-button {
    margin-top: 10px;
  }
  
  .login-image {
    display: block;
    margin: 0 auto;
    max-width: 150px;
    height: 100px;
    /* border-radius: 100px; */
  }
  </style>