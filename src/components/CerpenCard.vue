<template>
  <div class="md:h-[320px]">
    <div class="max-w-[250px] min-h-[320px] p-5 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 group hover:z-10 hover:scale-105 transition-all duration-300">
      <router-link :to="{ name: 'Read-Cerpen', params: { cerpenId: id } }">
        <img class="rounded-lg w-full h-[100px] transition-all duration-300" :src="cover" alt="" />
        <div class="readCerpen">
          <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">{{ title }}</h5>
          <table class="text-xs">
            <tr>
              <td>Author ID</td>
              <td>&nbsp;:&nbsp;</td>
              <td>
                <span class="font-semibold">{{ author }}</span>
              </td>
            </tr>
            <tr>
              <td>Relase Date</td>
              <td>&nbsp;:&nbsp;</td>
              <td>{{ date }}</td>
            </tr>
          </table>
          <span class="w-full h-[1px] bg-textDark block rounded-full my-2"></span>
          <p class="mb-3 font-normal text-gray-700 text-justify dark:text-gray-400 line-clamp-3 text-xs">{{ content }}</p>

          <div v-if="reviews != 0" class="flex items-center">
            <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Rating star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">{{ rating }}</p>
            <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <p class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{{ reviews }} reviews</p>
          </div>
        </div>
      </router-link>
      <div v-if="user" class="text-end">
        <router-link :to="{ name: 'Edit-Cerpen', params: { cerpenId: id } }" class="text-primary mr-3">Edit</router-link>
        <button @click="handleDelete(id)" class="text-red-500">Delete</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import currentUser from '../store/init';

const user = currentUser();
const token = localStorage.getItem('token');
defineProps(['title', 'date', 'id', 'cover', 'author', 'content', 'rating', 'reviews']);

const handleDelete = (id) => {
  const confirm = window.confirm('Are you sure want to Delete this Cerpen?');
  if (confirm) {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/cerpen/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        window.alert('Cerpens Deleted!');
        window.location.href = '/cerpen';
      })
      .catch((err) => console.log(err));
  }
};
</script>
