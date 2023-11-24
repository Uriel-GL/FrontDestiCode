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
    getVehiculoById(Id_Unidad){
        return apiClient.get(`/Vehiculos/VehiculoById/${Id_Unidad}`)
    },
    getVehiculosByUsuario(Id_Usuario){
        return apiClient.get(`/Vehiculos/GetVehiculosByUsuario/${Id_Usuario}`)
    },
    registerVehiculo(vehiculo){
        return apiClient.post('/Vehiculos/RegistrarVehiculo', vehiculo)
    },
    updateVehiculo(vehiculo){
        return apiClient.post('/Vehiculos/ActualizarVehiculo', vehiculo)
    },
    deleteVehiculo(Id_Unidad){
        return apiClient.delete(`/Vehiculos/EliminarVehiculo/${Id_Unidad}`)
    }
}