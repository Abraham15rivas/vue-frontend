<template>
    <div class="padding">
        <div class="row">
            <div class="col m12 s12 mt">
                <h3 class="center-align"> ¡ Reservaciones ! Total {{ reservations.total_reservations }}</h3>
                <input type="search" v-model="search" placeholder="buscar reservaciones por Nombre">
                <a class="btn-floating btn-large waves-effect waves-light green" @click="form = !form">
                    <i class="material-icons">add</i>
                </a>
                <md-table v-if="form == false">
                    <md-table-row>
                        <md-table-head md-numeric>ID</md-table-head>
                        <md-table-head>Nombre</md-table-head>
                        <md-table-head>Cédula</md-table-head>
                        <md-table-head>Status</md-table-head>
                        <md-table-head>Fechas</md-table-head>
                        <md-table-head>N° Habitaciones reservadas</md-table-head>
                        <md-table-head>Total Precio</md-table-head>
                        <md-table-head>Acciones</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(reservation, index) in reservations.data" :key="index">
                        <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
                        <md-table-cell>{{ reservation.guest.name }}</md-table-cell>
                        <md-table-cell>{{ reservation.guest.ci }}</md-table-cell>
                        <md-table-cell>{{ reservation.status }}</md-table-cell>
                        <md-table-cell>
                            {{ reservation.start_date }} - {{ reservation.finish_date }}
                        </md-table-cell>
                        <md-table-cell>{{ reservation.amount_room }}</md-table-cell>
                        <md-table-cell>{{ reservation.total_price }}$</md-table-cell>
                        <md-table-cell>
                            <button class="btn btn-small blue" @click="editData(index)">Editar</button>
                            <button class="btn btn-small red" @click="delReservation(reservation.id)">Eliminar</button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
                <div v-else>
                    <form @submit.prevent="setReservation">
                        <label for="start_date">Fecha Inicio</label>
                        <input type="date" name="start_date" id="start_date" :min="dateActual" v-model="start_date" class="form-control" required>
                        <label for="finish_date">Fecha Finalización</label>
                        <input type="date" name="finish_date" id="finish_date" :min="start_date" v-model="finish_date" class="form-control" required>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item">
                                <md-field>
                                    <label for="guest_id">Usuario</label>
                                    <md-select v-model="guest_id" name="guest_id" id="guest_id">
                                        <md-option v-for="user in guests.data" :key="user.id" :value="user.id">
                                            {{ user.name }} - {{ user.ci }}
                                        </md-option>
                                    </md-select>                            
                                </md-field>
                                <md-field v-if="rooms.data.length > 0">
                                    <label for="rooms_selected">Habitaciones</label>
                                    <md-select v-model="rooms_selected" name="rooms_selected" id="rooms_selected" multiple>
                                        <md-option v-for="room in rooms.data" :key="room.id" :value="room.id">
                                            {{ room.code }} - {{ room.hotel.name }} - {{ room.room_type.titulo }} - {{ room.room_type.price_day }}$
                                        </md-option>
                                    </md-select>                            
                                </md-field>
                                <h3 v-else class="center-align">No hay habitaciones disponible</h3>
                                <div>
                                    <strong>Tarifa por un día:</strong>
                                    {{ price_room_day = total_payment }}$
                                </div>
                                <div>
                                    <strong>Total a pagar más de un día:</strong>
                                    {{ total_price }}$
                                </div>
                            </div>
                        </div>
                        <br>
                        <button type="submit" class="btn center-align green" v-if="(rooms.data != undefined ? rooms.data.length : '')  > 0 && form && !edit">Reservar</button>
                    </form>
                    <button type="buttton" class="btn center-align green" v-if="edit && form" @click="putReservation">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import auth from "@/logic/auth";
