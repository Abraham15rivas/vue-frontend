<template>
    <div class="padding">
        <div class="row">
            <div class="col m12 s12 mt">
                <h3 class="center-align" > ¡ Adios ... hasta luego ! </h3>
            </div>
        </div>
    </div>
</template>
<script>
import auth from "@/logic/auth";
export default {
    mounted () {
        auth.logout()
        auth.deleteUserLogged();
        auth.deleteCredential();
        window.location.href = "/login"
    },
    methods: {
        async logout () {
            try {
                let response = await auth.logout()
                if (response.data) {
                    console.log(response.data)
                }
            } catch (error) {
                console.log('Fallo', error)
            }
        }
    }
}
</script>