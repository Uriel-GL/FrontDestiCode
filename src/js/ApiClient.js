// Clase Js la cual importara para todo el proyecto el cliente principal de Api
import axios from "axios";

//Cliente principal de la Api
const apiClient = axios.create({
    baseURL: '',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default apiClient