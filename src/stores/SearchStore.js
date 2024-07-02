import { defineStore } from "pinia";
import { ref } from "vue";
import { useMovieStore } from "./MovieStore";

const apiKey = import.meta.env.VITE_API_KEY;
const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

// "https://api.themoviedb.org/3/search/movie?api_key=8a299b47d51d72ae577c8b1f709b0d93&query=";

export const useSearchStore = defineStore("searchStore", () => {
  const loader = ref(false);
  const movies = ref([]);

  const getMovies = async (search) => {
    console.log("getMovies called with:", search); // Отладочное сообщение
    loader.value = true;
    try {
      const res = await fetch(`${url}${search}`);
      const data = await res.json();
      console.log("Data received:", data); // Отладочное сообщение
      movies.value = data.results || [];
      console.log("Movies updated:", movies.value); // Отладочное сообщение
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      loader.value = false;
    }
  };

  const addTpoUserMovies = (object) => {
    const movieStore = useMovieStore();
    movieStore.movies.push({ ...object, isWatched: false });
    movieStore.activeTab = 1;
  };

  return {
    loader,
    movies,
    getMovies,
    addTpoUserMovies,
    getMovies,
  };
});
