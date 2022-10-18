<template>
  <div>
    <Spinner v-if="!dataLoaded" />
    <div v-else class="container min-h-screen md:px-20">
      <h1 class="text-4xl text-center font-bold my-10">{{ data.title }}</h1>
      <img :src="data.cover" alt="coverBook" class="w-full" />
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
        </table>
      </div>
      <div class="w-full">
        <p class="text-justify indent-16">{{ data.content }}</p>
      </div>
      <div class="bg-white h-28 flex items-center justify-end">
        <span>
          <router-link class="bg-primary rounded-lg py-1 px-3 text-white font-bold" :to="{ name: 'CerpenList' }">Finish Read</router-link>
        </span>
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

const route = useRoute();
const data = ref(null);
const dataLoaded = ref(false);
const currentId = route.params.cerpenId;

axios
  .get(`${import.meta.env.VITE_APP_BASE_URL}/cerpen/${currentId}`)
  .then((res) => {
    data.value = res.data.data;
    dataLoaded.value = true;
  })
  .catch((err) => console.log(err));
</script>
