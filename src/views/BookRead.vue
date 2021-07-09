<template>
  <div class="container mh-100 bg-main d-flex flex-column">
    <div>
      <div id="nav">
        <router-link to="/">หนังสือทั้งหมด</router-link> |
        <router-link to="/mylend">การจองของฉัน</router-link>
      </div>
    </div>
    <div v-if="pdfUrl" class="pdf">
      <div class="d-flex justify-content-between">
        <button @click="toPage(currentPage - 1)">-1</button>
        <div>{{ currentPage }} / {{ pageCount }}</div>
        <button @click="toPage(currentPage + 1)">+1</button>
      </div>
      <pdf :src="pdfUrl" :page="currentPage" @num-pages="pageCount = $event" />
      <!-- <embed width="100%" height="100%" :src="pdfUrl" /> -->
    </div>
  </div>
</template>

<script>
import api from "../common/api";
import pdf from "vue-pdf";
export default {
  data() {
    return {
      pdfUrl: null,
      currentPage: 1,
      pageCount: 0,
      numPages: undefined
    };
  },
  components: {
    pdf
  },
  async created() {
    try {
      const { data } = await api.post(
        `/lend/${this.$route.params.lendId}/getfile`,
        {
          userId: localStorage.getItem("token")
        },
        {
          responseType: "blob"
        }
      );
      const blob = new Blob([data], { type: "application/pdf" });
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.pdfUrl = `${reader.result}`;
      };
    } catch (err) {
      alert("error");
    }
  },
  methods: {
    toPage(num) {
      if (num >= 1 && num <= this.pageCount) {
        this.currentPage = num;
      }
    }
  }
};
</script>

<style scoped>
.pdf {
  flex-grow: 1;
  padding: 15px;
  /* padding: 15px; */
}
.mh-100 {
  min-height: 100vh;
}
</style>
