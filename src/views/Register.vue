<template>
  <div class="register">
    <h2 class="title">Sign Up</h2>
    <form action class="form" @submit.prevent="register">
      <label class="form-label" for="#name">Nombre:</label>
      <input
        v-model="name"
        class="form-input"
        type="name"
        id="name"
        required
        placeholder="name"
      >
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      >
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      >
      <label class="form-label" for="#c_password">Repite la contraeña:</label>
      <input
        v-model="c_password"
        class="form-input"
        type="password"
        id="c_password"
        placeholder="Password"
      >
      <input class="form-submit" type="submit" value="Sign Up">
    </form>
  </div>
</template>

<script>
import auth from "@/logic/auth";
export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    c_password: "",
    error: false
  }),
  methods: {
    async register() {
      try {
        const user = {  
          name: this.name, 
          email: this.email, 
          password: this.password, 
          c_password: this.c_password
        }
        let response = await auth.register(user);
        let data = response.data
        const credential = {
          token_type: data.token_type,
          expires_at: data.expires_at,
          access_token: data.access_token
        };
        auth.setCredential(credential)
        this.setValue()
      } catch (error) {
        console.log(error);
      }
    },
    async setValue() {
      try {
        let token = auth.getCredential()
        let response = await auth.getDataUser(token)
        auth.setUserLogged(response.data)
        setTimeout(() => { 
          window.location.href = "/"
        }, 1000)
      } catch (error) {
        console.log(error);
        this.error = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0b9185;
  }
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
</style>