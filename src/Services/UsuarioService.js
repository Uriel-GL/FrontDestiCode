import axios from "axios";
import { enviorment } from '../environments/enviroments';

const apiClient = axios.create({
    baseURL: enviorment.apiUrl,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getUserInfo(Id_Usuario){
        return apiClient.get(`/Usuarios/GetUsuarioInfo/${Id_Usuario}`)
    },

    updateUserInfo(data){
        return apiClient.post('/Usuarios/ActualizarDatosPersonales', data)
    }
}