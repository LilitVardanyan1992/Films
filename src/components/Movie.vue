<template lang="">
  <div class="movie">
    <img
      :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
      :alt="movie.original_title"
      class="movie-img"
    />
    <div class="movie-name">
      {{movie.original_title}} ({{movie.release_date}})
    </div>
    <span class="movie-overview">{{movie.overview}}</span>
    <div>
      <div v-if="isSearch === false" class="div movie-buttons">
        <button
          class="btn movie-buttons-watched"
          @click="movieStore.setIsWatched(movie.id)"
        >
          <span v-if="!movie.isWatched">Watched</span>
          <span v-else="movie.isWatched">Unwatched</span>
        </button>
        <button
          class="btn movie-buttons-delete"
          @click="movieStore.deleteMovie(movie.id)"
        >
          Delete
        </button>
      </div>
      <div v-else="isSearch">
        <button class="btn btn_green" @click="addMovie(movie)">Add</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useSearchStore} from "../stores/SearchStore"
import {useMovieStore} from "../stores/MovieStore"
const searchStore = useSearchStore()
const movieStore = useMovieStore()

const props = defineProps({
    movie: {
        type: Object,
        required: true,
        default: () => {}
    },
    isSearch: {
      type: Boolean,
      required: false,
      default: false
    }
})

function addMovie(movie) {
  searchStore.addTpoUserMovies(movie)
}
</script>

<style lang="css">
    .movie {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 30px;
  margin-bottom: 20px;
  border: 2px solid #efefef;
  padding: 10px;
  border-radius: 10px;
}

.movie-accept {
  margin-right: 10px;
}

.movie-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

.movie-name {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 20px;
}

.movie-overview {
  display: block;
  margin-bottom: 20px;
}

.movie-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.movie-buttons-watched {
  color: #fff;
  background: #1eb4c3;
}

.movie-buttons-watched__icon {
  width: 15px;
  margin-left: 10px;
}

.movie-buttons-delete {
  color: #fff;
  background: #ff2a2a;
}
</style>
