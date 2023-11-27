<template>
  <ion-page>
    <app-bar-custom title="DestiCode"></app-bar-custom>

    <!-- <img class="imgLogo"
    src="https://images.pexels.com/photos/56832/road-asphalt-space-sky-56832.jpeg" /> -->

    <ion-content class="ion-padding">
      <!-- Refresher -->
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="bodyHome">
        <!-- Card de Filtros de Rutas -->
        <ion-card class="cardFilter" :disabled="isRefresher">
          <ion-card-title>¿A dónde quieres ir?</ion-card-title>
          <ion-card-subtitle>Ingresa tu destino</ion-card-subtitle>
          <ion-card-content>
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-input label="Origen" label-placement="floating" fill="outline"
                    v-model="OrigenValue" @input="listarOrigenes" :clear-input="true"
                    color="success">
                  </ion-input>
                  <ion-list v-if="showOrigenes">
                    <ion-item button="true" v-for="lugar in filtrarOrigenes" :key="lugar" @mousedown="selectOption(lugar)">
                      {{ lugar }}
                    </ion-item>
                  </ion-list>
                </ion-col>

                <ion-col>
                  <ion-input label="Destino" label-placement="floating" fill="outline"
                    v-model="DestinoValue" required color="success" @input="listarDestinos"
                    :clear-input="true">
                  </ion-input>
                  <ion-list v-if="showDestinos">
                    <ion-item button="true" v-for="destino in filtrarDestinos" :key="destino" @click="selectDestino(destino)">
                      {{ destino }}
                    </ion-item>
                  </ion-list>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="6">
                  <ion-select v-model="LugaresValue" interface="popover" placeholder="Lugares..." fill="outline" color="success">
                    <ion-select-option value="1">1 Lugar</ion-select-option>
                    <ion-select-option value="2">2 Lugares</ion-select-option>
                    <ion-select-option value="3">3 Lugares</ion-select-option>
                    <ion-select-option value="4">4 Lugares</ion-select-option>
                    <ion-select-option value="5">5 Lugares</ion-select-option>
                  </ion-select>
                </ion-col>

                <ion-col class="colBtnBuscar" size="6">
                  <ion-button @click="buscarRutas" color="tertiary" class="btnBuscar" shape="round">
                    <ion-icon :icon="searchOutline" slot="start"></ion-icon>
                    Buscar
                  </ion-button>
                </ion-col>
            </ion-row>

            </ion-grid>
          </ion-card-content>
        </ion-card>

        <br>
        <!-- Mensaje en caso no haber rutas filtradas -->
        <ion-card class="cardMessage" v-if="showMessage">
          <ion-card-content>
            <div class="bodyRutasExis ion-text-center">
              <ion-icon :icon="navigateOutline"></ion-icon>
                <h2>Actualmente no hay rutas para tus datos de busqueda</h2> 
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Iteracion de cards para rutas -->
        <div class="cards">
          <ion-grid>
            <ion-row>
              <ion-col size="12" v-for="ruta in rutasFiltradas" :key="ruta.id_Ruta">
                <ion-card class="cardViaje">
                  <ion-card-content>
                    <ion-row>
                      <ion-col size="10">
                        <h2 class="textCard">
                          <ion-icon :icon="arrowDown"></ion-icon>
                          <ion-icon :icon="ellipse" color="success"></ion-icon>
                          {{ ruta.lugar_Salida }}
                        </h2>
                        <h2 class="textCard">
                          <ion-icon :icon="ellipse" color="success"></ion-icon>
                          {{ ruta.lugar_Destino }}
                        </h2>
                      </ion-col>
                      <ion-col size="2">
                        <h4 class="costo"><b>${{ ruta.costo }}</b></h4>
                      </ion-col>
                    </ion-row>
                    <h4 v-if="ruta.lugares_Disponibles <= 0 && ruta.estatus == false" class="salida">
                      <b>Viaje Lleno</b>
                    </h4>
                    <h3 class="salida">
                      Lugares Disponibles: 
                      <ion-text color="success"><b>{{ ruta.lugares_Disponibles }}</b></ion-text>
                    </h3>
                    <h3 class="salida">
                      Salida: 
                      <ion-text color="primary"><br><b>{{ formatoFecha(ruta.fecha_Salida) }}</b></ion-text> 
                    </h3>
                    
                  </ion-card-content>
                  <ion-button @click="IrADetalle(ruta.id_Ruta)" expand="full" color="success" :disabled="ruta.estatus == false" class="btnViaje">Ver Viaje</ion-button>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>

      </div>
      
    </ion-content>

  </ion-page>
</template>

<script>
  //Componentes
  import AppBarCustom from '../components/NavBarCustom.vue'
  //Ionic
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage,IonItem, IonSelect, IonSelectOption, IonText } from '@ionic/vue'
  import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue'
  import { IonRow, IonCol, IonButton, IonIcon, IonInput, IonGrid, IonLabel,IonItemDivider, IonList  } from '@ionic/vue'
  import { IonAvatar, IonChip, IonRefresher, IonRefresherContent } from '@ionic/vue'
  //Iconos
  import { ellipse, arrowDown, arrowUp, navigateOutline, searchOutline } from 'ionicons/icons'
  //Servicios
  import RutaService from '../Services/RutaService'
  import moment from 'moment'

