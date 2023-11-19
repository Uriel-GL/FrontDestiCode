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
    getAllRutas(){
        return apiClient.get('/Rutas/GetAllRutas')
    }, 

    getRutaByIdUsuario(Id_Usuario) {
        return apiClient.get(`/Rutas/GetRutasByUsuario/${Id_Usuario}`)
    },

    getRutaByIdRuta(Id_Ruta){
        return apiClient.get(`/Rutas/GetRutasByIdRuta/${Id_Ruta}`)
    },

    getTickets(Id_Usuario){
        return apiClient.get(`/Rutas/GetTicketsByUser/${Id_Usuario}`)
    },

    getUsuariosReservaronRuta(Id_Usuario){
        return apiClient.get(`/Rutas/GetUsuariosReservaronRuta/${Id_Usuario}`)
    },

    registerRuta(ruta){
        return apiClient.post('/Rutas/RegistarRuta', ruta)
    },

    reservarLugar(reservacion){
        return apiClient.post('/Rutas/ReservarLugar', reservacion)
    },

    cancelarLugar(cancelacion){
        return apiClient.post('/Rutas/CancelarLugar', cancelacion)
    },

    eliminarRuta(){

    }

}