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
  // Autententicación
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
  setHotel(token, params) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.post(`${ENDPOINT_PATH}admin/hotels/store`, params)
  },
  getHotel(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/hotels/${id}`)
  },
  putHotel(token, params, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.put(`${ENDPOINT_PATH}admin/hotels/update/${id}`, params)
  },
  delHotel(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.delete(`${ENDPOINT_PATH}admin/hotels/${id}`)
  },
  // tipos de habitaciones
  getTypeRooms(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/room-types`)
  },
  setTypeRoom(token, params) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.post(`${ENDPOINT_PATH}admin/room-types/store`, params)
  },
  getTypeRoom(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/room-types/${id}`)
  },
  putTypeRoom(token, params, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.put(`${ENDPOINT_PATH}admin/room-types/update/${id}`, params)
  },
  delTypeRoom(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.delete(`${ENDPOINT_PATH}admin/room-types/${id}`)
  },
  // habitaciones
  getRooms(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/rooms`)
  },
  setRoom(token, params) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.post(`${ENDPOINT_PATH}admin/rooms/store`, params)
  },
  getRoom(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/rooms/${id}`)
  },
  putRoom(token, params, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.put(`${ENDPOINT_PATH}admin/rooms/update/${id}`, params)
  },
  delRoom(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.delete(`${ENDPOINT_PATH}admin/rooms/${id}`)
  },
  // huéspedes
  getGuests(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/guests`)
  },
  setGuest(token, params) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.post(`${ENDPOINT_PATH}admin/guests/store`, params)
  },
  getGuest(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/guests/${id}`)
  },
  putGuest(token, params, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.put(`${ENDPOINT_PATH}admin/guests/update/${id}`, params)
  },
  delGuest(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.delete(`${ENDPOINT_PATH}admin/guests/${id}`)
  },
  // reservaciones
  getReservations(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/reservations`)
  },
  setReservation(token, params) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.post(`${ENDPOINT_PATH}admin/reservations/store`, params)
  },
  getReservation(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}admin/reservations/${id}`)
  },
  putReservation(token, params, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.put(`${ENDPOINT_PATH}admin/reservations/update/${id}`, params)
  },
  delReservation(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.delete(`${ENDPOINT_PATH}admin/reservations/${id}`)
  },
  // reservaciones - cliente
  getReservationsCl(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}client/reservations`)
  },
  setReservationCl(token, params) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.post(`${ENDPOINT_PATH}client/reservations/store`, params)
  },
  getReservationCl(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}client/reservations/${id}`)
  },
  putReservationCl(token, params, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.put(`${ENDPOINT_PATH}client/reservations/update/${id}`, params)
  },
  delReservationCl(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.delete(`${ENDPOINT_PATH}client/reservations/${id}`)
  },
  // huésped - cliente
  getGuestsCl(token, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}client/guests/${id}`)
  },
  setGuestsCl(token, params) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.post(`${ENDPOINT_PATH}client/guests/store`, params)
  },
  putGuestsCl(token, params, id) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.put(`${ENDPOINT_PATH}client/guests/update/${id}`, params)
  },
  // habitaciones disponibles cliente
  getRoomsCl(token) {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${ENDPOINT_PATH}client/rooms`)
  },
};