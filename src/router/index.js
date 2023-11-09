import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import RegistroPage from '../views/RegistroPage.vue';
import VehiculoPage from '../views/VehiculosPage.vue';
import RutasPage from '../views/RutasPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
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
    path: '/rutas',
    name: 'RegistroRutas',
    component: RutasPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
