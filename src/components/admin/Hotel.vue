<template>
    <div class="padding">
        <div class="row">
            <div class="col m12 s12 mt text-center">
                <h3 class="center-align" > ¡ Hoteles ! Total: {{ hotels.total_hotels }}</h3>
                <a class="btn-floating btn-large waves-effect waves-light green" @click="form = !form">
                    <i class="material-icons">add</i>
                </a>
                <div v-if="form">
                    <form @submit.prevent="setHotel">
                        <label for="name">Nombre</label>
                        <input type="text" name="name" id="name" v-model="name" class="form-control" required>
                        <label for="number_floor">Cantidad de pisos</label>
                        <input type="text" name="number_floor" id="number_floor" v-model="number_floor" class="form-control" required>
                        <label for="number_room">Cantidad de habitaciones</label>
                        <input type="number" name="number_room" id="number_room" v-model="number_room" class="form-control" required>
                        <label for="address">Dirección</label>
                        <input type="text" name="address" id="address" v-model="address" class="form-control" required>
                        <button class="btn center-align green" v-if="form && !edit">Enviar</button>
                    </form>
                    <button type="buttton" class="btn center-align green" v-if="edit" @click="putHotel">Guardar</button>
                </div>
                <md-table v-else>
                    <md-table-row>
                        <md-table-head md-numeric>ID</md-table-head>
                        <md-table-head>Name</md-table-head>
                        <md-table-head>Dirección</md-table-head>
                        <md-table-head>N° pisos</md-table-head>
                        <md-table-head>N° habitaciones registradas</md-table-head>
                        <md-table-head>Acciones</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(hotel, index) in hotels.data" :key="index">
                        <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
                        <md-table-cell>{{ hotel.name }}</md-table-cell>
                        <md-table-cell>{{ hotel.address }}</md-table-cell>
                        <md-table-cell>{{ hotel.number_floor }}</md-table-cell>
                        <md-table-cell>{{ hotel.total_rooms }}</md-table-cell>
                        <md-table-cell>
                            <button class="btn btn-small blue" @click="editHotel(index)">Editar</button>
                            <button class="btn btn-small red" @click="delHotel(hotel.id)">Eliminar</button>
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
            hotels: [],
            form: false,
            edit: false,
            id: 0,
            name: "",
            number_floor: 0,
            number_room: 0,
            address: ""
        }
    },
    methods: {
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
        async setHotel() {
            try {
                let token = auth.getCredential()
                let params = {
                    name: this.name,
                    number_floor: Number(this.number_floor),
                    number_room: Number(this.number_room),
                    address: this.address,
                }
                let response = await auth.setHotel(token, params)
                if (response.data) {
                    this.getHotels()
                    this.redirect()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async putHotel() {
            try {
                let token = auth.getCredential()
                let params = {
                    name: this.name,
                    number_floor: Number(this.number_floor),
                    number_room: Number(this.number_room),
                    address: this.address,
                }
                let response = await auth.putHotel(token, params, this.id)
                if (response.data) {
                    this.getHotels()
                    this.redirect()
                    alert(response.data.message)
                    this.deleteData()
                }
            } catch (error) {
                console.log(error)
            }
        },
        async delHotel(id) {
            try {
                let token = auth.getCredential()
                let response = await auth.delHotel(token, id)
                if (response.data) {
                    this.getHotels()
                    this.redirect()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        editHotel(index) {
            let data = this.hotels.data[index]
            this.edit = true
            this.form = true
            this.id = data.id
            this.name = data.name,
            this.number_floor = data.number_floor
            this.number_room = data.number_room
            this.address = data.address
        },
        redirect() {
            this.form = false
        },
        deleteData() {
            this.id = ""
            this.name = "",
            this.number_floor = ""
            this.number_room = ""
            this.address = ""
            this.edit = false
        }
    },
    created() {
        this.getHotels()
    }
}
</script>

<style lang="scss" scoped>

</style>