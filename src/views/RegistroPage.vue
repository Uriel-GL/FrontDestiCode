<template>
    <ion-page>
        <app-bar-custom title="Registro de Usuarios"></app-bar-custom>
        <loading :active="isLoading" :can-cancel="false" :is-full-page="true" />

        <ion-content class="ion-padding" v-if="!mostrarSegundoFormulario">

            <ion-card class="cardForm1">
                <ion-card-header>
                    <ion-card-title>Registro</ion-card-title>
                    <ion-card-subtitle>Ingresa tus datos de ingreso</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                    <img src="https://firebasestorage.googleapis.com/v0/b/tiendaservicios-b7281.appspot.com/o/Imagenes%2FLogo.jpg?alt=media&token=045bb3d8-886b-4b6e-af3d-1c55197c9594" 
                     class="login-image">

                    <br>
                    <ion-grid>
                        <ion-row>
                            <ion-col size="12">
                                <ion-input label="Correo Electrónico" v-model="correo" type="email" label-placement="floating" fill="outline" color="success"></ion-input>
                                <ion-text color="danger" v-if="!CorreoValido"
                                    style="text-align: center">
                                    El correo no es valido
                                </ion-text>
                            </ion-col>
                            <ion-col size="12">
                                <ion-input label="Contraseña" type="password" v-model="contrasenia" label-placement="floating" fill="outline" color="success"></ion-input>
                                <ion-text color="danger" v-if="contrasenia && contrasenia.length < 8"
                                    style="text-align: center">
                                    La contraseña debe tener minimo 8 caracteres
                                </ion-text>
                            </ion-col>
                            <ion-col size="12">
                                <ion-input label="Confirmación de contraseña" v-model="confirmarContrasenia" type="password" label-placement="floating" fill="outline" color="success"></ion-input>
                                <ion-text color="danger" v-if="confirmarContrasenia && contrasenia !== confirmarContrasenia"
                                    style="text-align: center">
                                    Las contraseñas no coinciden.
                                </ion-text>
                            </ion-col>

                            <ion-col size="12">
                                <ion-button @click="validarFormulario1" shape="round" color="tertiary" 
                                expand="full">
                                    Continuar
                                </ion-button>
                            </ion-col>
                            <ion-col size="12">
                                <ion-button expand="full" @click="goToLogin" shape="round" color="danger" fill="clear">
                                    Regresar
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card-content>
            </ion-card>
        </ion-content>

        <ion-content class="ion-padding" v-else>

            <ion-card class="cardForm1">
                <ion-card-header>
                    <ion-card-title>Tus datos personales</ion-card-title>
                    <ion-card-subtitle>Ingresa tu información</ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                    <ion-grid>
                        <ion-row>
                            <ion-col size="12">
                                <ion-input label="Nombre Completo" label-placement="floating"
                                placeholder="Ingresa tu nombre Completo" 
                                fill="outline" color="success"
                                v-model="nombreCompleto">
                                </ion-input>
                                <ion-text color="danger" v-if="nombreCompleto && nombreCompleto.length < 3"
                                    style="text-align: center">
                                    El nombre es requerido.
                                </ion-text>
                            </ion-col>
                            <ion-col size="12">
                                <ion-input label="Telefono" label-placement="floating"
                                placeholder="Ingresa tu número de telefono" 
                                fill="outline" color="success"
                                v-model="telefono">
                                </ion-input>
                                <ion-text color="danger" v-if="telefono && telefono.length < 10"
                                    style="text-align: center">
                                    El núm debe ser minimo de 10 digitos.
                                </ion-text>
                            </ion-col>
                            <ion-col size="6">
                                <ion-input label="Grupo" label-placement="floating"
                                placeholder="Ingresa el grupo al que perteneces"
                                fill="outline" color="success"
                                v-model="grupo">
                                </ion-input>
                                <ion-text color="danger" v-if="grupo && grupo.length < 3"
                                    style="text-align: center">
                                    El grupo es requerido.
                                </ion-text>
                            </ion-col>
                            <ion-col size="6">
                                <ion-input label="Matricula" label-placement="floating"
                                placeholder="Ingresa tu núm de Matricula"
                                fill="outline" color="success"
                                v-model="matricula">
                                </ion-input>
                                <ion-text color="danger" v-if="matricula && matricula.length < 8"
                                    style="text-align: center">
                                    La matricula debe minimo de 8 digitos.
                                </ion-text>
                            </ion-col>
                            <ion-col size="12">
                                <ion-item>
                                <ion-label>Fecha de Nacimiento</ion-label>
                                <ion-input :value="fechaNacimiento" 
                                    class="ion-text-end" id="date" />
                                    <ion-popover trigger="date" size="auto">
                                    <ion-content>
                                        <ion-datetime v-model="fechaNacimiento" display-format="DD/MM/YYYY"></ion-datetime>
                                    </ion-content>
                                    </ion-popover>
                                </ion-item>
                                <ion-text color="danger" v-if="fechaNacimiento && fechaNacimiento.length < 5"
                                    style="text-align: center">
                                    La fecha de nacimiento es requerida.
                                </ion-text>
                            </ion-col>
                        </ion-row>
                        <br>
                        <!-- <ion-row>
                            <ion-col class="colImage">
                                <ion-card-title>Fotografia de Referencia</ion-card-title>
                                <ion-card-subtitle>
                                    Agrega una imagen de tu credencial de la UT, para validar tus datos.
                                </ion-card-subtitle>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="12">
                                <ion-item>
                                    <label class="image-upload">
                                        <ion-input type="file" v-model="credencial" 
                                        @change="handleFileChange" 
                                        accept="image/*"
                                        required>
                                        </ion-input>
                                        <ion-icon :icon="cloudUploadOutline"></ion-icon>
                                        Subir Imagen
                                    </label>
                                </ion-item>
                            </ion-col>
                            <ion-col size="12">
                                <ion-item>
                                    <ion-img :src="credencialPreview" v-if="credencialPreview"></ion-img>
                                </ion-item>
                            </ion-col>
                        </ion-row> -->
                        
                        <br>
                        <div class="botonesRegistro">
                            <ion-button shape="round" fill="clear" color="danger"
                            @click="mostrarSegundoFormulario = false">
                                Regresar
                            </ion-button>

                            <ion-button shape="round" color="tertiary" @click="registrarUsuario">
                                Registrarme
                            </ion-button>
                        </div>
                    </ion-grid>
                </ion-card-content>
            </ion-card>

        </ion-content>

        <!-- Totas de error en la api invalidas -->
        <ion-toast 
        position="top" 
        position-anchor="header" 
        message="Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
        :is-open="isErrorDefault"
        color="danger"
        :duration="2000"
        :icon="wifiOutline"
        ></ion-toast>

        <!-- Modal de confirmación de registro de tu ruta -->
        <ion-modal ref="modal" :is-open="showModalConfirm">
            <div class="bodyModal">
                <h2>Registro Exitoso</h2>
                <ion-icon :icon="checkmarkOutline" color="success"></ion-icon>
                <h3>Te has registrado de manera exitosa.</h3>
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

        <!-- Modal de error de tus datos FORMULARIO -->
        <ion-modal ref="modal" :is-open="showModalErrorForm">
            <div class="bodyModal">
                <h2>Adevertencia</h2>
                <ion-icon :icon="alertCircleOutline" color="warning"></ion-icon>
                <h3>Por favor, completa todos los campos del formulario.</h3>
                <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-button @click="showModalErrorForm = false" shape="round" color="success">
                            Aceptar
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
    IonDatetime, IonDatetimeButton, IonModal, IonInput, IonCard, IonCardContent, IonButton, IonToast, IonItem, 
    IonList, IonTitle, IonToolbar, IonHeader, IonLabel, IonContent, IonPage, IonPopover, IonCardHeader, 
    IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, IonText, IonIcon, IonImg
} from '@ionic/vue';
//Iconos
import { cloudUploadOutline, wifiOutline, checkmarkOutline, alertCircleOutline } from 'ionicons/icons'
//Servicios
import AuthService from '@/Services/AuthService';

