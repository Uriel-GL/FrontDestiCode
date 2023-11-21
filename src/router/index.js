import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import RegistroPage from '../views/RegistroPage.vue';
import VehiculoPage from '../views/VehiculosPage.vue';
import ActualizarVehiculoPage from '../views/ActualiVehiculoPage.vue';
import TabBarComponent from '../components/tabBarComponent.vue'
import Publicaciones from '../views/RutasPage.vue';
import Reservaciones from '../views/ReservacionPage.vue';
import Perfil from '../views/PerfilPage.vue';
import RutaDetalle from '../views/DetalleRutaPage.vue';
import Login from '../views/LoginPage.vue';
import RecuperarContra from '../views/RecuperarContra.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },

  //Rutas para el tabs
  {
    path: '/',
    component: TabBarComponent,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: HomePage
      },
      {
        path: '/publicaciones',
        name: 'Publicaciones',
        component: Publicaciones
      },
      {
        path: '/reservaciones',
        name: 'Reservaciones',
        component: Reservaciones
      },
      {
        path: '/perfil',
        name: 'Perfil',
        component: Perfil
      },
      {
        path: '/detalle-ruta/:id?',
        name: 'DetalleRuta',
        component: RutaDetalle,
        props: true
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registro',
    name: 'Registro',
    component: RegistroPage
  },
  {
    path: '/vehiculos',
    name: 'Vehiculo',
    component: VehiculoPage
  },
  {
    path: '/Actualizar-Vehiculo/:id?',
    name: 'ActualizarVehiculo',
    component: ActualizarVehiculoPage
  },
  {
    path: '/recuperar-contra',
    name: 'Recuperar Contraseña',
    component: RecuperarContra
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
