<template>
  <div>
    <Spinner v-if="!dataLoaded" />
    <div v-else class="container min-h-screen md:px-20">
      <h1 class="text-4xl text-center font-bold my-1">{{ data.title }}</h1>
      <img :src="data.cover" alt="coverBook" class="w-full h-96" />
      <div class="mb-10">
        <table>
          <tr>
            <td>Author</td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              <span class="font-bold">{{ data.author_id }}</span>
            </td>
          </tr>
          <tr>
            <td>Relase Date</td>
            <td>&nbsp;:&nbsp;</td>
            <td>{{ moment(data.created_at).format('DD MMMM YYYY') }}</td>
          </tr>
          <tr>
            <td>Rating</td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              <div class="flex items-center">
                <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Rating star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">{{ data.total_rating }}</p>
                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <p class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{{ data.total_reviewer }} reviews</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="w-full">
        <p class="text-justify indent-16">{{ data.content }}</p>
      </div>
      <div class="bg-white h-28 flex items-center justify-end">
        <router-link v-if="user" :to="{ name: 'CerpenList' }" class="bg-primary rounded-lg py-1 px-3 cursor-pointer text-white font-bold hover:bg-transparent hover:border-2 hover:border-primary border-primary border-2 hover:text-primary transition-all duration-300">Finish Read</router-link>
        <!-- The button to open modal -->
        <label v-else for="my-modal-3" class="bg-primary rounded-lg py-1 px-3 cursor-pointer text-white font-bold hover:bg-transparent hover:border-2 hover:border-primary border-primary border-2 hover:text-primary transition-all duration-300">Finish Read</label>

        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal" data-theme="light">
          <div class="modal-box relative">
            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="text-lg font-bold">Feedback</h3>
            <form @submit.prevent="handleRating">
              <p class="py-4">Your feedback mean a lot for Author!</p>
              <div class="rating">
                <input type="radio" name="rating-1" class="mask mask-star checked:text-yellow-400 bg-yellow-400 checked:bg-none" value="1" v-model="field.rating" />
                <input type="radio" name="rating-1" class="mask mask-star checked:text-yellow-400 bg-yellow-400 checked:bg-none" value="2" v-model="field.rating" />
                <input type="radio" name="rating-1" class="mask mask-star checked:text-yellow-400 bg-yellow-400 checked:bg-none" value="3" v-model="field.rating" />
                <input type="radio" name="rating-1" class="mask mask-star checked:text-yellow-400 bg-yellow-400 checked:bg-none" value="4" v-model="field.rating" />
                <input type="radio" name="rating-1" class="mask mask-star checked:text-yellow-400 bg-yellow-400 checked:bg-none" value="5" v-model="field.rating" checked />
              </div>
              <div>
                <input required type="text" name="name" id="name" placeholder="Input your name..." class="rounded-xl focus:ring-0" v-model="field.name" />
              </div>
              <div class="modal-action">
                <router-link class="h-fit my-auto hover:text-primary transition-all duration-300" :to="{ name: 'CerpenList' }">No Thank's!</router-link>
                <button type="submit" class="bg-primary rounded-lg py-1 px-3 text-white font-bold hover:bg-transparent hover:border-2 hover:border-primary border-primary border-2 hover:text-primary transition-all duration-300">Send Feedback</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Spinner from '../utils/Spinner.vue';
import axios from 'axios';
import moment from 'moment';
import currentUser from '../store/init';

const user = currentUser();

const route = useRoute();
const data = ref(null);
const dataLoaded = ref(false);
const currentId = route.params.cerpenId;
const field = ref({
  rating: '5',
  name: '',
});
const handleRating = () => {
  axios
    .post(`${import.meta.env.VITE_APP_BASE_URL}/rate`, {
      cerpen_id: parseInt(currentId),
      name: field.value.name,
      rating: parseInt(field.value.rating),
    })
    .then((res) => {
      window.location.href = '/cerpen';
      window.location.href = '/cerpen';
    })
    .catch((err) => {
      console.log(err);
    });
};

axios
  .get(`${import.meta.env.VITE_APP_BASE_URL}/cerpen/${currentId}`)
  .then((res) => {
    data.value = res.data.data;
    dataLoaded.value = true;
  })
  .catch((err) => console.log(err));
</script>
