<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Crear Ruta</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card class="ion-card-small">
                <ion-card-content>
                    <ion-list>
                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Lugar de Origen</ion-label>
                            <ion-select label="Lugar de Origen" label-placement="fixed" v-model="lugarSalida">
                                <ion-select-option value="Origen1">Origen 1</ion-select-option>
                                <ion-select-option value="Origen2">Origen 2</ion-select-option>
                            </ion-select>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Lugar de Destino</ion-label>
                            <ion-select label="Lugar de Destino" label-placement="fixed" v-model="lugarDestino">
                                <ion-select-option value="Destino1">Destino 1</ion-select-option>
                                <ion-select-option value="Destino2">Destino 2</ion-select-option>
                            </ion-select>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Número de Pasajeros</ion-label>
                            <ion-button fill="solid" color="primary" @click="decrementPasajeros">
                                <ion-icon name="remove-circle-outline" size="large"></ion-icon>
                            </ion-button>
                            <ion-input type="number" v-model="luagresDisponibles" min="0" max="99" step="1"
                                class="custom-input custom-input-border-color-1"></ion-input>
                            <ion-button fill="solid" color="primary" @click="incrementPasajeros">
                                <ion-icon name="add-circle-outline" size="large"></ion-icon>
                            </ion-button>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Fecha y Hora de Salida</ion-label>
                            <ion-datetime-button datetime="datetime" v-model="fechaSalida"
                                class="custom-button"></ion-datetime-button>
                            <ion-modal :keep-contents-mounted="true">
                                <ion-datetime id="datetime"></ion-datetime>
                            </ion-modal>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Costo</ion-label>
                            <ion-input type="number" v-model="costo" min="0" step="0.01"
                                class="custom-input custom-input-border-color-2"></ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Selecciona la Unidad</ion-label>
                            <ion-label class="custom-label">Selecciona la Unidad</ion-label>
                            <ion-select label="Selecciona la Unidad" label-placement="fixed" v-model="idUnidad">
                                <ion-select-option v-for="unidad in unidades" :key="unidad.id" :value="unidad.id">
                                    {{ unidad.nombre }}
                                </ion-select-option>
                            </ion-select>
                        </ion-item>

                        <ion-button expand="full" @click="crearRuta" class="custom-button">Crear Ruta</ion-button>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
  
<script>
import { IonDatetime, IonDatetimeButton, IonModal, IonInput, IonCard, IonCardContent, IonButton, IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonLabel, IonContent, IonPage, IonSelect, IonSelectOption } from '@ionic/vue';
import { ref } from 'vue';

export default {
    components: { IonDatetime, IonDatetimeButton, IonModal, IonInput, IonCard, IonCardContent, IonButton, IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonLabel, IonContent, IonPage, IonSelect, IonSelectOption },
    name: 'RegistroRutas',
    data() {
        return {
            lugarSalida: '',
            lugarDestino: '',
            luagresDisponibles: 0,
            fechaSalida: '',
            costo: 0,
            idUsuario: '',
            idUnidad: '',
            estatus: '',
            unidades: [],

        };
    },
    onMounted() {
        this.cargarUnidades(); // Llama a la función para cargar las unidades
    },
    methods: {
        decrementPasajeros() {
            if (this.luagresDisponibles > 0) {
                this.luagresDisponibles--;
            }
        },
        incrementPasajeros() {
            this.luagresDisponibles++;
        },
        async cargarUnidades() {
            // Aquí debes realizar una petición HTTP para obtener las unidades de la API
            try {
                const response = await fetch("URL_DE_TU_API/unidades");
                if (response.ok) {
                    // Si la respuesta es exitosa, convierte los datos JSON
                    const data = await response.json();
                    this.unidades = data; // Almacena las unidades en la variable "unidades"
                } else {
                    console.log("Error al obtener las unidades");
                }
            } catch (error) {
                console.log("Error de red:", error);
            }
        },
        crearRuta() {
            let errorMessage = "";

            if (!this.lugarSalida) {
                errorMessage += "Por favor, selecciona el lugar de salida.\n";
            }

            if (!this.lugarDestino) {
                errorMessage += "Por favor, ingresa el lugar de destino.\n";
            }

            if (!this.luagresDisponibles) {
                errorMessage += "Por favor, ingresa el numro de lugares. \n"
            }

            if (!this.fechaSalida) {
                errorMessage += "Por favor, ingrese la hora y fecha de salida. \n"
            }

            if (!this.costo) {
                errorMessage += "Por favor, ingrese el costo por pasaje."
            }

            if (errorMessage) {
                // Muestra el mensaje de error

                alert("Error: \n" + errorMessage);
            } else {
                alert("Correcto")
            }
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

ion-input.custom-input-border-color-1 {
    border: 2px solid #F5FCCD;
}

ion-input.custom-input-border-color-2 {
    border: 2px solid #4FB783;
}

.custom-button {
    border-radius: 10px;
    --color: #F5FCCD;
    --background: #034561;
    font-size: 14px;
    padding: 8px 16px;
}

ion-item {
    --border-width: 0;
    /* Elimina el borde */
    --inner-border-width: 0;
    /* Elimina el borde interno */
}

ion-icon {
    color: black;
}
</style>
  