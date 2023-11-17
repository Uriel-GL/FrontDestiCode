// Clase Js la cual importara para todo el proyecto el cliente principal de Api
import axios from "axios";

//Cliente principal de la Api
const apiClient = axios.create({
    baseURL: 'https://localhost:7038/api',
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
    }
}