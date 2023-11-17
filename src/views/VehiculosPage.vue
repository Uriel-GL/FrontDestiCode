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
                            <ion-input v-model="imagen" type="file" @change="handleFileChange" class="custom-file-input"
                                required />
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-img :src="imagenPreview" v-if="imagenPreview"></ion-img>
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
            id_Unidad: '',
            id_Usuario: '724083E0-46F6-4B7D-8488-C83AA7219F1E',
            color: '',
            placa: '',
            modelo: '',
            imagen: null,
            imagenPreview: null,
        };
    },
    methods: {
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
                const imagenBase64 = await this.getBase64Image();

                function generateGuid() {
                    let d = Date.now();
                    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
                        d += performance.now(); // Agregar tiempo de alta resolución si está disponible
                    }
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        const r = (d + Math.random() * 16) % 16 | 0;
                        d = Math.floor(d / 16);
                        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                    });
                };

                const nuevoVehiculo = {
                    id_Unidad: generateGuid(), //this.id_Unidad,
                    id_Usuario: this.id_Usuario,
                    color: this.color,
                    placa: this.placa,
                    imagen: imagenBase64,
                    modelo: this.modelo
                };

                const response = await fetch("https://localhost:7038/api/Vehiculos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevoVehiculo),
                });

                if (!response.ok) {
                    alert("No se pudo registrar el vehiculo")
                    return;
                } else {
                    alert("Registro Exitoso")
                    // Después de un registro exitoso, restablece los valores a vacío
                    this.color = '';
                    this.placa = '';
                    this.modelo = '';
                    this.imagen = null;
                    this.imagenPreview = null;
                }
                //alert("Correcto");
            }
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

                    // Convertir a cadena Base64
                    const base64 = this.getBase64StringFromDataURL(dataURL);
                    resolve(base64);
                };
            });
        },
        getBase64StringFromDataURL(dataURL) {
            return dataURL.replace('data:', '').replace(/^.+,/, '');
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