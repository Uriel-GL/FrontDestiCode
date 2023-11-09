<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Registro de Vehículo</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-card class="ion-card-small">
                <ion-card-content>
                    <ion-list>
                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Color</ion-label>
                            <ion-input aria-label="Color" v-model="color" type="text" required
                                class="custom-input custom-input-border-color-1"></ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Placa</ion-label>
                            <ion-input aria-label="Placa" v-model="placa" type="text" required
                                class="custom-input custom-input-border-color-2"></ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Modelo</ion-label>
                            <ion-input aria-label="Modelo" v-model="modelo" type="text" required
                                class="custom-input custom-input-border-color-3"></ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Imagen del Vehículo</ion-label>
                            <ion-input v-model="vehiculoImagen" type="file" @change="handleFileChange" accept="image/*"
                                class="custom-file-input" required />
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-img :src="vehiculoImagenPreview" v-if="vehiculoImagenPreview"></ion-img>
                        </ion-item>

                        <ion-button expand="full" @click="submitForm" class="custom-button">Registrar Vehículo</ion-button>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
  
  
<script>
import {
    IonInput,
    IonText,
    IonCard,
    IonCardContent,
    IonButton,
    IonImg,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonLabel, IonItem, IonList, IonContent, IonPage
} from '@ionic/vue';

export default {
    components: {
        IonInput,
        IonText,
        IonCard,
        IonCardContent,
        IonButton,
        IonImg,
        IonTitle,
        IonToolbar,
        IonHeader,
        IonLabel, IonItem, IonList, IonContent, IonPage
    },
    data() {
        return {
            idUnidad: '',
            idUsuario: '',
            color: '',
            placa: '',
            modelo: '',
            vehiculoImagen: null,
            vehiculoImagenPreview: null,
        };
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.vehiculoImagen = file;
                this.vehiculoImagenPreview = URL.createObjectURL(file);
            }
        },
        submitForm() {
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

            if (!this.vehiculoImagen) {
                errorMessage += "Por favor, seleccione una imagen del vehículo.\n";
            }

            if (errorMessage) {
                // Muestra el mensaje de error
                alert("Error: \n" + errorMessage);
            } else {
                // Aquí puedes enviar los datos del formulario, incluyendo la imagen del vehículo, a tu servidor o realizar otras acciones necesarias.
                alert("Correcto");
            }

            // Aquí puedes enviar los datos del formulario, incluyendo la imagen del vehículo, a tu servidor o realizar otras acciones necesarias.
        },
    },
};
</script>
  
<style scoped>
.ion-card-small {
    max-width: 700px;
    margin: 0 auto;
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

ion-item.rounded-item {
    border-radius: 10px;
    margin-bottom: 10px;
}

ion-label.custom-label {
    width: 40%;
    text-align: right;
    margin-right: 20px;
}

ion-input.custom-input {
    width: 60%;
    border-radius: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 2px solid #ccc;
}

.custom-button {
    border-radius: 10px;
    --color: #F5FCCD;
    --background: #034561;
    font-size: 14px;
    /* Ajusta el tamaño de fuente según tus preferencias */
    padding: 8px 16px;
    /* Ajusta el relleno (padding) según tus preferencias */
}

.custom-input-border-color-1 {
    border: 2px solid #F5FCCD;
}

.custom-input-border-color-2 {
    border: 2px solid #4FB783;
}

.custom-input-border-color-3 {
    border: 2px solid #409D9B;
}

.custom-input-border-color-4 {
    border: 2px solid #034561;
}
</style>
    
  