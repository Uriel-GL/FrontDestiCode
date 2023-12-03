<template>
    <ion-page>
        <app-bar-custom title="Detalle de la Ruta"></app-bar-custom>
        <loading :active="isLoading" :can-cancel="false" :is-full-page="fullPage" />

        <ion-content>
            <div class="bodyDetalle">
                <ion-card class="cardDetalle">
                    <ion-card-header>
                        <ion-card-subtitle>Ruta</ion-card-subtitle>
                        <ion-card-title>{{ this.ruta.lugar_Salida }}</ion-card-title>
                        <div class="icon">
                            <ion-icon :icon="arrowDown"></ion-icon>
                        </div>
                        <ion-card-title>{{ this.ruta.lugar_Destino }}</ion-card-title>
                    </ion-card-header>

                    <h5>Vehículo de Transporte</h5>
                    <div class="imgCar">
                        <ion-img :src="this.vehiculo.imagen">
                        </ion-img>
                    </div>

                    <ion-card-content>
                        <div class="bodyContent">
                            <ion-card>
                                <ion-card-content>
                                    <ion-card-title>
                                        <ion-icon :icon="location" color="danger"></ion-icon>
                                        Fecha y Hora de Salida
                                    </ion-card-title>
                                    <ion-card-subtitle>{{ formatoFecha(ruta.fecha_Salida) }}</ion-card-subtitle>
                                    <br>
                                    <ion-card-title>Costo por Persona</ion-card-title>
                                    <ion-chip outline="true" color="success">
                                        <ion-icon :icon="cash" color="success"></ion-icon>
                                        <ion-label><b>${{ this.ruta.costo }} MXN</b></ion-label>
                                    </ion-chip>
                                </ion-card-content>
                            </ion-card>
                            
                            <br/>

                            <ion-card>
                                <ion-card-header>
                                    <ion-card-title>Datos del Vehículo</ion-card-title>
                                </ion-card-header>
                                <ion-card-content>
                                    <ion-item>
                                        <ion-icon class="iconVehiculo" :icon="carSport"></ion-icon>
                                        <ion-label>Modelo de Unidad</ion-label>
                                        <b>{{ this.vehiculo.modelo }}</b>
                                    </ion-item>
                                    <ion-item>
                                        <ion-icon class="iconVehiculo" :icon="colorPalette"></ion-icon>
                                        <ion-label>Color</ion-label>
                                        <b>{{ this.vehiculo.color }}</b>
                                    </ion-item>
                                    <ion-item>
                                        <ion-icon class="iconVehiculo" :icon="idCardOutline"></ion-icon>
                                        <ion-label>Núm Placas</ion-label>
                                        <b>{{ this.vehiculo.placa }}</b>
                                    </ion-item>
                                    <ion-item>
                                        <ion-icon class="iconVehiculo" :icon="man"></ion-icon>
                                        <ion-label>Conductor</ion-label>
                                        <b>{{ this.usuario.nombre_Usuario }}</b>
                                    </ion-item>
                                </ion-card-content>
                            </ion-card>

                            <br>
                            
                            <div class="btnApartar">
                                <ion-button @click="showModal = true" :disabled="ruta.lugares_Disponibles <= 0" id="prepareApartar" expand="full" shape="round" color="success">
                                    Apartar Lugar
                                </ion-button>
                            </div>

                        </div>
                    </ion-card-content>
                </ion-card>
            </div>

            <!-- Modal de reservación de lugares -->
            <ion-modal ref="modal" :is-open="showModal">
                <div class="bodyModal">
                    <h2>¿Cuántos lugares quieres apartar?</h2>
                    <ion-grid class="gridApartar">
                        <ion-row>
                            <ion-col>
                                <ion-button @click="reservacion.Num_Asientos--" 
                                    :disabled="reservacion.Num_Asientos <= 0" 
                                    fill="clear" 
                                    shape="round"
                                > 
                                    <ion-icon slot="icon-only" :icon="removeCircleOutline"></ion-icon>
                                </ion-button>
                            </ion-col>
                            <ion-col size="2">
                                <b>{{ reservacion.Num_Asientos }}</b>
                            </ion-col>
                            <ion-col>
                                <ion-button @click="reservacion.Num_Asientos++" 
                                :disabled="reservacion.Num_Asientos >= ruta.lugares_Disponibles"
                                fill="clear" shape="round"
                            > 
                                <ion-icon slot="icon-only" :icon="addCircleOutline"></ion-icon>
                                </ion-button>
                            </ion-col>
                            <ion-col size="12">
                                <div class="btnApartar">
                                    <ion-button @click="showModal = false" expand="full" fill="clear" shape="round">
                                        Cancelar
                                    </ion-button>
                                    <ion-button @click="apartarLugar" :disabled="reservacion.Num_Asientos <= 0" expand="full" shape="round" color="success">
                                        Apartar lugar
                                    </ion-button>
                                </div>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </div>
            </ion-modal>

            <!-- Modal de confirmación de reservación -->
            <ion-modal ref="modal" :is-open="showModalConfirm">
                <div class="bodyModal">
                    <h2>Reservación Exitosa</h2>
                    <ion-icon :icon="checkmarkOutline" color="success"></ion-icon>
                    <h3>Ya tienes un Ticket para esta Ruta</h3>
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
                    <h2>Error al reservar</h2>
                    <ion-icon :icon="closeOutline" color="success"></ion-icon>
                    <h3>No pudimos reservar tu lugar, intenta más tarde.</h3>
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
        </ion-content>
    </ion-page>
