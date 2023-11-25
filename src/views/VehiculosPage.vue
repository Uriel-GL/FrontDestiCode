<template>
    <ion-page>
        <app-bar-custom title="Vehículo"></app-bar-custom>
        <loading :active="isLoading" :can-cancel="false" :is-full-page="true" />

        <ion-content class="ion-padding">
            <ion-card class="cardVehiculo">
                <ion-card-header>
                    <ion-card-title>Registra tu Vehículo</ion-card-title>
                    <ion-card-subtitle>Ingresa toda la información</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <ion-grid class="gridCard">
                        <ion-row>

                            <ion-col size="10">
                                <ion-input label="Modelo" label-placement="floating" 
                                placeholder="Ingresa el modelo de tu Auto" v-model="modelo"
                                fill="outline" color="success" :clear-input="true"
                                />
                            </ion-col>

                            <ion-col size="10">
                                <ion-input label="Color" label-placement="floating" 
                                placeholder="Ingresa el color de tu Auto" v-model="color"
                                fill="outline" color="success" :clear-input="true"
                                />
                            </ion-col>

                            <ion-col size="10">
                                <ion-input label="Núm.Placa" label-placement="floating" 
                                placeholder="Ingresa el número de placa de tu Auto" v-model="placa"
                                fill="outline" color="success" :clear-input="true"
                                />
                            </ion-col>
                        </ion-row>
                        <br>
                        <ion-row>
                            <ion-col class="colImage">
                                <ion-card-title>Fotografía de Referencia</ion-card-title>
                                <ion-card-subtitle>
                                    Agrega una imagen de referencia, para mayor facilidad de ubicar tu Vehículo a los demás.
                                </ion-card-subtitle>
                            </ion-col>
                        </ion-row>
                        
                        <ion-row>
                            <ion-col>
                                <ion-item>
                                    <label class="image-upload">
                                        <ion-input aria-label="Imagen" 
                                        v-model="imagen" 
                                        type="file" 
                                        @change="handleFileChange" 
                                        class="custom-file-input"
                                        required />
                                        <ion-icon :icon="cloudUploadOutline"></ion-icon>
                                        Subir Imagen
                                    </label>
                                </ion-item>
                            </ion-col>
                        </ion-row>
                    </ion-grid>

                    <ion-img :src="imagenPreview" v-if="imagenPreview"></ion-img>

                    <div class="botones">
                        <ion-button fill="clear" color="danger" shape="round" @click="backPublicaciones">
                            Cancelar
                        </ion-button>
                        <ion-button shape="round" @click="submitForm" >
                            Registrar
                        </ion-button>
                    </div>
                </ion-card-content>
            </ion-card>

        </ion-content>

        <!-- Modal de confirmación de registro de tu ruta -->
        <ion-modal ref="modal" :is-open="showModalConfirm">
        <div class="bodyModal">
            <h2>Registro Exitoso</h2>
            <ion-icon :icon="checkmarkOutline" color="success"></ion-icon>
            <h3>Tu vehículo ahora se encuentra publicado.</h3>
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

        <!-- Modal de alerta de registro de tu vehiculo -->
        <ion-modal ref="modal" :is-open="ShowAlertLimite">
        <div class="bodyModal">
            <h2>Advertencia</h2>
            <ion-icon :icon="alertOutline" color="warning"></ion-icon>
            <h3>Solo puedes publicar 2 vehículos y actualmente excedes el límite, borra una para continuar.</h3>
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

        <!-- Totas de error en la api invalidas -->
        <ion-toast 
        position="top" 
        position-anchor="header" 
        message="Ocurrio un error intenta más tarde."
        :is-open="isErrorVehiculo"
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
    IonInput, IonText, IonCard, IonCardContent, IonButton, IonImg, IonTitle, IonToolbar, IonHeader,
    IonLabel, IonItem, IonList, IonContent, IonPage, IonGrid, IonRow, IonCol, IonToast
} from '@ionic/vue';
//Iconos
import { 
    cloudUploadOutline, wifiOutline, alertOutline, checkmarkOutline 
} from 'ionicons/icons'
//Servicios 
import VehiculoService from '@/Services/VehiculoService';
export default {
    components: {
        AppBarCustom,Loading,
        IonInput, IonText, IonCard, IonCardContent, IonButton, IonImg, IonTitle, IonToolbar,
        IonHeader, IonLabel, IonItem, IonList, IonContent, IonPage, IonGrid, IonRow, IonCol,
        IonToast  
    },
    data: () => ({
        //Iconos
        cloudUploadOutline,
        wifiOutline,
        alertOutline,
        checkmarkOutline,

        id_Unidad: '',
        id_Usuario: '',
        color: '',
        placa: '',
        modelo: '',
        imagen: null,
        imagenPreview: null,

        isLoading: false,
        isErrorVehiculo: false,
        ShowAlertLimite: false,
        showModalConfirm: false,
    }),

    async created() {
        await this.cargarDatos();
    },

    methods: {
        async cargarDatos(){
            var SessionValid = this.$cookies.isKey('AccessToken') && this.$cookies.isKey('Usuario');
            if(!SessionValid) this.$router.push('/login')
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.type.startsWith('image/')) {
                    this.imagen = file;
                    const img = new Image();
                    img.src = URL.createObjectURL(file);
                    img.onload = () => {
                        this.imagenPreview = img.src;
                    };
                } else {
                    alert("El archivo seleccionado no es una imagen válida.");
                    this.imagen = null;
                }
            }
        },
        async submitForm() {
            let errorMessage = "";

            if (!this.color) {
                errorMessage += "Por favor, ingrese el color del vehículo.\n";
            }

            if (!this.placa) {
                errorMessage += "Por favor, ingrese la placa del vehículo.\n";
            }

            if (!this.modelo) {
                errorMessage += "Por favor, ingrese el modelo del vehículo.\n";
            }

            if (!this.imagen) {
                errorMessage += "Por favor, seleccione una imagen del vehículo.\n";
            }

            if (errorMessage) {
                // Muestra el mensaje de error
                alert("Error: \n" + errorMessage);
            } else {
                try{
                    this.isLoading = true;
                    this.isErrorVehiculo = false;
                    const imagenBase64 = await this.getBase64Image();

                    const nuevoVehiculo = {
                        Id_Unidad: this.generateGuid(),
                        Id_Usuario: this.$cookies.get('Usuario'),
                        Color: this.color,
                        Placa: this.placa,
                        Imagen: imagenBase64,
                        Modelo: this.modelo
                    };

                    const limiteCarro = await VehiculoService.getVehiculosByUsuario(this.$cookies.get('Usuario'))
                    var data = JSON.parse(JSON.stringify(limiteCarro.data));
                    if(data.length == 1){
                        this.isLoading = false;
                        this.ShowAlertLimite = true;
                        return;
                    }

                    const response = await VehiculoService.registerVehiculo(nuevoVehiculo)

                    setTimeout(() => {
                        if(response.status == 201 || response.status == 200){
                            this.isLoading = false;
                            this.showModalConfirm = true;
                            this.limpiarFormulario()
                        }
                    }, 3000);
                    
                }catch(error){
                    this.isLoading = false;
                    this.isErrorVehiculo = true;
                }
            }
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

        limpiarFormulario() {
            // Después de un registro exitoso, restablece los valores a vacío
            this.color = '';
            this.placa = '';
            this.modelo = '';
            this.imagen = null;
            this.imagenPreview = null;
        },

        async getBase64Image() {
            return new Promise((resolve) => {
                const image = new Image();
                image.src = this.imagenPreview;
                image.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    // Establecer el tamaño del canvas igual al tamaño de la imagen
                    canvas.width = image.width;
                    canvas.height = image.height;

                    // Dibujar la imagen en el canvas
                    ctx.drawImage(image, 0, 0);

                    // Obtener el base64 del canvas
                    const dataURL = canvas.toDataURL("image/png"); // Puedes cambiar "image/png" según el formato deseado

                    //console.log(dataURL);
                    resolve(dataURL);
                };
            });
        },

        backPublicaciones(){
            this.$router.push('/publicaciones')
        }
    },
};
</script>
  
<style scoped>
ion-card-header {
    text-align: center;
}
ion-img {
    margin-left: -10px;
    width: 300px;
    height: 200px;
}
.colImage{
    text-align: center;
}
.cardVehiculo {
    margin: 0 auto;
    max-width: 700px;
}
.gridCard ion-row {
    justify-content: center;
}
.btnUpload {
    border: 2px dashed #ccc;
    border-radius: 5px;
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

ion-card {
    margin: 10px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

ion-button {
    margin-top: 10px;
}

ion-item {
    --border-width: 0;
    /* Elimina el borde */
    --inner-border-width: 0;
    /* Elimina el borde interno */
}

.botones {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
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
    
  