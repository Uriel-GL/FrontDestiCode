// Clase Js la cual importara para todo el proyecto el cliente principal de Api
import axios from "axios";
import { enviorment } from '../environments/enviroments';

//Cliente principal de la Api
const apiClient = axios.create({
    baseURL: enviorment.apiUrl,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    login(credenciales) {
        return apiClient.post('/Auth/IniciarSesion', credenciales)
    },
    
    registro(usuario) {
        return apiClient.post('/Auth/RegistrarUsuario', usuario)
    },

    recuperarContra(request){
        return apiClient.post('/Auth/RecuperarContra', request)
    },

    resetearContra(request){
        return apiClient.post('/Auth/ResetearContrasenia', request)
    }
}