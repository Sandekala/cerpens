<template>
  <div class="container">
    <div v-if="dataUserLoad" class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <h1 class="font-bold">Table User</h1>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">User Name</th>
            <th scope="col" class="py-3 px-6">User ID</th>
            <th scope="col" class="py-3 px-6">Email</th>
            <th scope="col" class="py-3 px-6">Created_At</th>
            <th scope="col" class="py-3 px-6">Is_Admin</th>
            <th scope="col" class="py-3 px-6">
              <span class="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in dataUser" :key="user.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ user.name }}</th>
            <td class="py-4 px-6">{{ user.id }}</td>
            <td class="py-4 px-6">{{ user.email }}</td>
            <td class="py-4 px-6">{{ moment(user.created_at).format('DD MMMM YYYY') }}</td>
            <td class="py-4 px-6">{{ user.is_admin }}</td>
            <td class="py-4 px-6 text-right">
              <span @click="deleteUser(user.id)" class="font-medium cursor-pointer text-primary dark:text-blue-500 hover:underline">Delete User!</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="dataCerpenLoad" class="overflow-x-auto mt-20 relative shadow-md sm:rounded-lg">
      <h1 class="font-bold">Table Cerpens</h1>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">Title</th>
            <th scope="col" class="py-3 px-6">Author ID</th>
            <th scope="col" class="py-3 px-6">Content</th>
            <th scope="col" class="py-3 px-6">Created_At</th>
            <th scope="col" class="py-3 px-6">
              <span class="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cerpen in dataCerpens" :key="cerpen.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ cerpen.title }}</th>
            <td class="py-4 px-6">{{ cerpen.author_id }}</td>
            <td class="py-4 px-6 max-w-lg text-justify">{{ cerpen.content }}</td>
            <td class="py-4 px-6">{{ moment(cerpen.created_at).format('DD MMMM YYYY') }}</td>
            <td class="py-4 px-6 text-right">
              <span @click="deleteCerpen(cerpen.id)" class="font-medium cursor-pointer text-primary dark:text-blue-500 hover:underline">Delete User!</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import moment from 'moment';

const dataUser = ref(null);
const dataCerpens = ref(null);
const dataUserLoad = ref(null);
const dataCerpenLoad = ref(null);

const admin = localStorage.getItem('admin');
if (!admin) {
  window.location.href = '/login';
}

const deleteUser = (id) => {
  const confirm = window.confirm('Are you sure want to Delete this User?');
  if (confirm) {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/user/${id}`)
      .then((res) => {
        window.alert('User Deleted!');
        window.location.href = '/dashboard';
      })
      .catch((err) => console.log(err));
  }
};
const deleteCerpen = (id) => {
  const confirm = window.confirm('Are you sure want to Delete this Cerpen?');
  if (confirm) {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/cerpen/${id}`)
      .then((res) => {
        window.alert('Cerpen Deleted!');
        window.location.href = '/dashboard';
      })
      .catch((err) => console.log(err));
  }
};

axios
  .get(`${import.meta.env.VITE_APP_BASE_URL}/user`)
  .then((res) => {
    dataUser.value = res.data.data;
    dataUserLoad.value = true;
  })
  .catch((err) => console.log(err));
axios
  .get(`${import.meta.env.VITE_APP_BASE_URL}/cerpen`)
  .then((res) => {
    dataCerpens.value = res.data.data;
    dataCerpenLoad.value = true;
  })
  .catch((err) => console.log(err));
</script>