export default {
    data() {
        return {
            search: null,
            guests: [],
            reservation_id: 0,
            days_requested: 0,
            price_room_day: 0,
            rooms: [],
            reservations: [],
            form: false,
            edit: false,
            start_date: "", 
            finish_date: "", 
            amount_room: 0, 
            total_price: 0,
            guest_id: 0,
            rooms_selected: [],
            dateActual: moment().format('YYYY-MM-DD')
        }
    },
    methods: {
        async getGuests() {
            try {
                let token = auth.getCredential()
                let response = await auth.getGuests(token)
                if (response.data) {
                    this.guests = response.data
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getRooms() {
            try {
                let token = auth.getCredential()
                let response = await auth.getRooms(token)
                if (response.data) {
                    let filtrados = response.data.data.filter((element) => {
                        return element.status == "disponible"
                    })
                    response.data.data = filtrados
                    this.rooms = response.data
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getReservations() {
            try {
                let token = auth.getCredential()
                let response = await auth.getReservations(token)
                if (response.data) {
                    this.reservations = response.data
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getRoom(id) {
            try {
                let token = auth.getCredential()
                let response = await auth.getRoom(token, id)
                if (response.data) {
                    this.result = response.data.data
                }
            } catch (error) {
                console.log(error)
            }
        },
        async delReservation(id) {
            try {
                let token = auth.getCredential()
                let response = await auth.delReservation(token, id)
                if (response.data) {
                    this.getReservations()
                    this.redirect()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async setReservation() {
            try {
                let token = auth.getCredential()
                let params = {
                    start_date: this.start_date, 
                    finish_date: this.finish_date, 
                    amount_room: this.amount_room, 
                    total_price: this.total_price,
                    guest_id: this.guest_id,
                    rooms_selected: this.rooms_selected,
                }
                let response = await auth.setReservation(token, params)
                if (response.data) {
                    this.getReservations()
                    this.redirect()
                    alert(response.data.message);
                }
            } catch (error) {
                console.log(error)
            }
        },
        async putReservation() {
            try {
                let token = auth.getCredential()
                let params = {
                    start_date: this.start_date, 
                    finish_date: this.finish_date, 
                    amount_room: this.amount_room, 
                    total_price: this.total_price,
                    guest_id: this.guest_id,
                    rooms_selected: this.rooms_selected,
                }
                let id = this.reservation_id
                let response = await auth.putReservation(token, params, id)
                if (response.data) {
                    this.getReservations()
                    this.redirect()
                    this.deleteData()
                    alert(response.data.message);
                }
            } catch (error) {
                console.log(error)
            }
        },
        async delReservation(id) {
            try {
                let token = auth.getCredential()
                let response = await auth.delReservation(token, id)
                if (response.data) {
                    this.getReservations()
                    this.redirect()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        calcDays(from, until) {
            let from_date = moment(from, 'YYYY-MM-DD')
            let until_date = moment(until, 'YYYY-MM-DD')
            this.days_requested = until_date.diff(from_date, 'days')
        },
        calcTotal() {
            this.total_price = this.days_requested * this.price_room_day
        },
        redirect() {
            this.form = false
        },
        editData(index) {
            let datos = this.reservations.data[index]
            console.log(datos)
            let ids = []
            let rooms = []
            this.reservation_id = datos.id
            this.start_date = datos.start_date
            this.finish_date = datos.finish_date
            for (let i = 0; i < datos.reservations_rooms.length; i++) {
                ids.push(datos.reservations_rooms[i].id)
            }
            datos.reservations_rooms.forEach(element => {
                return rooms.push(element)
            });
            this.rooms.data.forEach(room => {
                return rooms.push(room)
            });
            this.rooms.data = rooms
            this.rooms_selected = ids
            this.form = true
            this.edit = true
        },
        deleteData() {
            this.start_date = "" 
            this.finish_date = "" 
            this.amount_room = "" 
            this.total_price = ""
            this.guest_id = ""
            this.rooms_selected = ""
            this.edit = false
        },
    },
    computed: {
        total_payment() {
            let ids = this.rooms_selected
            let price_day = [0]
            if (ids.length > 0) {
                for (let i = 0; i <= ids.length; i++) {
                    this.rooms.data.map((room) => {
                        if (room.id == ids[i]) {
                            return price_day.push(room.room_type.price_day)
                        }
                    })
                }
            }
            return price_day.reduce((a, b) => a + b)
        }
    },
    watch: {
        rooms_selected() {
            this.amount_room = this.rooms_selected.length
        },
        start_date() {
            if ((this.start_date && this.finish_date) != "") {
                this.calcDays(this.start_date, this.finish_date)
            }
        },
        finish_date() {
            if ((this.start_date && this.finish_date) != "") {
                this.calcDays(this.start_date, this.finish_date)
            }
        },
        days_requested() {
            this.calcTotal()
        },
        price_room_day() {
            this.calcTotal()
        },
        search() {
            if (this.search == null || this.search == "") {
                this.getReservations()
            } else {
                let data = this.reservations.data.filter((element) => {
                    return element.guest.name.toLowerCase().includes(this.search.toLowerCase())
                })                
                this.reservations.data = data
            }          
        }
    },
    created() {
        this.getReservations()
        this.getRooms()
        this.getGuests()
    }
}
</script>

<style lang="scss" scoped>
  .md-field {
    max-width: 100%;
  }
</style>