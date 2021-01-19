<template>
  <body :class="{ 'has-fixed-sidenav': userLogged }">
    <div id="app">
      <span v-if="userLogged">
        <header-admin v-if="user.role_id === 1"></header-admin>
        <header-client v-if="user.role_id === 2"></header-client>      
      </span>
      <transition>       
        <router-view></router-view>
      </transition>        
    </div>
  </body>
</template>

<script>
import HeaderAdmin from '@/components/header/HeaderAdmin.vue'
import HeaderClient from '@/components/header/HeaderClient.vue'
import auth from "@/logic/auth";
export default {
  data () {
    return {
      user: {}
    }
  },
  components: {
    HeaderAdmin,
    HeaderClient
  },
  computed: {
    userLogged () {
      return auth.getUserLogged()
    }
  },
  mounted () {
    this.user = auth.getUserLogged() != undefined ? JSON.parse(auth.getUserLogged()) : false
    if (this.user) {
      if (this.$route.path == '/login' || this.$route.path == '/register') {
        this.$router.push('/')
      }
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  @media (min-width: 993px) {
    body.has-fixed-sidenav {
        padding-left: 300px;
    }
  }
  .v-enter-active, .fade-leave-active { transition: opacity 2.5s }
  .v-enter, .v-leave-to{ opacity: 0 }        
</style>