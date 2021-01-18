<template>
    <div class="padding">
        <div class="row">
            <div class="col m12 s12 mt">
                <h3 class="center-align" > ¡ Huéspedes ! Total: {{ guests.total_guests }}</h3>
                <a class="btn-floating btn-large waves-effect waves-light green">
                    <i class="material-icons">add</i>
                </a>
                <md-table>
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
            guests: []
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
        }
    },
    created() {
        this.getGuests()
    }
}
</script>

<style lang="scss" scoped>

</style>