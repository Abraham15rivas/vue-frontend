<template>
    <div class="padding">
        <div class="row">
            <div class="col m12 s12 mt text-center">
                <h3 class="center-align" > ¡ Hoteles ! Total: {{ hotels.total_hotels }}</h3>
                <a class="btn-floating btn-large waves-effect waves-light green">
                    <i class="material-icons">add</i>
                </a>
                <md-table>
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
                            <button class="btn btn-small">Detalles</button>
                            <button class="btn btn-small blue">Editar</button>
                            <button class="btn btn-small red">Eliminar</button>
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
            hotels: []
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
        }
    },
    created() {
        this.getHotels()
    }
}
</script>

<style lang="scss" scoped>

</style>