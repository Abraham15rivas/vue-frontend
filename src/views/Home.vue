<template>
  <div class="padding">
    <div class="row">
      <div class="col m12 s12 mt">
        <h3 class="center-align" > ¡ Bienvenido al sistema de gestión de hoteles ! </h3>
        <h6 class="center-align" > ¡ {{ userLogged != undefined ? JSON.parse(userLogged).email : ''}} ! </h6>
      </div>
    </div>

    <div class="row">
      <div class="col m12 s12 center-align">
        <img src="../assets/logo3.png" class="imagen-portada center-align" alt="">
      </div>
    </div>   

    <div class="row">
      <div class="col m12 s12 center-align">
        <h6 class="center-align" > API Restfull, Backend: Laravel - Frontend: Vue. <br> <br> @abraham.r.j </h6>
      </div>
    </div>        
  </div>
</template>

<script>
import auth from "@/logic/auth";
export default {
  computed: {
    userLogged () {
      return auth.getUserLogged()
    }
  },
}
</script>

<style scoped>

.mt{
    margin-top: 70px;
    margin-bottom: 100px;
}
.padding{
    padding-left: 50px;
    padding-right: 50px;
    font-family: "Nunito", Times, serif;
}
.imagen-portada{ width: 400px; }
.section-imagen{
    display: flex;
    align-items: center;
    height: 40vh;
}
</style>