<template>
    <div class="padding">
        <div class="row">
            <div class="col m12 s12 mt">
                <h3 class="center-align"> ¡ Mi perfil ! </h3>
                <div class="container">
                    <div class="row">
                        <div class="col m12 s12 mt">
                            <form @submit.prevent="setGuestsCl">
                                <label for="name">Nombre</label>
                                <input type="text" name="name" id="name" v-model="name" class="form-control" required :readonly="val">
                                <label for="last_name">Apellido</label>
                                <input type="text" name="last_name" id="last_name" v-model="last_name" class="form-control" required :readonly="val">
                                <label for="ci">Cédula</label>
                                <input type="text" name="ci" id="ci" v-model="ci" class="form-control" required :readonly="val">
                                <label for="age">Edad</label>
                                <input type="text" name="age" id="age" v-model="age" class="form-control" required :readonly="val">
                                <label for="number_phone">Número de télefono</label>
                                <input type="number" name="number_phone" id="number_phone" v-model="number_phone" class="form-control" required :readonly="val">
                                <label for="address">Dirección</label>
                                <input type="text" name="address" id="address" v-model="address" class="form-control" required :readonly="val">
                                <button class="btn center-align green" v-if="!guests.data">Enviar</button>
                            </form>
                            <div>
                                <button type="buttton" class="btn center-align blue" v-if="guests.data" @click="val = !val">Editar</button>
                                <button type="buttton" class="btn center-align green" v-if="val == false && guests.data" @click="putGuestsCl">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
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
            user: {},
            number_phone: "",
            address: "",
            age: "",
            name: "",
            last_name: "",
            ci: "",
            val: false
        }
    },
    methods: {
        validate(value) {
            if (value) {
                this.address      = value.data.address
                this.age          = value.data.age
                this.name         = value.data.name
                this.last_name    = value.data.last_name
                this.ci           = value.data.ci
                this.number_phone = value.data.number_phone
                this.val = true
            } else {
                this.val = false
            }
        },
        async getGuestsCl() {
            try {
                let token = auth.getCredential()
                this.user =  JSON.parse(auth.getUserLogged())
                let response = await auth.getGuestsCl(token, this.user.id)
                if (response.data) {
                    this.guests = response.data
                    setTimeout(() => this.validate(this.guests) , 1000 )
                }
            } catch (error) {
                console.log(error)
            }
        },
        async setGuestsCl() {
            try {
                let token = auth.getCredential()
                let params = {
                    number_phone: Number(this.number_phone),
                    address: this.address,
                    age: this.age,
                    name: this.name,
                    last_name: this.last_name,
                    ci: this.ci,
                    user_id: this.user.id
                }
                let response = await auth.setGuestsCl(token, params)
                if (response.data) {
                    this.getGuestsCl()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async putGuestsCl() {
            try {
                let token = auth.getCredential()
                let params = {
                    number_phone: Number(this.number_phone),
                    address: this.address,
                    age: this.age,
                    name: this.name,
                    last_name: this.last_name,
                    ci: this.ci,
                }
                let id = this.guests.data.id
                let response = await auth.putGuestsCl(token, params, id)
                if (response.data) {
                    this.getGuestsCl()
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    created() {
        this.getGuestsCl()
    }
}
</script>

<style lang="scss" scoped>

</style>