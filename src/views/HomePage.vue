<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Iniciar Sesión</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">


      <ion-card class="ion-card-small">
        <!-- Agregamos una imagen arriba del formulario -->
        <img
          src="https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
          alt="Login Image" class="login-image" />
        <ion-card-content>
          <ion-list>
            <ion-item class="rounded-item">
              <ion-label class="custom-label">Usuario</ion-label>
              <ion-input v-model="usuario" type="text" required class="custom-input"></ion-input>
            </ion-item>

            <ion-item class="rounded-item">
              <ion-label class="custom-label">Contraseña</ion-label>
              <ion-input v-model="contrasena" type="password" required class="custom-input"></ion-input>
            </ion-item>

            <ion-button expand="full" @click="iniciarSesion" class="custom-button">Iniciar Sesión</ion-button>

            <ion-button expand="full" @click="registrarUsuario" class="custom-button">Registrate Aquí</ion-button>

          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonInput, IonButton, IonToast, IonPage } from '@ionic/vue';
import { ref } from 'vue';

export default {
  components: { IonInput, IonButton, IonToast, IonPage },
  name: 'Home',
  data() {
    return {
      usuario: '',
      contrasena: '',
      mostrarToastError: false,
    };
  },
  methods: {
    iniciarSesion() {
      let errorMessage = "";

      if (!this.usuario) {
        errorMessage += "Por favor, ingrese el usuario.\n";
      }

      if (!this.contrasena) {
        errorMessage += "Por favor, ingrese la contraseña.\n";
      }

      if (errorMessage) {
        // Muestra el mensaje de error
        alert("Error: \n" + errorMessage);
      } else {
        // lógica para verificar las credenciales del usuario.
      }
    },

    registrarUsuario() {
      this.$router.push("/registro")
    }
  },
};
</script>

<style scoped>
.ion-card-small {
  max-width: 400px;
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

.custom-button {
  border-radius: 10px;
  --color: #F5FCCD;
  --background: #034561;
  font-size: 14px;
  padding: 8px 16px;
}

.login-image {
  display: block;
  margin: 0 auto;
  max-width: 150px;
  height: 150px;
  border-radius: 100px;
}

ion-item {
  --border-width: 0;
  /* Elimina el borde */
  --inner-border-width: 0;
  /* Elimina el borde interno */
}</style>
