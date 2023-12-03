<template>
  <ion-page>
    <app-bar-custom title="Registro de Usuarios"></app-bar-custom>
    <loading :active="isLoading" :can-cancel="false" :is-full-page="true" />

    <ion-content class="ion-padding">
      <ion-card class="cardForm1">
        <ion-card-header>
          <ion-card-title>Actualiza tu información</ion-card-title>
          <ion-card-subtitle
            >Completa todos los campos que deseas actualizar</ion-card-subtitle
          >
        </ion-card-header>

        <ion-card-content>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/tiendaservicios-b7281.appspot.com/o/Imagenes%2FLogo.jpg?alt=media&token=045bb3d8-886b-4b6e-af3d-1c55197c9594"
            class="login-image"
          />

          <br />
          <ion-grid>
            <ion-row>

              <ion-col size="12">
                <ion-input label="Correo Electrónico" v-model="user.correo" type="email" label-placement="floating"
                  fill="outline" color="success"></ion-input>
                <ion-text color="danger" v-if="!CorreoValido" style="text-align: center">
                  El correo no es válido
                </ion-text>
              </ion-col>

              <ion-col size="12">
                <ion-input label="Contraseña" type="text" v-model="contrasenia" label-placement="floating" fill="outline"
                  color="success"></ion-input>
                <ion-text color="danger" v-if="contrasenia && contrasenia.length < 8" style="text-align: center">
                  La contraseña debe tener mínimo 8 caracteres
                </ion-text>
              </ion-col>

              <ion-col size="12">
                <ion-input label="Confirmación de contraseña" v-model="confirmarContrasenia" type="text" label-placement="floating"
                  fill="outline" color="success"></ion-input>
                <ion-text color="danger" v-if="confirmarContrasenia && contrasenia !== confirmarContrasenia"
                  style="text-align: center">
                  Las contraseñas no coinciden.
                </ion-text>
              </ion-col>

              <ion-col size="12">
                <ion-input label="Nombre Completo" label-placement="floating" placeholder="Ingresa tu nombre Completo" fill="outline"
                  color="success" v-model="user.nombre_Completo">
                </ion-input>
                <ion-text color="danger" v-if="user.nombre_Completo && user.nombre_Completo.length < 3"
                  style="text-align: center">
                  El nombre es requerido.
                </ion-text>
              </ion-col>

              <ion-col size="12">
                <ion-input label="Telefono" label-placement="floating" placeholder="Ingresa tu número de telefono" fill="outline"
                  color="success" v-model="user.telefono">
                </ion-input>
                <ion-text color="danger" v-if="user.telefono && user.telefono.length < 10" style="text-align: center">
                  El núm. debe ser mínimo de 10 dígitos.
                </ion-text>
              </ion-col>

              <ion-col size="6">
                <ion-input label="Grupo" label-placement="floating" placeholder="Ingresa el grupo al que perteneces" fill="outline"
                  color="success" v-model="user.grupo">
                </ion-input>
                <ion-text color="danger" v-if="user.grupo && user.grupo.length < 3" style="text-align: center">
                  El grupo es requerido.
                </ion-text>
              </ion-col>

              <ion-col size="6">
                <ion-input label="Matricula" label-placement="floating" placeholder="Ingresa tu núm de Matricula" fill="outline"
                  color="success" v-model="user.matricula">
                </ion-input>
                <ion-text color="danger" v-if="user.matricula && user.matricula.length < 8" style="text-align: center">
                  La matrícula debe mínimo de 8 dígitos.
                </ion-text>
              </ion-col>

              <ion-col size="12">
                <ion-item>
                  <ion-label>Fecha de nacimiento</ion-label>
                  <ion-input :value="user.fecha_Nacimiento"
                    class="ion-text-end" id="date"/>
                  <ion-popover trigger="date" size="auto">
                    <ion-content>
                      <ion-datetime id="datetime" v-model="user.fecha_Nacimiento" display-format="DD/MM/YYYY">
                      </ion-datetime>
                    </ion-content>
                  </ion-popover>
                </ion-item>
                <ion-text color="danger" v-if="user.fecha_Nacimiento && user.fecha_Nacimiento.length < 5" style="text-align: center">
                  La fecha de nacimiento es requerida.
                </ion-text>
              </ion-col>

            </ion-row>

            <!-- <br />

            <ion-row>
              <ion-col class="colImage">
                <ion-card-title>Fotografia de Referencia</ion-card-title>
                <ion-card-subtitle>
                  Agrega una imagen de tu credencial de la UT, para validar tus
                  datos.
                </ion-card-subtitle>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col size="12">
                <ion-item>
                  <label class="image-upload">
                    <ion-input type="file" v-model="user.credencial" @change="handleFileChange" accept="image/*" required>
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

            <br />

            <div class="botonesRegistro">
              <ion-button shape="round" fill="clear" color="danger" @click="goToLogin">
                Regresar
              </ion-button>

              <ion-button shape="round" color="tertiary" @click="registrarUsuario">
                Actualizar
              </ion-button>
            </div>

          </ion-grid>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <!-- Toast de error de registro incompleto -->
    <ion-toast
      :is-open="mostrarToastError"
      message="Ocurrio un error inesperado intenta mas tarde :(."
      position="top"
      color="warning"
      duration="5000"
      :icon="alertCircleOutline"
    >
    </ion-toast>

    <!-- Modal de confirmación de registro de tu ruta -->
    <ion-modal ref="modal" :is-open="showModalConfirm">
      <div class="bodyModal">
        <h2>Actualización Exitosa</h2>
        <ion-icon :icon="checkmarkOutline" color="success"></ion-icon>
        <h3>Se actualizaron tus datos correctamente.</h3>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-button
                @click="showModalConfirm = false"
                shape="round"
                color="success"
              >
                Confirmar
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-modal>

    <!-- Modal de error de tus datos FORMULARIO -->
    <ion-modal ref="modal" :is-open="showModalError">
        <div class="bodyModal">
            <h2>Advertencia</h2>
            <ion-icon :icon="alertCircleOutline" color="warning"></ion-icon>
            <h3>Algunos datos no son válidos verifícalos para continuar.</h3>
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
    
  </ion-page>
