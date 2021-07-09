<template>
  <div
    class="container h-100 bg-main d-flex flex-column justify-content-center align-items-center"
  >
    <div class="login-box p-3">
      <h4>sign up</h4>
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
      <button @click="signUp" type="button" class="btn btn-block bg-success">
        submit
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
    async signUp() {
      try {
        const { data } = await api.post("/user/signup", {
          username: this.username,
          password: this.password
        });
        localStorage.setItem("token", data);
        this.$router.push("/");
      } catch (err) {
        alert("error");
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
