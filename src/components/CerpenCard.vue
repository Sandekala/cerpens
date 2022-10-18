<template>
  <div class="md:h-[600px]">
    <div class="max-w-xs p-5 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 group hover:z-10 hover:scale-105 transition-all duration-300">
      <router-link :to="{ name: 'Read-Cerpen', params: { cerpenId: id } }">
        <img class="rounded-lg min-h-[280px] group-hover:mb-9 group-hover:scale-125 transition-all duration-300" :src="cover" alt="" />
        <div>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">{{ title }}</h5>
          <table>
            <tr>
              <td>Author ID</td>
              <td>&nbsp;:&nbsp;</td>
              <td>
                <span class="font-bold">{{ author }}</span>
              </td>
            </tr>
            <tr>
              <td>Relase Date</td>
              <td>&nbsp;:&nbsp;</td>
              <td>{{ date }}</td>
            </tr>
          </table>
          <span class="w-full h-[1px] bg-textDark block rounded-full my-2"></span>
          <p class="mb-3 font-normal text-gray-700 text-justify dark:text-gray-400 line-clamp-3">{{ content }}</p>
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
defineProps(['title', 'date', 'id', 'cover', 'author', 'content']);

const handleDelete = (id) => {
  const confirm = window.confirm('Are you sure want to Delete this Cerpen?');
  if (confirm) {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/cerpen/${id}`)
      .then((res) => {
        window.alert('Cerpens Deleted!');
        window.location.href = '/cerpen';
      })
      .catch((err) => console.log(err));
  }
};
</script>
