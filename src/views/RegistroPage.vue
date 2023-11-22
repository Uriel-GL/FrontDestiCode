<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Registro de Usuarios</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" v-if="!mostrarSegundoFormulario">
            <ion-card class="ion-card-small">
                <ion-card-content>
                    <ion-list>
                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Nombre de Usuario</ion-label>
                            <ion-input aria-label="Nombre de Usuario" v-model="nombreUsuario" type="text" required
                                class="custom-input custom-input-border-color-1"></ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Correo Electrónico</ion-label>
                            <ion-input aria-label="Correo Electrónico" v-model="correo" type="email" required
                                class="custom-input custom-input-border-color-2"></ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Contraseña</ion-label>
                            <ion-input aria-label="Contraseña" v-model="contrasenia" type="password" required
                                class="custom-input-password custom-input-border-color-3"
                                ref="contraseniaInput"></ion-input>
                            <ion-button slot="end" @click="togglePasswordVisibility" fill="clear" class="custom-eye-button">
                                <ion-icon :icon="showPassword ? 'eye' : 'eye-off'"></ion-icon>
                            </ion-button>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Confirmar Contraseña</ion-label>
                            <ion-input aria-label="Confirmar Contraseña" v-model="confirmarContrasenia" type="password"
                                required class="custom-input-password custom-input-border-color-3"
                                ref="confirmarContraseniaInput"></ion-input>
                            <ion-button slot="end" @click="togglePasswordVisibility2" fill="clear"
                                class="custom-eye-button">
                                <ion-icon :icon="showPassword2 ? 'eye' : 'eye-off'"></ion-icon>
                            </ion-button>
                        </ion-item>


                        <ion-text color="danger" v-if="confirmarContrasenia && contrasenia !== confirmarContrasenia"
                            style="text-align: center">
                            Las contraseñas no coinciden.
                        </ion-text>
                        <ion-button expand="full" @click="submitForm" class="custom-button">Guardar</ion-button>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>

        <ion-content class="ion-padding" v-else>
            <ion-card class="ion-card-small">
                <ion-card-content>
                    <ion-list>
                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Nombre Completo</ion-label>
                            <ion-input aria-label="Nombre Completo" v-model="nombreCompleto" type="text" required
                                class="custom-input custom-input-border-color-1"></ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Fecha de Nacimiento</ion-label>
                            <ion-input aria-label="Fecha de Nacimiento" id="date">
                                <ion-popover trigger="date" size="auto">
                                    <ion-content>
                                        <ion-datetime id="datetime" v-model="fechaNacimiento"
                                            display-format="DD/MM/YYYY HH:mm"></ion-datetime>
                                    </ion-content>
                                </ion-popover>
                            </ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Matrícula</ion-label>
                            <ion-input aria-label="Matricula" v-model="matricula" type="number" pattern="[0-9]{8}" required
                                class="custom-input custom-input-border-color-2"></ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Grupo</ion-label>
                            <ion-input aria-label="Grupo" v-model="grupo" type="text"
                                class="custom-input custom-input-border-color-3" required></ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Universidad</ion-label>
                            <ion-input aria-label="Universidad" v-model="universidad" type="text"
                                class="custom-input custom-input-border-color-4" required></ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Teléfono</ion-label>
                            <ion-input aria-label="Telefono" v-model="telefono" type="tel" pattern="[0-9]*"
                                class="custom-input custom-input-border-color-1" required></ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Estatus</ion-label>
                            <ion-input aria-label="Estatus" v-model="estatus" type="text"
                                class="custom-input custom-input-border-color-2" required></ion-input>
                        </ion-item>

                        <ion-item class="rounded-item">
                            <ion-label class="custom-label">Credencial</ion-label>
                            <ion-input type="file" v-model="credencial" @change="handleFileChange" accept="image/*"
                                class="custom-file-input" required></ion-input>
                        </ion-item>

                        <ion-item>
                            <ion-img :src="credencialPreview" v-if="credencialPreview"></ion-img>
                        </ion-item>

                        <!-- Botón para regresar al primer formulario y ocultar el segundo formulario -->
                        <ion-button expand="full" @click="regresarAlPrimerFormulario" class="custom-button"
                            v-if="mostrarSegundoFormulario">Regresar</ion-button>

                        <ion-button expand="full" @click="submitForm2" class="custom-button">Registrar</ion-button>

                        <ion-toast v-model="mostrarToastError" message="Por favor, complete todos los campos obligatorios."
                            position="top" color="danger" duration="5000"></ion-toast>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
  
