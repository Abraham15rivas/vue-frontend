<template>
    <div class="padding">
        <div class="row">
            <div class="col m12 s12 mt">
                <h3 class="center-align" > ¡ Tipo de Habitaciones ! Total: {{ type_rooms.total_type_rooms }}</h3>
                <a class="btn-floating btn-large waves-effect waves-light green" @click="form = !form">
                    <i class="material-icons">add</i>
                </a>
                <div v-if="form">
                    <form @submit.prevent="setTypeRoom">
                        <label for="titulo">Titulo</label>
                        <input type="text" name="titulo" id="titulo" v-model="titulo" class="form-control" required>
                        <label for="price_day">Precio diario</label>
                        <input type="number" name="price_day" id="price_day" v-model="price_day" class="form-control" required>
                        <label for="description">Descripcción</label>
                        <input type="text" name="description" id="description" v-model="description" class="form-control" required>
                        <button class="btn center-align green" v-if="form && !edit">Enviar</button>
                    </form>
                    <button type="buttton" class="btn center-align green" v-if="edit" @click="putTypeRoom">Guardar</button>
                </div>
                <md-table v-else>
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
                            <button class="btn btn-small blue" @click="editTypeRoom(index)">Editar</button>
                            <button class="btn btn-small red" @click="delTypeRoom(type_room.id)">Eliminar</button>
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
            type_rooms: [],
            form: false,
            edit: false,
            id: 0,
            titulo: "",
            price_day: "",
            description: ""
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
        },
        async setTypeRoom() {
            try {
                let token = auth.getCredential()
                let params = {
                    titulo: this.titulo,
                    price_day: Number(this.price_day),
                    description: this.description,
                }
                let response = await auth.setTypeRoom(token, params)
                if (response.data) {
                    this.getTypeRooms()
                    this.redirect()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async putTypeRoom() {
            try {
                let token = auth.getCredential()
                let params = {
                    titulo: this.titulo,
                    price_day: Number(this.price_day),
                    description: this.description,
                }
                let response = await auth.putTypeRoom(token, params, this.id)
                if (response.data) {
                    this.getTypeRooms()
                    this.redirect()
                    this.deleteData()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async delTypeRoom(id) {
            try {
                let token = auth.getCredential()
                let response = await auth.delTypeRoom(token, id)
                if (response.data) {
                    this.getTypeRooms()
                    this.redirect()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        editTypeRoom(index) {
            let data = this.type_rooms.data[index]
            this.edit = true
            this.form = true
            this.id = data.id
            this.titulo = data.titulo,
            this.price_day = data.price_day
            this.description = data.description
        },
        redirect() {
            this.form = false
        },
        deleteData() {
            this.id = ""
            this.titulo = "",
            this.price_day = ""
            this.description = ""
            this.edit = false
        }
    },
    created() {
        this.getTypeRooms()
    }
}
</script>

<style lang="scss" scoped>

</style>