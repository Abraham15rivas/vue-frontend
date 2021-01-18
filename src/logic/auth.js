import axios from "axios"
import Cookies from "js-cookie"

const ENDPOINT_PATH = "http://localhost:8000/api/"
axios.defaults.headers.post['Content-Type'] = 'application/json';
let token

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged)
  },
  getUserLogged() {
    return Cookies.get("userLogged")
  },
  deleteUserLogged() {
    Cookies.remove('userLogged')
  },
  setCredential(credential) {
    token = `${credential.token_type} ${credential.access_token}`
    Cookies.set("credential", token)
  },
  getCredential() {
    return Cookies.get("credential")
  },
  deleteCredential() {
    Cookies.remove('credential')
  },
  register(user) {   
    return axios.post(`${ENDPOINT_PATH}auth/signup`, user)
  },
  login(user) {
    return axios.post(`${ENDPOINT_PATH}auth/login`, user)
  },
  logout() {
    return axios.get(`${ENDPOINT_PATH}auth/logout`)
  },
  getDataUser(token) {
    axios.defaults.headers.common['Authorization'] = token;
    return axios.get(`${ENDPOINT_PATH}auth/user`)
  },
  // Hoteles
  getHotels(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/hotels`)
  },

  // tipos de habitaciones
  getTypeRooms(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/room-types`)
  },

  // habitaciones
  getRooms(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/rooms`)
  },

  // huéspedes
  getGuests(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/guests`)
  },

  // reservaciones
  getReservations(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/reservations`)
  },

  // reservaciones - cliente
  getReservationCl(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}client/reservations`)
  },

   // huésped - cliente
   getGuestsCl(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}client/guests`)
  },
};