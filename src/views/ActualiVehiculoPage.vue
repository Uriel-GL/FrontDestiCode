<template>
    <ion-page>
        <app-bar-custom title="Datos de tu Vehículo"></app-bar-custom>
        <loading :active="isLoading" :can-cancel="false" :is-full-page="fullPage" />

        <ion-content class="ion-padding">
            <!-- Card para actualizar la info del vehiculo -->
            <ion-card class="cardVehiculo">
                <ion-card-header>
                    <ion-card-title>Actualiza tu Vehículo</ion-card-title>
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
                                    Cambia la imagen de referencia, en caso de ser necesario.
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
                        <ion-button fill="clear" color="danger" shape="round" @click="backPerfil">
                            Regresar
                        </ion-button>
                        <ion-button shape="round" @click="actualizarDatos" >
                            Actualizar
                        </ion-button>
                    </div>
                </ion-card-content>
            </ion-card>
        </ion-content>

        <!-- Modal de confirmación de actualización de tu vehiculo -->
        <ion-modal ref="modal" :is-open="showModalConfirm">
            <div class="bodyModal">
                <h2>Actualización Exitosa</h2>
                <ion-icon :icon="checkmarkOutline" color="success"></ion-icon>
                <h3>Los datos de tu vehículo fueron actualizados.</h3>
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

        <!-- Modal de error de actualización de tu vehiculo -->
        <ion-modal ref="modal" :is-open="showModalError">
            <div class="bodyModal">
                <h2>Error al actualizar</h2>
                <ion-icon :icon="closeOutline" color="success"></ion-icon>
                <h3>No pudimos actualizar tu vehículo, intenta más tarde.</h3>
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

        <!-- Modal de error de tus datos FORMULARIO -->
        <ion-modal ref="modal" :is-open="showModalErrorForm">
            <div class="bodyModal">
                <h2>Adevertencia</h2>
                <ion-icon :icon="alertCircleOutline" color="warning" style="font-size: 46px;"></ion-icon>
                <h3>Los datos ingresados no son válidos. <b>Verificalos</b></h3>
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
    IonLabel, IonItem, IonList, IonContent, IonPage, IonGrid, IonRow, IonCol, IonModal
} from '@ionic/vue';
//Iconos
import { cloudUploadOutline, checkmarkOutline, closeOutline, alertCircleOutline } from 'ionicons/icons'
//Servicios 
import VehiculoService from '../Services/VehiculoService'
export default {
    components: {
        AppBarCustom,Loading,
        IonInput, IonText, IonCard, IonCardContent, IonButton, IonImg, IonTitle, IonToolbar, IonHeader,
        IonLabel, IonItem, IonList, IonContent, IonPage, IonGrid, IonRow, IonCol, IonModal
    },

    data: () => ({
        //Iconos
        cloudUploadOutline,
        checkmarkOutline,
        closeOutline,
        alertCircleOutline,

        fullPage: true,
        isLoading: false,
        showModalConfirm: false,
        showModalError: false,
        showModalErrorForm: false,
        isErrorDefault: false,

        id_Unidad: '',
        id_Usuario: '',
        color: '',
        placa: '',
        modelo: '',
        imagen: null,
        imagenPreview: null,
    }),

    async created() {
        await this.cargarDatos()
    },

    methods: {
        async cargarDatos(){
            var Id_Unidad = this.$route.params.id
            const response = await VehiculoService.getVehiculoById(Id_Unidad)
            this.id_Unidad = Id_Unidad;
            this.id_Usuario = this.$cookies.get('Usuario')
            this.color = response.data.color;
            this.placa = response.data.placa;
            this.modelo = response.data.modelo;
            this.imagen = response.data.imagen;
            this.imagenPreview = response.data.imagen;
            console.log(response)
        },
        validarFormulario(){
            let errorMessage = "";

            if(!this.color || this.color.length <= 2) errorMessage += "Ingresa un color válido."

            if(!this.placa || this.placa.length <= 2) errorMessage += "El número de placa es inválido."

            if(!this.modelo || this.modelo.length <= 2) errorMessage += "El modelo es requerido"

            if(!this.imagen) errorMessage += "Se requiere una imagen"

            if(errorMessage == "") return true;

            return false;
        },
        async actualizarDatos(){
            try{
                this.isErrorDefault = false;
                this.isLoading = true;
                if(this.validarFormulario()){
                    const imagenBase64 = await this.getBase64Image();

                    const vehiculoActualizado = {
                        Id_Unidad: this.id_Unidad,
                        Id_Usuario: this.$cookies.get('Usuario'),
                        Color: this.color,
                        Placa: this.placa,
                        Imagen: imagenBase64,
                        Modelo: this.modelo
                    };

                    const response = await VehiculoService.updateVehiculo(vehiculoActualizado)
                    setTimeout(() => {
                        if(response.status == 201 || response.status == 200){
                            this.isLoading = false; 
                            this.showModalConfirm = true;
                        }else{
                            this.isLoading = false; 
                            this.showModalError = true;
                        }
                        
                    }, 3000);
                }else{
                    this.isLoading = false; 
                    this.showModalErrorForm = true;
                }
            }
            catch(error){
                this.isLoading = false;
                this.isErrorDefault = true;
            }
            
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
        backPerfil(){
            this.$router.push('/perfil')
        }
    }
}
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