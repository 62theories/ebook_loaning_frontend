<template>
  <div class="container h-100 bg-main d-flex flex-column">
    <div>
      <div id="nav">
        <router-link to="/">หนังสือทั้งหมด</router-link> |
        <router-link to="/mylend">การจองของฉัน</router-link>
      </div>
    </div>
    <div v-if="isLoading">
      loading
    </div>
    <div v-else>
      <div v-if="books.length > 0" class="d-flex mb-3 p-3 flex-wrap">
        <div
          v-for="(book, index) in books"
          :key="`book${index}`"
          class="book mr-3"
          @click="$router.push(`/bookread/${book.lendId}`)"
        >
          {{ book.name }}
        </div>
      </div>
      <div v-else>
        ไม่พบการยืม
      </div>
    </div>
  </div>
</template>

<script>
import api from "../common/api";
export default {
  data: function() {
    return {
      books: [],
      isLoading: false
    };
  },
  async created() {
    try {
      if (!this.isLoading) {
        this.isLoading = true;
        const { data } = await api.post("/lend/mylend", {
          userId: localStorage.getItem("token")
        });
        this.books = data.reduce((acc, cur) => {
          return [...acc, { ...cur.book, lendId: cur.id }];
        }, []);
        this.isLoading = false;
      }
    } catch (err) {
      console.log(err);
      alert("error");
    }
  }
};
</script>

<style scoped>
.book {
  border: 1px solid black;
  height: 150px;
  width: 130px;
  background-color: white;
  overflow: hidden;
  margin-right: 50px;
  margin-top: 20px;
  cursor: pointer;
}

@media all and (max-width: 480px) {
  .book {
    width: 100px;
  }
}
</style>
