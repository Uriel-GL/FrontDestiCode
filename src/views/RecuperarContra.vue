<template>
    <ion-page>
        <app-bar-custom title="Recuperación"></app-bar-custom>
        <loading :active="isLoading" :can-cancel="false" :is-full-page="true" />

        <ion-content class="ion-padding">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Recupera tu Contraseña</ion-card-title>
                    <ion-card-subtitle>¿Ya no recuerdas tu contraseña?</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                    <div v-if="!CodigoValido">
                        <h2>
                            Ingresa el correo con el que te registraste y te enviaremos un código para que puedas 
                            restablecer tu contraseña.
                        </h2>
                        <br>
                        <ion-input
                        label="Correo Electrónico"
                        label-placement="floating"
                        placeholder="Ingresa un correo válido"
                        fill="outline"
                        color="success"
                        type="email"
                        v-model="request.Correo"
                        required
                        >                
                        </ion-input>
                        <ion-grid></ion-grid>

                        <div class="opciones">
                            <ion-button fill="clear" color="danger" shape="round" @click="regresar" >
                                Regresar
                            </ion-button>
                            <ion-button  shape="round" color="success" @click="enviarCorreo">
                                Enviar Correo
                            </ion-button>
                        </div>
                    </div>
                    
                    
                    <ion-grid v-if="CodigoValido">
                        <ion-row>
                            <ion-col size="12">
                                <ion-input
                                label="Correo Electrónico"
                                label-placement="floating"
                                placeholder="Ingresa de nuevo tu correo"
                                fill="outline"
                                color="success"
                                type="email"
                                v-model="request.Correo"
                                required
                                ></ion-input>
                            </ion-col>
                            <ion-col size="12">
                                <ion-input
                                label="Código"
                                label-placement="floating"
                                placeholder="Ingresa el código que te enviamos"
                                fill="outline"
                                color="success"
                                type="text"
                                v-model="request.Token"
                                required
                                ></ion-input>
                            </ion-col>

                            <ion-col>
                                <ion-input
                                label="Nueva Contraseña"
                                label-placement="floating"
                                placeholder="Ingresa tu nueva contraseña"
                                fill="outline"
                                color="success"
                                type="password"
                                v-model="request.Contrasenia"
                                required
                                ></ion-input>
                            </ion-col>

                            <ion-col>
                                <ion-input
                                label="Repite la Contraseña"
                                label-placement="floating"
                                placeholder="Confirma tu nueva contraseña"
                                fill="outline"
                                color="success"
                                type="password"
                                v-model="pass"
                                required
                                ></ion-input>
                            </ion-col>

                            <ion-col size="12">
                                <ion-button expand="full" shape="round" color="success" @click="restablecerContra">
                                    Restablecer Contraseña
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                    
                    
                    <ion-button fill="clear" shape="round" expand="full" @click="CodigoValido = true">
                        ¿Ya tienes tu código?
                    </ion-button>

                </ion-card-content>
            </ion-card>
        </ion-content>

        <!-- Modal de confirmación de envio de correo -->
        <ion-modal ref="modal" :is-open="showModalConfirm">
        <div class="bodyModal">
            <h2>Envio Exitoso</h2>
            <ion-icon :icon="checkmarkOutline" color="success"></ion-icon>
            <h3>Te enviamos a tu correo un código para que puedas recuperar tu contraseña.</h3>
            <h4>Revisa tu bandeja de entrada o spam.</h4>
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

        <!-- Modal de confirmación de envio de correo -->
        <ion-modal ref="modal" :is-open="showModalConfirmReset">
        <div class="bodyModal">
            <h2>Exito</h2>
            <ion-icon :icon="checkmarkOutline" color="success"></ion-icon>
            <h3>Tu contraseña fue reestablecida de manera correcta.</h3>
            <ion-grid>
            <ion-row>
                <ion-col>
                <ion-button @click="showModalConfirmReset = false" shape="round" color="success">
                    Confirmar
                </ion-button>
                </ion-col>     
            </ion-row>
            </ion-grid>
        </div>
        </ion-modal>

        <!-- Totas de error de conexion -->
        <ion-toast 
          position="bottom" 
          position-anchor="header" 
          message="Ocurrio un error al intentar conectar con el servidor, intenta más tarde."
          :is-open="isErrorConnection"
          color="danger"
          :duration="2000"
          :icon="wifiOutline"
        ></ion-toast>

        <!-- Totas de error de formulario -->
        <ion-toast 
          position="bottom" 
          position-anchor="header" 
          :message="mensajeToast"
          :is-open="isErrorPass"
          color="warning"
          :duration="5000"
          :icon="closeCircleOutline"
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
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonText, IonButton, IonInput, IonIcon, IonToast,
    IonModal, IonContent, IonPage, IonGrid, IonCol, IonRow, IonCardContent
} from '@ionic/vue'
//Iconos
import { mailOutline, wifiOutline, checkmarkOutline, closeCircleOutline } from 'ionicons/icons'
//Servicios
import AuthService from '@/Services/AuthService'
export default {
    components: {
        AppBarCustom, Loading,
        IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonText, IonButton, IonInput,
        IonIcon, IonToast, IonModal, IonContent, IonPage, IonGrid, IonCol, IonRow, IonCardContent

    },

    data: () => ({
        //Iconos
        mailOutline,
        wifiOutline,
        checkmarkOutline,
        closeCircleOutline,

        isLoading: false,
        isCorreoValid: true,
        isErrorConnection: false,
        showModalConfirm: false,
        CodigoValido: false,
        isErrorPass: false,
        showModalConfirmReset: false,

        pass: '',
        mensajeToast: '',
        request: {
            Correo: '',
            Contrasenia: '',
            Token: ''
        },

    }),

    methods: {
        async enviarCorreo(){
            try{
                this.isErrorConnection = false;
                this.isLoading = true;

                const response = await AuthService.recuperarContra(this.request)
                setTimeout(() => {
                    if(response.status == 201 || response.status == 200){
                        this.isLoading = false;
                        this.showModalConfirm = true;
                        this.request.Correo = '';
                    }
                }, 3000);
            }
            catch(error){
                this.isLoading = false;
                this.isErrorConnection = true;
            }
        },

        async restablecerContra(){
            this.isErrorPass = false;
            try{
                this.isLoading = true;
                var validate = this.validar()

                if(!validate) return;

                const resonse = await AuthService.resetearContra(this.request)
                setTimeout(() => {
                    if(resonse.status == 201 || resonse.status == 200){
                        this.isLoading = false;
                        this.showModalConfirmReset = true;
                        this.isErrorPass = false;
                        this.limpiarFormulario()
                    }
                }, 3000);
            }
            catch(error){

            }
        },

        validar(){
            this.isErrorPass = false;
            if(!this.request.Correo){
                this.mensajeToast = "Ingresa un correo válido."
                this.isLoading = false;
                this.isErrorPass = true;
                return;
            }

            if(this.request.Token.length < 36){
                this.mensajeToast = "Ingresa un código válido."
                this.isLoading = false;
                this.isErrorPass = true;
                return
            }

            if(this.request.Contrasenia != this.pass){
                this.mensajeToast = "Las contraseñas no coinciden."
                this.isLoading = false;
                this.isErrorPass = true;
                return;
            }

            return true;
        },

        limpiarFormulario(){
            this.request.Contrasenia = '',
            this.pass = '';
            this.request.Token = '';
            this.request.Correo = '';
            this.CodigoValido = false;
        },

        regresar(){
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
ion-card {
    max-width: 500px;
    margin: 0 auto;
}

ion-card-header {
    text-align: center;
}

h2 {
    text-align: center;
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

.opciones {
    text-align: center;
}
</style>