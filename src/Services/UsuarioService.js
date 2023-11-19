import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://localhost:7038/api',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getUserInfo(Id_Usuario){
        return apiClient.get(`/Usuarios/GetUsuarioInfo/${Id_Usuario}`)
    }
}