<template>
  <Spinner v-if="!dataLoaded" />
  <div v-else-if="dataLoaded && !cerpenAuthor">
    <div class="flex justify-center flex-col items-center gap-7 mt-24">
      <h1 class="text-3xl font-semibold">Write your first Cerpen</h1>
      <div v-if="user" class="w-fit px-2 py-1 bg-primary shadow-md shadow-black/10 rounded-md font-bold text-white hover:bg-transparent hover:border-2 border-primary border-2 hover:border-primary hover:text-primary transition-all duration-300">
        <router-link :to="{ name: 'Create-Cerpen' }">Create Cerpens</router-link>
      </div>
    </div>
  </div>
  <div v-else class="container min-h-screen md:px-20 pt-48 pb-20 relative text-black">
    <form @submit.prevent class="w-72 m-auto">
      <div class="relative">
        <Search v-if="search === ''" class="w-4 h-4 absolute z-10 top-0 bottom-0 m-auto text-xs opacity-50 right-3" />
        <Clear @click="clearSearch" v-if="search !== ''" class="w-4 h-4 cursor-pointer absolute z-10 top-0 bottom-0 m-auto text-xs opacity-50 right-3" />
        <input v-on:input="handleChange" v-model.lazy="search" type="text" name="search" id="search" class="w-full hover:bg-gray-50 rounded-lg focus:ring-0 focus:border-textDark border-textDark text-black focus:placeholder-transparent" placeholder="Search Cerpen" />
      </div>
    </form>
    <div class="my-8">
      <h1 class="text-center text-3xl font-bold">Cerpen List</h1>
    </div>
    <div v-if="user" class="absolute top-32 px-2 py-1 right-10 shadow-lg shadow-black/20 bg-primary rounded-md font-bold text-white hover:bg-transparent hover:border-2 border-primary border-2 hover:border-primary hover:text-primary transition-all duration-300">
      <router-link :to="{ name: 'Create-Cerpen' }">Create Cerpens</router-link>
    </div>
    <div class="flex flex-wrap gap-5 relative justify-center md:justify-center">
      <div v-for="(cerpen, index) in filteredData(data)" :key="index">
        <CerpenCard :title="cerpen.title" :date="moment(cerpen.created_at).format('DD MMMM YYYY')" :author="cerpen.author_id.toString()" :id="cerpen.id" :cover="cerpen.cover" :content="cerpen.content" :rating="cerpen.total_rating" :reviews="cerpen.total_reviewer" />
      </div>
    </div>
  </div>
</template>
<script setup>
import moment from 'moment';
import CerpenCard from '../components/CerpenCard.vue';
import Search from '../components/icons/Search.vue';
import Clear from '../components/icons/Clear.vue';
import { ref } from 'vue';
import Spinner from '../utils/Spinner.vue';
import currentUser from '../store/init';
import axios from 'axios';

const dataLoaded = ref(false);
const cerpenAuthor = ref(null);
const data = ref(null);
const user = currentUser();
const search = ref('');
const authorRaw = localStorage.getItem('authorId');
const token = localStorage.getItem('token');
const author_id = parseInt(authorRaw);

const handleChange = (e) => {
  search.value = e.target.value;
};
const clearSearch = () => {
  search.value = '';
};
const filteredData = (content) => {
  return content.filter((item) => {
    let itemUpper = item.title.toUpperCase();
    let searchUpper = search.value.toUpperCase();
    return itemUpper.indexOf(searchUpper) > -1;
  });
};

if (!user) {
  axios
    .get(`${import.meta.env.VITE_APP_BASE_URL}/cerpen`)
    .then((res) => {
      data.value = res.data.data;
      dataLoaded.value = true;
      cerpenAuthor.value = true;
    })
    .catch((err) => console.log(err));
} else {
  axios
    .get(`${import.meta.env.VITE_APP_BASE_URL}/cerpen/author/${author_id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((res) => {
      data.value = res.data.data;
      dataLoaded.value = true;
      cerpenAuthor.value = true;
    })
    .catch((err) => {
      console.log(err);
      dataLoaded.value = true;
      cerpenAuthor.value = null;
    });
}
</script>
