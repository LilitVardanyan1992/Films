<template>
  <div>
    <form @submit.prevent="searchStore.getMovies(searchMovie)">
      <input
        type="text"
        class="search-input"
        placeholder="input movie"
        v-model="searchMovie"
      />
    </form>
    <Loader v-if="searchStore.loader" />
    <!-- Display results -->
    <div v-else>
      <Movie
        v-for="movie in searchStore.movies"
        :key="movie.id"
        :movie="movie"
        :isSearch="true"
      />
    </div>
  </div>
</template>

<script setup>
import Loader from "./Loader.vue"
import Movie from "./Movie.vue"
import { ref } from "vue";
import { useSearchStore } from "../stores/SearchStore";

const searchStore = useSearchStore();
console.log(searchStore.movies, "searchStoresearchStoresearchStore");
const searchMovie = ref("");
</script>

<style scoped>
.search-input {
  border: 1px solid green;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>
