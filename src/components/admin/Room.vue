<template>
    <div class="padding">
        <div class="row">
            <div class="col m12 s12 mt">
                <h3 class="center-align" > ¡ Habitaciones ! Total: {{ rooms.total_rooms }} </h3>
                <a class="btn-floating btn-large waves-effect waves-light green" @click="form = !form">
                    <i class="material-icons">add</i>
                </a>
                <md-table v-if="showDetails != 0">
                    <md-table-row>
                        <br>
                        <md-button class="md-icon-button md-dense md-raised md-primary" @click="showDetails = 0">
                            <md-icon>cached</md-icon>
                        </md-button>
                        <md-table-head md-numeric class="center"><b>Detalles</b></md-table-head>
                    </md-table-row>
                    <md-table-row>
                        <md-table-cell md-numeric>
                            <h6>Detalles de está habitación</h6>
                            <p><b>Número de piso:</b> {{ showDetails.number_floor }}</p>
                            <p><b>Número de habitación:</b> {{ showDetails.number_room }}</p>
                            <p><b>Tipo de habitación:</b> {{ showDetails.room_type.titulo }}</p>
                            <p><b>Precio por día:</b> {{ showDetails.room_type.price_day }}$</p>
                            <p><b>Nombre hotel:</b> {{ showDetails.hotel.name }}</p>
                            <p><b>Dirección hotel:</b> {{ showDetails.hotel.address }}</p>
                            <h6>Detalles del huséped de esta habitación</h6>
                            <ul>
                                <li>
                                    <p><b>{{ guest.data.name }}</b></p>
                                </li>
                                <li>
                                    <p><b>{{ guest.data.last_name }}</b></p>
                                </li>
                                <li>
                                    <p><b>{{ guest.data.ci }}</b></p>
                                </li>
                                <li>
                                    <p><b>{{ guest.data.age }}</b></p>
                                </li>
                                <li>
                                    <p><b>{{ guest.data.number_phone }}</b></p>
                                </li>
                                <li>
                                    <p><b>{{ guest.data.address }}</b></p>
                                </li>
                            </ul>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
                <div v-if="form">
                    <form @submit.prevent="setRoom">
                        <label for="code">Código</label>
                        <input type="text" name="code" id="code" v-model="code" class="form-control" required placeholder="ejemplo piso mas habitacion 5-5120">
                        <label for="number_floor">Número de piso</label>
                        <input type="number" name="number_floor" id="number_floor" v-model="number_floor" class="form-control" required>
                        <label for="number_room">Número de habitación</label>
                        <input type="number" name="number_room" id="number_room" v-model="number_room" class="form-control" required>
                        <md-field>
                            <label for="status">Estatus de la habitación</label>
                            <md-select v-model="status" name="status" id="status">
                                <md-option value="disponible">disponible</md-option>
                                <md-option value="inactivo">inactivo</md-option>
                                <md-option value="mantenimiento">mantenimiento</md-option>
                            </md-select>                            
                        </md-field>
                        <md-field>
                            <label for="hotel_id">Hotel</label>
                            <md-select v-model="hotel_id" name="hotel_id" id="hotel_id">
                                <md-option v-for="hotel in hotels.data" :key="hotel.id" :value="hotel.id">
                                    {{ hotel.name }} - {{ hotel.address }}
                                </md-option>
                            </md-select>                            
                        </md-field>
                        <md-field>
                            <label for="room_type_id">Tipo de habitaciones</label>
                            <md-select v-model="room_type_id" name="room_type_id" id="room_type_id">
                                <md-option v-for="room_type in type_rooms.data" :key="room_type.id" :value="room_type.id">
                                    {{ room_type.titulo }} - {{ room_type.price_day }}$
                                </md-option>
                            </md-select>                            
                        </md-field>
                        <button class="btn center-align green" v-if="form && !edit">Enviar</button>
                    </form>
                    <button type="buttton" class="btn center-align green" v-if="edit" @click="putRoom">Guardar</button>
                </div>
                <md-table v-else>
                    <md-table-row>
                        <md-table-head md-numeric>ID</md-table-head>
                        <md-table-head>Código</md-table-head>
                        <md-table-head>Status</md-table-head>
                        <md-table-head>Tipo</md-table-head>
                        <md-table-head>Precio por día</md-table-head>
                        <md-table-head>Acciones</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(room, index) in rooms.data" :key="index">
                        <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
                        <md-table-cell>{{ room.code }}</md-table-cell>
                        <md-table-cell>{{ room.status }}</md-table-cell>
                        <md-table-cell>{{ room.room_type.titulo }}</md-table-cell>
                        <md-table-cell>{{ room.room_type.price_day }}</md-table-cell>
                        <md-table-cell>
                            <button class="btn btn-small" v-if="room.status == 'ocupado'" @click="showData(index)">Detalles</button>
                            <button class="btn btn-small blue" @click="editRoom(index)">Editar</button>
                            <button class="btn btn-small red" @click="delRoom(room.id)">Eliminar</button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
        </div>
    </div>
