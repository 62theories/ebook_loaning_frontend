<template>
  <div class="container h-100 bg-main d-flex flex-column">
    <div>
      <div id="nav">
        <router-link to="/">หนังสือทั้งหมด</router-link> |
        <router-link to="/mylend">การจองของฉัน</router-link>
      </div>
    </div>
    <div v-if="!isLoading" class="d-flex flex-column align-items-center">
      <div>ชื่อหนังสือ: {{ name }}</div>
      <div v-if="!didLend" class="lend-box bg-second p-3">
        <div class="form-group">
          <label>ระยะเวลา (นาที)</label>
          <input
            v-model="minute"
            type="number"
            class="form-control"
            placeholder="ระยะเวลา (นาที)"
          />
        </div>
        <button @click="lend" type="button" class="btn btn-success btn-block">
          ยืม
        </button>
      </div>
      <div v-else>
        ยืมอยู่แล้ว
      </div>
    </div>
    <div v-else>
      loading
    </div>
  </div>
</template>

<script>
import api from "../common/api";
export default {
  data: function() {
    return {
      name: "",
      minute: 1,
      didLend: true,
      isLoading: true
    };
  },
  async created() {
    try {
      await api.post(`/lend/${this.$route.params.bookId}/didlend`, {
        userId: localStorage.getItem("token")
      });
      this.didLend = true;
    } catch (err) {
      this.didLend = false;
    }
    const {
      data: { name }
    } = await api.get(`/book/${this.$route.params.bookId}`);
    this.name = name;
    this.isLoading = false;
  },
  methods: {
    async lend() {
      if (!this.isLoading) {
        try {
          this.isLoading = true;
          await api.post("/lend", {
            userId: localStorage.getItem("token"),
            bookId: this.$route.params.bookId,
            minute: this.minute
          });
          this.$router.push("/mylend");
        } catch (err) {
          alert("err");
        }
      }
    }
  }
};
</script>

<style scoped>
.lend-box {
  width: 300px;
}
</style>