</template>

<script>
//Componentes
import AppBarCustom from "../components/NavBarCustom.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
//Ionic
import {
  IonDatetime,IonDatetimeButton, IonModal,IonInput,IonCard,IonCardContent,IonButton,IonToast,IonItem,IonList,
  IonTitle,IonToolbar,IonHeader,IonLabel,IonContent,IonPage,IonPopover,IonCardHeader,IonCardSubtitle,
  IonCardTitle,IonGrid, IonRow, IonCol, IonText, IonIcon, IonImg
} from "@ionic/vue";
//Iconos
import {
  cloudUploadOutline,
  wifiOutline,
  checkmarkOutline,
  alertCircleOutline,
  closeOutline,
} from "ionicons/icons";
//Servicios
import UsuarioService from "@/Services/UsuarioService";

export default {
  components: {
    AppBarCustom, Loading,
    IonPopover,IonDatetime,IonDatetimeButton,IonModal, IonInput, IonCard, IonCardContent, IonButton, IonToast,
    IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonLabel, IonContent, IonPage,  IonCardHeader,
    IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, IonText, IonIcon, IonImg,
  },
  name: "RegistroUsuario",

  data: () => ({
    //Iconos
    cloudUploadOutline,
    wifiOutline,
    checkmarkOutline,
    alertCircleOutline,
    closeOutline,

    contrasenia: '',
    confirmarContrasenia: '',
    credencial: null,
    credencialPreview: null,

    mostrarSegundoFormulario: false,
    showPassword: false,

    mensajeToast: "",
    iconoToast: null,
    colorToast: null,

    isLoading: false,
    CorreoValido: true,
    showModalConfirm: false,
    showModalError: false,
    mostrarToastError: false,

    user: {},
  }),

  created() {
    this.cargarDatos();
  },

  methods: {
    async cargarDatos() {
      try {
        var Id_Usuario = this.$route.params.id;
        const response = await UsuarioService.getUserInfo(Id_Usuario);
        if (response.status == 200 || response.status == 201) {
          this.user = response.data;
          console.log(this.user)
          
          this.contrasenia = this.user.usuarios.contrasenia;
          this.confirmarContrasenia = this.user.usuarios.contrasenia;
          this.credencial = this.user.credencial;
          this.credencialPreview = this.user.credencial;
        } else {
          console.log("Ocurrio un error inesperado");
        }
      } catch (error) {}
    },

    //#region validaciones de form
    validarFormulario() {
      const correoRegex = /@uttt\.edu\.mx$/;
      const matriculaPattern = /^\d{8}$/;
      const telefonoPattern = /^\d{10}$/;
      let errorMessage = "";

      if (!correoRegex.test(this.user.usuarios.correo)) errorMessage += "El correo no es intitucional";

      if(!this.contrasenia >= 8) errorMessage += "La contraseña debe ser minimo de 8 digitos";

      if(!this.confirmarContrasenia == this.contrasenia) errorMessage += "Las contraseñas no coinciden";
      
      if (!this.user.nombre_Completo) errorMessage += "Por favor, ingrese el nombre completo.\n";
      
      if (!telefonoPattern.test(this.user.telefono)) errorMessage += "El teléfono debe contener exactamente 10 dígitos numéricos.\n";
      
      if (!matriculaPattern.test(this.user.matricula)) errorMessage +="La matrícula debe contener exactamente 8 dígitos numéricos.\n";
      
      if (!this.user.grupo) errorMessage += "Por favor, ingrese el grupo.\n";
      
      if (!this.user.fecha_Nacimiento) errorMessage += "Por favor, ingrese la fecha de nacimiento.\n";
      
      //if (!this.credencial) errorMessage += "La crendecial es requerida.\n";

      
      if (errorMessage == "") {
        this.CorreoValido = true;
        return true;
      } else {
        this.CorreoValido = false;
        console.log("Debes ingresar un correo institucional.");
        return false;
      }
    },

    validarCorreoElectronico(correo) {
      // Expresión regular para validar el formato de correo electrónico
      const correoRegex = /@uttt\.edu\.mx$/;
      if (correoRegex.test(correo)) this.CorreoValido = true;

      return correoRegex.test(correo);
    },
    //#endregion validaciones de form

    async registrarUsuario() {
      try {
        this.isLoading = true;
        this.mostrarToastError = false;
        if (this.validarFormulario()) {
          this.mostrarToastError = false;
          //const imagenBase64 = await this.getBase64Image();

          this.user.usuarios.nombre_Usuario = this.user.nombre_Completo;
          this.user.credencial = 'Sin Credencial';
          this.user.usuarios.contrasenia = this.contrasenia;

          var usuario = this.formatoDeDato(JSON.parse(JSON.stringify(this.user)))
          console.log(usuario)

          const response = await UsuarioService.updateUserInfo(usuario)
          console.log(response)
          setTimeout(() => {
            if (response.status == 200 || response.status == 201) {
              this.isLoading = false;
              this.showModalConfirm = true;
            }else{
              this.isLoading = false;
              this.mostrarToastError = true;
            }
          }, 3000);

        } else {
          //DATOS INCOMPLETOS
          this.isLoading = false;
          this.showModalError = true;
        }
      } catch (error) {
        console.log("Error: " + error);
        this.isLoading = false;
        this.mostrarToastError = true;
      }
    },

    //#region Conversion de imagen
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.type.startsWith("image/")) {
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

    getBase64StringFromDataURL(dataURL) {
      return dataURL.replace("data:", "").replace(/^.+,/, "");
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
    //#endregion Conversion de imagen

    goToLogin() {
      this.$router.push("/perfil");
    },

    formatoDeDato(data){
        var AuthRequest = {
            Usuario: {
                Id_Usuario: data.usuarios.id_Usuario,
                Nombre_Usuario: data.nombre_Completo,
                Correo: data.usuarios.correo,
                Contrasenia: data.usuarios.contrasenia,
                Token: null,
                Fecha_Registro: new Date(),
                Estatus: data.usuarios.estatus,
                registro: null
            },

            DatosPersonales: {
                Id_DatosPersonales: data.id_DatosPersonales,
                Id_Usuario: data.id_Usuario,
                Nombre_Completo: data.nombre_Completo,
                Fecha_Nacimiento: data.fecha_Nacimiento,
                Matricula: data.matricula,
                Grupo: data.grupo,
                Credencial: data.credencial,
                Universidad: data.universidad,
                Telefono: data.telefono,
                Correo: data.correo,
                Estatus: data.estatus
            }
        }

        return AuthRequest;
    }
  },
};
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
.colImage {
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
  color: #4fb783;
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