export default {
  components: {
    AppBarCustom,
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonRow, IonCol, IonSelect, IonSelectOption, IonText, IonItem, IonButton,
    IonIcon,IonInput,IonGrid,IonLabel,IonItemDivider, IonList, IonAvatar,IonChip,
    IonRefresher, IonRefresherContent
  },

  data: () => ({
    //#region icons
    ellipse,
    arrowDown,
    arrowUp,
    navigateOutline,
    searchOutline,
    //#endregion

    OrigenValue: '',
    DestinoValue: '',
    LugaresValue: 0,
    destinos: [],
    origenes: [],
    showOrigenes: false,
    showDestinos: false,
    showMessage: false,
    isRefresher: false,

    rutasItems: [],
    rutasFiltradas: []
  }),

  async created() {
    await this.cargarDatos()
  },

  computed: {
    filtrarOrigenes() {
      return this.origenes.filter(option => 
        option.toLowerCase().includes(this.OrigenValue.toLocaleLowerCase())
      );
    },

    filtrarDestinos() {
      return this.destinos.filter(option => 
        option.toLowerCase().includes(this.DestinoValue.toLocaleLowerCase())
      )
    },

    filtarRutas() {
      return this.rutasFiltradas = this.rutasItems.filter(rutaAprox => 
        rutaAprox.lugar_Salida === this.OrigenValue && ruta.lugar_Destino === this.DestinoValue
      )
    }
  },

  methods: {
    async cargarDatos(){
      var SessionValid = this.$cookies.isKey('AccessToken') && this.$cookies.isKey('Usuario')
      if(SessionValid){
        this.OrigenValue = ""
        this.LugaresValue = ""
        const response = await RutaService.getAllRutas()
        this.rutasItems = JSON.parse(JSON.stringify(response.data));
    
        const origenSet = new Set(this.rutasItems.map((ruta) => ruta.lugar_Salida))
        const destinoSet = new Set(this.rutasItems.map((ruta) => ruta.lugar_Destino))
    
        this.origenes = Array.from(origenSet);
        this.destinos = Array.from(destinoSet);

      }else{
        this.$router.push('/login')
      }
    },

    formatoFecha(date){
      const fechaFormateada = moment(date).format('DD [de] MMMM YYYY, h:mm A');
      return fechaFormateada;
    },

    buscarRutas() {
      if( this.OrigenValue != "" && this.DestinoValue != ""){
        this.rutasFiltradas = this.rutasItems.filter(rutaAprox => 
          rutaAprox.lugar_Salida.includes(this.OrigenValue.trim()) && 
          rutaAprox.lugar_Destino.includes(this.DestinoValue.trim()) && 
          rutaAprox.lugares_Disponibles >= this.LugaresValue
        )
        if(this.rutasFiltradas.length > 0){
          this.showMessage = false;
        }else{
          this.showMessage = true;
        }
      }else{
        console.log("Valores no validos")
      }
    },

    listarOrigenes(){
      if(!this.showOrigenes && this.OrigenValue.length >= 1){
        this.showOrigenes = true
      }
    },

    listarDestinos(){
      if(!this.showDestinos && this.DestinoValue.length >= 1){
        this.showDestinos = true
      }
    },

    selectOption(option) {
      this.OrigenValue = option;
      this.showOrigenes = false;
    },

    selectDestino(option){
      this.DestinoValue = option;
      this.showDestinos = false;
    },

    IrADetalle(Id_Ruta){
      this.$router.push(`detalle-ruta/${Id_Ruta}`)
    },

    async handleRefresh(event){
      this.isRefresher = true;
      await this.cargarDatos()

      setTimeout(() => {
        this.OrigenValue = '';
        this.DestinoValue = '';
        this.isRefresher = false;
        this.$router.go();
        event.target.complete();
      }, 3000);

    }
  }
}
</script>

<style scoped>
.imgLogo {
  max-width: 100%;
  max-height: 400px;
}
.bodyHome {
  padding: 10px;
}
.cardMessage {
  margin: 0 auto;
  max-width: 450px;
}
.bodyRutasExis ion-icon {
  font-size: 46px;
}
.cardFilter {
  max-width: 450px;
  margin: 0 auto;
}

.cardViaje {
  max-width: 450px;
  border-radius: 13px;
  padding: 0px;
  margin: 0 auto;
}

.cards {
  margin: 0 auto;
}

.cards ion-grid {
  padding: 0;
}

.cards ion-grid ion-row ion-col {
  padding: 0;
}

ion-card-title {
  text-align: center;
  margin-top: 18px;
}

ion-card-subtitle{
  text-align: center;
}

.title {
  text-align: center;
}

.btnViaje {
  margin: 0;
  width: 100%;
}

.salida {
  text-align: center;
  font-size: 15px;
}

.costo {
  margin-left: 5px;
  font-size: 15px;
}

.colBtnBuscar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btnBuscar {
  width: 100%;
}

.textCard {
  font-weight: bold;
}
</style>