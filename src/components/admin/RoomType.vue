<template>
    <div class="padding">
        <div class="row">
            <div class="col m12 s12 mt">
                <h3 class="center-align" > ¡ Tipo de Habitaciones ! Total: {{ type_rooms.total_type_rooms }}</h3>
                <a class="btn-floating btn-large waves-effect waves-light green">
                    <i class="material-icons">add</i>
                </a>
                <md-table>
                    <md-table-row>
                        <md-table-head md-numeric>ID</md-table-head>
                        <md-table-head>titulo</md-table-head>
                        <md-table-head>Descripcción</md-table-head>
                        <md-table-head>Precio x día</md-table-head>
                        <md-table-head>N° habitaciones registradas</md-table-head>
                        <md-table-head>Acciones</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(type_room, index) in type_rooms.data" :key="index">
                        <md-table-cell md-numeric>{{ index + 1 }}</md-table-cell>
                        <md-table-cell>{{ type_room.titulo }}</md-table-cell>
                        <md-table-cell>{{ type_room.description }}</md-table-cell>
                        <md-table-cell>{{ type_room.price_day }}</md-table-cell>
                        <md-table-cell>{{ type_room.total_rooms }}</md-table-cell>
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
            type_rooms: []
        }
    },
    methods: {
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
        }
    },
    created() {
        this.getTypeRooms()
    }
}
</script>

<style lang="scss" scoped>

</style>