</template>

<script>
import auth from "@/logic/auth";
export default {
    data() {
        return {
            guest: [],
            rooms: [],
            type_rooms: [],
            hotels: [],
            form: false,
            edit: false,
            id: 0,
            code: "",
            number_floor: 0,
            number_room: 0, 
            status: "", 
            room_type_id: 0,
            hotel_id: 0,
            showDetails: 0
        }
    },
    methods: {
        async getRooms() {
            try {
                let token = auth.getCredential()
                let response = await auth.getRooms(token)
                if (response.data) {
                    this.rooms = response.data
                }
            } catch (error) {
                console.log(error)
            }
        },
        async setRoom() {
            try {
                let token = auth.getCredential()
                let params = {
                    code: this.code,
                    number_floor: Number(this.number_floor),
                    number_room: Number(this.number_room) ,
                    status: this.status, 
                    room_type_id: this.room_type_id,
                    hotel_id: this.hotel_id
                }
                let response = await auth.setRoom(token, params)
                if (response.data) {
                    this.getRooms()
                    this.redirect()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async putRoom() {
            try {
                let token = auth.getCredential()
                let params = {
                    code: this.code,
                    number_floor: Number(this.number_floor),
                    number_room: Number(this.number_room) ,
                    status: this.status, 
                    room_type_id: this.room_type_id,
                    hotel_id: this.hotel_id
                }
                let response = await auth.putRoom(token, params, this.id)
                if (response.data) {
                    this.getRooms()
                    this.redirect()
                    this.deleteData()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async delRoom(id) {
            try {
                let token = auth.getCredential()
                let response = await auth.delRoom(token, id)
                if (response.data) {
                    this.getRooms()
                    this.redirect()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        editRoom(index) {
            let data = this.rooms.data[index]
            this.edit = true
            this.form = true
            this.id = data.id
            this.code = data.code
            this.number_floor = data.number_floor
            this.number_room = data.number_room
            this.status = data.status
            this.room_type_id = data.room_type_id
            this.hotel_id = data.hotel_id
        },
        async getTypeRooms() {
            try {
                let token = auth.getCredential()
                let response = await auth.getTypeRooms(token)
                if (response.data) {
                    this.type_rooms = response.data
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getHotels() {
            try {
                let token = auth.getCredential()
                let response = await auth.getHotels(token)
                if (response.data) {
                    this.hotels = response.data
                }
            } catch (error) {
                console.log(error)
            }
        },
        showData(index) {
            this.showDetails = this.rooms.data[index]
            let id = this.showDetails.rooms_reservations[0].guest_id
            this.getGuests(id)
        },
        redirect() {
            this.form = false
        },
        deleteData() {
            this.id = ""
            this.code = ""
            this.number_floor = ""
            this.number_room = ""
            this.status = ""
            this.room_type_id = ""
            this.hotel_id = ""
            this.edit = false
        },
        async getGuests(id) {
            try {
                let token = auth.getCredential()
                let response = await auth.getGuest(token, id)
                if (response.data) {
                    this.guest = response.data
                }
            } catch (error) {
                console.log(error)
            }
        },
    },
    created() {
        this.getRooms()
        this.getTypeRooms()
        this.getHotels()
    }
}
</script>

<style lang="scss" scoped>

</style>