<template>
  <ion-page>
    <app-bar-custom title="DestiCode"></app-bar-custom>

    <ion-content>
      <div class="bodyHome">
        <!-- <center>
          <img class="imgLogo"
          src="https://firebasestorage.googleapis.com/v0/b/tiendaservicios-b7281.appspot.com/o/Imagenes%2FDestiCodeLogo.jpg?alt=media&token=900234a0-575d-4ccb-a434-584bce3937d8" />
        </center> -->
        <!-- Card de Filtros de Rutas -->
        <ion-card class="cardFilter">
          <ion-card-title>¿A dónde quieres ir?</ion-card-title>
          <ion-card-subtitle>Ingresa tu destino</ion-card-subtitle>
          <ion-card-content>
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-input label="Origen" label-placement="floating" fill="outline"
                    v-model="OrigenValue" @input="listarOrigenes"
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
                    v-model="DestinoValue" required color="success" @input="listarDestinos">
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
                  <ion-button @click="buscarRutas" class="btnBuscar" shape="round">Buscar</ion-button>
                </ion-col>
            </ion-row>

            </ion-grid>
          </ion-card-content>
        </ion-card>

        <br>
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
                      Lugares: 
                      <ion-text color="success"><b>{{ ruta.lugares_Disponibles }}</b></ion-text>
                    </h3>
                    <h3 class="salida">
                      Salida: 
                      <ion-text color="primary"><b>{{ ruta.fecha_Salida }}</b></ion-text> 
                    </h3>
                    
                  </ion-card-content>
                  <ion-button @click="IrADetalle(ruta.id_Ruta)" color="success" :disabled="ruta.estatus == false" class="btnViaje">Ver Viaje</ion-button>
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
  import { IonAvatar, IonChip } from '@ionic/vue'
  //Iconos
  import { ellipse, arrowDown, arrowUp } from 'ionicons/icons'
  //Servicios
  import RutaService from '../Services/RutaService'

export default {
  components: {
    AppBarCustom,
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonRow, IonCol, IonSelect, IonSelectOption, IonText, IonItem, IonButton,
    IonIcon,IonInput,IonGrid,IonLabel,IonItemDivider, IonList, IonAvatar,IonChip
  },

  data: () => ({
    //#region icons
    ellipse,
    arrowDown,
    arrowUp,
    //#endregion

    OrigenValue: '',
    DestinoValue: '',
    LugaresValue: 0,
    destinos: [],
    origenes: [],
    showOrigenes: false,
    showDestinos: false,
    showMessage: false,

    rutasItems: [],
    rutasFiltradas: []
  }),

  async created() {
    var acess = this.$cookies.isKey('AccessToken') && this.$cookies.isKey('Usuario')

    if(acess){
      this.OrigenValue = ""
      this.LugaresValue = ""
      const response = await RutaService.getAllRutas()
      this.rutasItems = JSON.parse(JSON.stringify(response.data));
  
      const origenSet = new Set(this.rutasItems.map((ruta) => ruta.lugar_Salida))
      const destinoSet = new Set(this.rutasItems.map((ruta) => ruta.lugar_Destino))
  
      this.origenes = Array.from(origenSet);
      this.destinos = Array.from(destinoSet);
  
      console.log(this.rutasItems)
      console.log(this.origenes)
      console.log(this.destinos)

    }else{
      this.$router.push('/login')
    }
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
    buscarRutas() {
      if( this.OrigenValue != "" && this.DestinoValue != ""){
        this.rutasFiltradas = this.rutasItems.filter(rutaAprox => 
          rutaAprox.lugar_Salida.includes(this.OrigenValue.trim()) && 
          rutaAprox.lugar_Destino.includes(this.DestinoValue.trim()) && 
          rutaAprox.lugares_Disponibles <= this.LugaresValue
        )
        
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
    }
  }
}
</script>

<style scoped>
.imgLogo {
  max-width: 350px;
  max-height: 120px;
}
.bodyHome {
  padding: 10px;
}

.cardFilter {
  max-width: 450px;
  margin: 0 auto;
}

.cardViaje {
  max-width: 450px;
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