export default {
    components: { 
        AppBarCustom,Loading,
        IonPopover, IonDatetime, IonDatetimeButton, IonModal, IonInput, IonCard, IonCardContent, 
        IonButton, IonToast, IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonLabel, IonContent, 
        IonPage, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, IonText, IonIcon, 
        IonImg

    },
    name: 'RegistroUsuario',

    data: () => ({
        //Iconos
        cloudUploadOutline,
        wifiOutline,
        checkmarkOutline,
        alertCircleOutline,

        nombreUsuario: '',
        correo: '',
        contrasenia: '',
        fechaRegistro: '',
        showPassword: false,
        nombreCompleto: '',
        fechaNacimiento: '',
        matricula: '',
        grupo: '',
        universidad: 'Universidad Tecnologica de Tula-Tepeji',
        telefono: '',
        estatus: '',
        credencial: null,
        credencialPreview: null,
        mostrarSegundoFormulario: false,
        confirmarContrasenia: '',

        mensajeToast: '',
        iconoToast: null,
        colorToast: null,
        
        isLoading: false,
        isErrorDefault: false,
        CorreoValido: true,
        showModalConfirm: false,
        mostrarToastError: false,
        showModalErrorForm: false,

    }),
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.type.startsWith('image/')) {
                    this.credencial = file;
                    const img = new Image();
                    img.src = URL.createObjectURL(file);
                    img.onload = () => {
                        this.credencialPreview = img.src;
                    };
                } else {
                    alert("El archivo seleccionado no es una imagen válida.");
                    this.credencial = null;
                }
            }
        },

        validarFormulario1() {
            const correoRegex = /@uttt\.edu\.mx$/;

            var isValid = correoRegex.test(this.correo);
            var isCorrect = this.contrasenia >= 8;
            var isEquals = this.confirmarContrasenia == this.contrasenia ;

            console.log(isValid)
            console.log(isCorrect)
            console.log(isEquals)

            // Validación de correo electrónico
            if (isValid && isCorrect && isEquals) {
                this.CorreoValido = true;
                this.mostrarSegundoFormulario = true;
            }else{
                this.CorreoValido = false;
                console.log("Debes ingresar un correo institucional.");
                return;
            }
        },

        validarFormulario2() {
            const telefonoPattern = /^\d{10}$/;
            const matriculaPattern = /^\d{8}$/;
            let errorMessage = "";

            if (!this.nombreCompleto) errorMessage += "Por favor, ingrese el nombre completo.\n";

            if (!this.fechaNacimiento)  errorMessage += "Por favor, ingrese la fecha de nacimiento.\n";
            
            if (!matriculaPattern.test(this.matricula)) errorMessage += "La matrícula debe contener exactamente 8 dígitos numéricos.\n";
            
            if (!this.grupo) errorMessage += "Por favor, ingrese el grupo.\n";
            
            if (!telefonoPattern.test(this.telefono)) errorMessage += "El teléfono debe contener exactamente 10 dígitos numéricos.\n";
            
            //if(!this.credencial) errorMessage += "La crendecial es requerida.\n";
            
            if (errorMessage == "") return true;
            
            return false;
        },

        generateGuid() {
            let d = Date.now();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
                d += performance.now(); // Agregar tiempo de alta resolución si está disponible
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        },

        async registrarUsuario(){
            try{
                this.isErrorDefault = false;
                this.isLoading = true;
                if(this.validarFormulario2()){
                    this.mostrarToastError = false;
                    //const imagenBase64 = await this.getBase64Image();

                    const request = {
                        usuario: {
                            id_Usuario: this.generateGuid(),
                            nombre_Usuario: this.nombreCompleto.trim(),
                            correo: this.correo.trim(),
                            contrasenia: this.contrasenia.trim(),
                            fecha_Registro: new Date(),
                            estatus: true,
                            token: null,
                            registro: null
                        },
                        datosPersonales: {
                            id_DatosPersonales: this.generateGuid(),
                            id_Usuario: this.generateGuid(),
                            nombre_Completo: this.nombreCompleto.trim(),
                            fecha_Nacimiento: this.fechaNacimiento.trim(),
                            matricula: this.matricula.trim(),
                            grupo: this.grupo.trim(),
                            credencial: 'sin credencial',
                            universidad: this.universidad.trim(),
                            telefono: this.telefono.trim(),
                            correo: this.correo.trim(),
                            estatus: true
                        }
                    };

                    const response = await AuthService.registro(request);
                    console.log(response)
                    setTimeout(() => {
                        if(response.status == 200 || response.status == 201){
                            this.isLoading = false;
                            this.showModalConfirm = true;
                            this.limpiarFormulario();
                            this.mostrarSegundoFormulario = false;
                        }
                    }, 3000);

                }else{
                    //DATOS INCOMPLETOS
                    this.isLoading = false;
                    this.showModalErrorForm = true;
                }

            }
            catch(error){
                console.log("Error: " + error)
                this.isLoading = false;
                this.isErrorDefault = true;
            }
        },

        getBase64StringFromDataURL(dataURL) {
            return dataURL.replace('data:', '').replace(/^.+,/, '');
        },

        async getBase64Image() {
            return new Promise((resolve) => {
                const image = new Image();
                image.src = this.credencialPreview;
                image.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    // Establecer el tamaño del canvas igual al tamaño de la imagen
                    canvas.width = image.width;
                    canvas.height = image.height;

                    // Dibujar la imagen en el canvas
                    ctx.drawImage(image, 0, 0);

                    // Obtener el base64 del canvas
                    const dataURL = canvas.toDataURL("image/png");
                    resolve(dataURL);
                };
            });
        },

        validarCorreoElectronico(correo) {
            // Expresión regular para validar el formato de correo electrónico
            const correoRegex = /@uttt\.edu\.mx$/;
            if(correoRegex.test(correo))
                this.CorreoValido = true; 

            return correoRegex.test(correo);
        },

        limpiarFormulario(){
            this.nombreUsuario = '';
            this.correo = '';
            this.contrasenia = '';
            this.confirmarContrasenia = '';
            this.fechaNacimiento = '';
            this.matricula = '';
            this.grupo = '';
            this.universidad = '';
            this.telefono = '';
            this.estatus = '';
            this.credencial = null;
            this.credencialPreview = null;
            this.mostrarSegundoFormulario = false;
        },

        goToLogin(){
            this.$router.push('/login')
        }
    }
}
</script>
  
<style scoped>

ion-card {
    margin: 10px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.cardForm1 {
    max-width: 500px;
    margin: 0 auto;
}
ion-card-header {
    text-align: center;
}
ion-item {
    --border-width: 0;
    /* Elimina el borde */
    --inner-border-width: 0;
    /* Elimina el borde interno */
}
.login-image {
    display: block;
    margin: 0 auto;
    max-width: 150px;
    height: 100px;
    /* border-radius: 100px; */
}
.colImage{
    text-align: center;
}
.image-upload {
  margin: 0 auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  color: #4FB783;
}
.image-upload ion-input {
  display: none;
}
.image-upload ion-icon {
  font-size: 36px;
  margin-bottom: 8px;
}
.botonesRegistro {
    display: flex;
    justify-content: center;
    align-content: center;
}
ion-img {
    margin: 0 auto;
    width: 300px;
    height: 200px;
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
  