<script>
import { IonDatetime, IonDatetimeButton, IonModal, IonInput, IonCard, IonCardContent, IonButton, IonToast, IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonLabel, IonContent, IonPage, IonPopover } from '@ionic/vue';
import { ref } from 'vue';

export default {
    components: { IonDatetime, IonDatetimeButton, IonModal, IonInput, IonCard, IonCardContent, IonButton, IonToast, IonItem, IonList, IonTitle, IonToolbar, IonHeader, IonLabel, IonContent, IonPage, IonPopover },
    name: 'RegistroUsuario',
    data() {
        return {
            nombreUsuario: '',
            correo: '',
            contrasenia: '',
            fechaRegistro: '',
            mostrarToastError: false,
            showPassword: false,
            showPassword2: false,
            nombreCompleto: '',
            fechaNacimiento: '',
            matricula: '',
            grupo: '',
            universidad: '',
            telefono: '',
            estatus: '',
            credencial: null,
            credencialPreview: null,
            mostrarSegundoFormulario: false,
            registro: ''

        };
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.type.startsWith('image/')) {
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
        validarCorreoElectronico(correo) {
            // Expresión regular para validar el formato de correo electrónico
            const correoRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            return correoRegex.test(correo);
        },

        submitForm() {
            // Variables para almacenar mensajes de error personalizados
            let errorMessage = "";

            // Validación de nombre de usuario
            if (!this.nombreUsuario) {
                errorMessage += "Por favor, ingrese el nombre de usuario.\n";
            }

            // Validación de correo electrónico
            if (!this.correo) {
                errorMessage += "Por favor, ingrese el correo electrónico.\n";
            } else if (!this.validarCorreoElectronico(this.correo)) {
                errorMessage += "El formato del correo electrónico no es válido.\n";
            }

            // Validación de contraseña
            if (!this.contrasenia) {
                errorMessage += "Por favor, ingrese la contraseña.\n";
            } else if (this.contrasenia.length < 8) {
                errorMessage += "La contraseña debe tener al menos 8 caracteres.\n";
            }

            // Validación de confirmación de contraseña
            if (!this.confirmarContrasenia) {
                errorMessage += "Por favor, ingrese la confirmación de contraseña.\n";
            } else if (this.contrasenia !== this.confirmarContrasenia) {
                errorMessage += "Las contraseñas no coinciden.\n";
            }

            // Verifica si hay algún mensaje de error
            if (errorMessage) {
                // Muestra el mensaje de error
                this.mostrarToastError = true;
                alert("Error: \n" + errorMessage);
            } else {
                // Si el primer formulario es válido, muestra el segundo formulario
                this.mostrarSegundoFormulario = true;
            }
        },

        async submitForm2() {
            // Realiza la validación del segundo formulario y registra los datos
            const imagenBase64 = await this.getBase64Image();
            if (this.validateSecondForm()) {
                console.log('Fecha de Nacimiento:', this.fechaNacimiento);

                
                console.log(imagenBase64);
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

                // Función para generar el token
                function generateToken() {
                    // Aquí puedes implementar lógica personalizada para generar el token
                    // Por ejemplo, puedes usar una biblioteca como jsonwebtoken o simplemente generar una cadena aleatoria única
                    // En este ejemplo, simplemente genero una cadena aleatoria de longitud 32
                    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    return token;
                }

                const formattedDate = new Date(this.fechaNacimiento).toISOString();

                // Crea un objeto con los datos del usuario y datos personales
                const usuario = {
                    id_Usuario: generateGuid(),
                    nombre_Usuario: this.nombreUsuario,
                    correo: this.correo,
                    contrasenia: this.contrasenia,
                    token: generateToken(),
                    fecha_Registro: new Date().toISOString(),
                    estatus: true,
                    registro: null
                };

                const datosPersonales = {
                    id_DatosPersonales: generateGuid(),
                    id_Usuario: usuario.id_Usuario,
                    nombre_Completo: this.nombreCompleto,
                    fecha_Nacimiento: this.fechaNacimiento,
                    matricula: this.matricula,
                    grupo: this.grupo,
                    credencial: imagenBase64,
                    universidad: this.universidad,
                    telefono: this.telefono,
                    correo: this.correo, // Usar el mismo correo que en el usuario si es relevante
                    estatus: true
                };

                // Envia la solicitud al servidor para registrar al usuario y sus datos personales
                this.registerUser(usuario, datosPersonales);
            } else {
               
            }
        },
        validateSecondForm() {
            // Variables para almacenar mensajes de error personalizados
            let errorMessage = "";

            // Validación de nombre completo
            if (!this.nombreCompleto) {
                errorMessage += "Por favor, ingrese el nombre completo.\n";
            }

            // Validación de fecha de nacimiento (puedes personalizar el mensaje de error)
            if (!this.fechaNacimiento) {
                errorMessage += "Por favor, ingrese la fecha de nacimiento.\n";
            }

            // Validación de matrícula: Debe ser numérica y tener exactamente 8 dígitos
            const matriculaPattern = /^\d{8}$/;
            if (!this.matricula) {
                errorMessage += "Por favor, ingrese la matrícula.\n";
            } else if (!matriculaPattern.test(this.matricula)) {
                errorMessage += "La matrícula debe contener exactamente 8 dígitos numéricos.\n";
            }

            // Validación de grupo (puedes personalizar el mensaje de error)
            if (!this.grupo) {
                errorMessage += "Por favor, ingrese el grupo.\n";
            }

            // Validación de universidad (puedes personalizar el mensaje de error)
            if (!this.universidad) {
                errorMessage += "Por favor, ingrese la universidad.\n";
            }

            // Validación de teléfono: Debe ser numérico y tener exactamente 10 dígitos
            const telefonoPattern = /^\d{10}$/;
            if (!this.telefono) {
                errorMessage += "Por favor, ingrese el teléfono.\n";
            } else if (!telefonoPattern.test(this.telefono)) {
                errorMessage += "El teléfono debe contener exactamente 10 dígitos numéricos.\n";
            }

            // Validación de estatus (puedes personalizar el mensaje de error)
            if (!this.estatus) {
                errorMessage += "Por favor, ingrese el estatus.\n";
            }

            // Verifica si hay algún mensaje de error
            if (errorMessage) {
                // Muestra el mensaje de error
                alert("Error: \n" + errorMessage);
                return false;
            } else {
                // Si el segundo formulario es válido, devuelve true
                return true;
            }
        },

        regresarAlPrimerFormulario() {
            // Oculta el segundo formulario y muestra el primer formulario
            this.mostrarSegundoFormulario = false;
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
            const inputElement = this.$refs.contraseniaInput.$el.querySelector('input');
            if (inputElement) {
                inputElement.type = this.showPassword ? 'text' : 'password';
            }
        },

        togglePasswordVisibility2() {
            this.showPassword2 = !this.showPassword2;
            const inputElement = this.$refs.confirmarContraseniaInput.$el.querySelector('input');
            if (inputElement) {
                inputElement.type = this.showPassword2 ? 'text' : 'password';
            }
        },

        registerUser(usuario, datosPersonales) {
            // Envía la solicitud de registro al servidor
            fetch("https://localhost:7038/api/Auth/RegistrarUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ usuario, datosPersonales })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("No se pudo registrar el usuario");
                    }
                    alert("Registro Exitoso");
                    // Restablece los valores a vacío
                    this.nombreUsuario = '';
                    this.correo = '';
                    this.contrasenia = '';
                    this.confirmarContrasenia = '';
                    this.fechaNacimiento = '';
                    this.matricula = '';
                    this.grupo = '';
                    this.universidad = '';
                    this.telefono = '';
                    this.estatus = '';
                    this.credencial = null;
                    this.credencialPreview = null;
                    this.mostrarSegundoFormulario = false;
                })
                .catch(error => {
                    alert(error.message);
                });
        },
        getBase64StringFromDataURL(dataURL) {
            return dataURL.replace('data:', '').replace(/^.+,/, '');
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
    }
}
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

ion-input.custom-input-password {
    width: 55%;
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

.custom-input-border-color-1 {
    border: 2px solid #F5FCCD;
}

.custom-input-border-color-2 {
    border: 2px solid #4FB783;
}

.custom-input-border-color-3 {
    border: 2px solid #409D9B;
}

ion-item {
    --border-width: 0;
    /* Elimina el borde */
    --inner-border-width: 0;
    /* Elimina el borde interno */
}

.custom-eye-button {
    /* Establece el color de fondo y el color del borde del botón */
    --background: #034561;
    /* Color de fondo personalizado 4FB783*/
    --border-color: #4FB783;
    /* Color del borde personalizado 034561*/
    /* Personaliza otros estilos según tus preferencias */
    border-radius: 10px;
    font-size: 16px;
    width: 40px;
    height: 40px;
}
</style>
  