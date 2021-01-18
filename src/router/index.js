import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import Logout from '@/components/logout/Logout.vue';
import Hotel from '@/components/admin/Hotel.vue'
import RoomType from '@/components/admin/RoomType.vue'
import Room from '@/components/admin/Room.vue'
import Guest from '@/components/admin/Guest.vue'
import Reservation from '@/components/admin/Reservation.vue'
import GuestClient from '@/components/client/Guest.vue'
import ReservationClient from '@/components/client/Reservation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  { 
    path: '/login',
    name: 'Login', 
    component: Login 
  },
  { 
    path: '/register',
    name: 'Registro',
    component: Register 
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/hotel-admin',
    name: 'Hotel',
    component: Hotel
  },
  {
    path: '/room-type-admin',
    name: 'RoomType',
    component: RoomType
  },
  {
    path: '/room-admin',
    name: 'Room',
    component: Room
  },
  {
    path: '/guest-admin',
    name: 'GuestAdmin',
    component: Guest
  },
  {
    path: '/reservation-admin',
    name: 'ReservationAdmin',
    component: Reservation
  },
  {
    path: '/guest-client',
    name: 'Guest',
    component: GuestClient
  },
  {
    path: '/reservation-client',
    name: 'Reservation',
    component: ReservationClient
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
