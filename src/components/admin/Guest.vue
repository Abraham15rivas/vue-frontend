<template>
    <div class="padding">
        <div class="row">
            <div class="col m12 s12 mt">
                <h3 class="center-align" > ¡ Huéspedes ! Total: {{ guests.total_guests }}</h3>
                <a class="btn-floating btn-large waves-effect waves-light green" v-if="form" @click="form = !form">
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
                            <h6>Detalles de las reservaciones del huésped: {{ showDetails.name }}</h6>
                            <ul>
                                <li v-for="detail in showDetails.reservations" :key="detail.id">
                                    <b><p>Desde: </p>{{ detail.start_date }}</b>
                                    <b><p>Hasta: </p>{{ detail.finish_date }}</b>
                                    <b><p>Monto total: </p>{{ detail.total_price }}</b>
                                    <hr>
                                </li>
                            </ul>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
                <form @submit.prevent="putGuest" v-if="form">
                    <label for="name">Nombre</label>
                    <input type="text" name="name" id="name" v-model="name" class="form-control" required>
                    <label for="last_name">Apellido</label>
                    <input type="text" name="last_name" id="last_name" v-model="last_name" class="form-control" required>
                    <label for="ci">Cédula</label>
                    <input type="text" name="ci" id="ci" v-model="ci" class="form-control" required>
                    <label for="age">Edad</label>
                    <input type="text" name="age" id="age" v-model="age" class="form-control" required>
                    <label for="number_phone">Número de télefono</label>
                    <input type="number" name="number_phone" id="number_phone" v-model="number_phone" class="form-control" required>
                    <label for="address">Dirección</label>
                    <input type="text" name="address" id="address" v-model="address" class="form-control" required>
                    <button class="btn center-align green" v-if="form">Guardar</button>
                </form>
                <md-table v-else>
                    <md-table-row>
                        <md-table-head md-numeric>ID</md-table-head>
                        <md-table-head>Nombre</md-table-head>
                        <md-table-head>Apellido</md-table-head>
                        <md-table-head>Cédula</md-table-head>
                        <md-table-head>Télefono</md-table-head>
                        <md-table-head>N° Habitaciones reservadas</md-table-head>
                        <md-table-head>Acciones</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(guest, index) in guests.data" :key="index">
                        <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
                        <md-table-cell>{{ guest.name }}</md-table-cell>
                        <md-table-cell>{{ guest.last_name }}</md-table-cell>
                        <md-table-cell>{{ guest.ci }}</md-table-cell>
                        <md-table-cell>{{ guest.number_phone }}</md-table-cell>
                        <md-table-cell>{{ guest.total_reservations }}</md-table-cell>
                        <md-table-cell>
                            <button class="btn btn-small" @click="showData(index)">Detalles</button>
                            <button class="btn btn-small blue" @click="editGuest(index)">Editar</button>
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
            guests: [],
            form: false,
            id: 0,
            number_phone: "",
            address: "",
            age: "",
            name: "",
            last_name: "",
            ci: "",
            user_id: 0,
            showDetails: 0
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
        async putGuest() {
            try {
                let token = auth.getCredential()
                let params = {
                    number_phone: Number(this.number_phone),
                    address: this.address,
                    age: this.age,
                    name: this.name,
                    last_name: this.last_name,
                    ci: this.ci,
                    user_id: this.user_id
                }
                let response = await auth.putGuest(token, params, this.id)
                if (response.data) {
                    this.getGuests()
                    this.redirect()
                    this.deleteData()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        editGuest(index) {
            let data          = this.guests.data[index]
            this.form         = true
            this.id           = data.id
            this.address      = data.address
            this.age          = data.age
            this.name         = data.name
            this.last_name    = data.last_name
            this.ci           = data.ci
            this.number_phone = data.number_phone
            this.user_id      = data.user_id
        },
        redirect() {
            this.form = false
        },
        deleteData() {
            this.id           = ""
            this.address      = ""
            this.age          = ""
            this.name         = ""
            this.last_name    = ""
            this.ci           = ""
            this.number_phone = ""
        },
        showData(index) {
            this.showDetails = this.guests.data[index]
        },
    },
    created() {
        this.getGuests()
    }
}
</script>

<style lang="scss" scoped>

</style>