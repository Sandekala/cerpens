<template>
  <div class="container">
    <h3 class="text-xl font-bold mb-10">Search result from "{{ query }}"</h3>
    <div v-if="!data" class="text-center mt-52">
      <h3 class="text-2xl">No result...</h3>
    </div>
    <div v-else v-for="(cerpen, index) in data" :key="index">
      <CerpenCard :title="cerpen.title" :date="moment(cerpen.created_at).format('DD MMMM YYYY')" :author="cerpen.author" :id="cerpen.id" :cover="cerpen.cover" :content="cerpen.content" :rating="cerpen.total_rating" :reviews="cerpen.total_reviewer" />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import moment from 'moment';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import CerpenCard from '../components/CerpenCard.vue';

const route = useRoute();
const router = useRouter();
const query = route.query.name;
const dataLoaded = ref(false);
const data = ref(null);

axios
  .get(`${import.meta.env.VITE_APP_BASE_URL}/search?name=${query}`)
  .then((res) => {
    dataLoaded.value = true;
    data.value = res.data.data;
  })
  .catch((err) => console.log(err));

  watch(query, async () => {
    router.go()
})
</script>
