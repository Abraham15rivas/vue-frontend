<template>
    <div class="padding">
        <div class="row">
            <div class="col m12 s12 mt">
                <h3 class="center-align"> ¡ Reservaciones ! Total {{ reservations.total_reservations }}</h3>
                <a class="btn-floating btn-large waves-effect waves-light green">
                    <i class="material-icons">add</i>
                </a>
                <md-table>
                    <md-table-row>
                        <md-table-head md-numeric>ID</md-table-head>
                        <md-table-head>Nombre</md-table-head>
                        <md-table-head>Cédula</md-table-head>
                        <md-table-head>Status</md-table-head>
                        <md-table-head>Fechas</md-table-head>
                        <md-table-head>N° Habitaciones reservadas</md-table-head>
                        <md-table-head>N° Precio</md-table-head>
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
                        <md-table-cell>{{ reservation.total_price }}</md-table-cell>
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
            reservations: []
        }
    },
    methods: {
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
        }
    },
    created() {
        this.getReservations()
    }
}
</script>

<style lang="scss" scoped>

</style>