</template>

<script>
//Componentes
import AppBarCustom from '../components/NavBarCustom.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css';
//Ionic
import { 
    IonPage, IonContent, IonCard, IonCardTitle, IonCardSubtitle, IonLabel, IonItem, IonIcon,
    IonCardHeader, IonImg, IonChip, IonItemDivider, IonButton, IonModal, IonButtons, 
} from '@ionic/vue'
//Iconos
import { 
    ellipse, arrowDown, arrowUp, cash, carSport, colorPalette, man, idCardOutline, location, addCircleOutline,
    removeCircleOutline, checkmarkOutline, closeOutline, trashOutline
} from 'ionicons/icons'
//Servicios
import RutaService from '@/Services/RutaService';
import moment from 'moment';

export default {
    components: {
        AppBarCustom,Loading,
        IonPage, IonContent, IonCard, IonCardSubtitle, IonCardTitle, IonLabel, IonItem, IonIcon, IonCardHeader,
        IonImg, IonChip, IonItemDivider, IonButton, IonModal, IonButtons, 
    },

    data: () => ({
        //Iconos
        arrowDown,
        ellipse,
        arrowUp,
        cash,
        carSport,
        colorPalette,
        man,
        idCardOutline,
        location,
        addCircleOutline,
        removeCircleOutline,
        checkmarkOutline,
        closeOutline,
        trashOutline,

        //Variables de la pagina
        showModalConfirm: false,
        showModalError: false,
        showModal: false,
        isLoading: false,
        fullPage: true,

        ruta: {},
        vehiculo: {},
        usuario: {},

        reservacion: {
            Id_Reservacion: '4e8cff3f-f7dd-4abf-a64c-f06c8d749cb2',//GUID por defecto pero cambia en Back
            Id_Ruta: '',
            Id_Usuario: '',
            Num_Asientos: 0
        }
        
    }),

    created() {
        this.cargarDatos()
    },

    methods: {
        async cargarDatos(){
            var SessionValid = this.$cookies.isKey('AccessToken') && this.$cookies.isKey('Usuario')
            if(SessionValid){
                const response = await RutaService.getRutaByIdRuta(this.$route.params.id)
                this.ruta = JSON.parse(JSON.stringify(response.data))
                this.usuario = JSON.parse(JSON.stringify(response.data.usuarios))
                this.vehiculo = JSON.parse(JSON.stringify(response.data.vehiculos))
                this.showModal = false
            }else{
                this.$router.push('/login')
            }
        },

        async apartarLugar(){
            this.showModal = false
            this.isLoading = true
            this.reservacion.Id_Ruta = this.ruta.id_Ruta;
            this.reservacion.Id_Usuario = this.$cookies.get('Usuario');

            const response = await RutaService.reservarLugar(this.reservacion)
            setTimeout(() => {
                if(response.status == 201 || response.status == 200){
                    this.isLoading = false
                    this.showModalConfirm = true;
                    this.$router.push('/reservaciones');
                }else{
                    this.isLoading = false; 
                    this.showModalError = true;
                }
            }, 5000);
            console.log(this.reservacion)
        },

        formatoFecha(date){
            const fechaFormateada = moment(date).format('DD [de] MMMM YYYY, h:mm A');
            return fechaFormateada;
        },
    },
}
</script>

<style scoped>
.bodyDetalle {
    padding: 10px;
}

.cardDetalle{ 
    max-width: 450px;
    margin: 0 auto;
}

ion-card-header {
    text-align: center;
}

ion-card-header .icon {
    font-size: 24px;
    color: #2dd36f;
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

.bodyModal h2{
    text-align: center;
}

.gridApartar {
    text-align: center;
}

.gridApartar ion-row ion-col {
    display: flex;
    justify-content: center;
    align-items: center;
}

.gridApartar ion-row ion-col ion-button {
    width: auto;
}

.gridApartar ion-row ion-col ion-button ion-icon {
    font-size: 40px;
}


.imgCar {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
}

.imgCar ion-img{
    width: 250px;
    height: 180px;
}

.bodyContent {
    text-align: center;
}

ion-chip{
    font-size: 16px;
}

h5 {
    text-align: center;
}

.iconVehiculo {
    padding: 5px;
    font-size: 24px;
    /*color: #2dd36f;*/
}

ion-button {
    width: 90%;
}

.btnApartar {
    display: flex;
    justify-content: center;
    align-content: center;
}

</style>