<template>
  <div
    class="container h-100 bg-main d-flex flex-column justify-content-center align-items-center"
  >
    <div class="login-box p-3">
      <h4>please login</h4>
      <div class="form-group">
        <input
          v-model="username"
          type="text"
          class="form-control"
          placeholder="username"
        />
      </div>
      <div class="form-group">
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="password"
        />
      </div>
      <button @click="login" type="button" class="btn btn-block bg-success">
        login
      </button>
      <button
        type="button"
        class="btn btn-block bg-second"
        @click="$router.push('/signup')"
      >
        sign up
      </button>
    </div>
  </div>
</template>

<script>
import api from "../common/api";

export default {
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        const { data } = await api.post("/user/login", {
          username: this.username,
          password: this.password
        });
        localStorage.setItem("token", data);
        this.$router.push("/");
      } catch (err) {
        alert("err");
      }
    }
  }
};
</script>

<style scoped>
.login-box {
  width: 300px;
  border: 1px solid #bb8760;
}
</style>
