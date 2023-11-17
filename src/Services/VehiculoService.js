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
    getVehiculosByUsuario(Id_Usuario){
        return apiClient.get(`/Vehiculos/GetVehiculosByUsuario/${Id_Usuario}`)
    },
    registerVehiculo(vehiculo){
        return apiClient.post('/Vehiculos', vehiculo)
    }
}