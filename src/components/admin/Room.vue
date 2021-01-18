<template>
    <div class="padding">
        <div class="row">
            <div class="col m12 s12 mt">
                <h3 class="center-align" > ¡ Habitaciones ! Total: {{ rooms.total_rooms }} </h3>
                <a class="btn-floating btn-large waves-effect waves-light green">
                    <i class="material-icons">add</i>
                </a>
                <md-table>
                    <md-table-row>
                        <md-table-head md-numeric>ID</md-table-head>
                        <md-table-head>Código</md-table-head>
                        <md-table-head>Status</md-table-head>
                        <md-table-head>Tipo</md-table-head>
                        <md-table-head>Acciones</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(room, index) in rooms.data" :key="index">
                        <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
                        <md-table-cell>{{ room.code }}</md-table-cell>
                        <md-table-cell>{{ room.status }}</md-table-cell>
                        <md-table-cell>{{ room.room_type.titulo }}</md-table-cell>
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
            rooms: []
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
        }
    },
    created() {
        this.getRooms()
    }
}
</script>

<style lang="scss" scoped>

</style>