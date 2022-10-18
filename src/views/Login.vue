<template>
  <div class="container h-screen flex items-center">
    <div class="border-[3px] border-primary rounded-md relative w-[450px] m-auto py-16 px-16">
      <div class="w-1/2 bg-primary rounded-md py-4 px-3 font-bold text-xl text-white text-center absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Login</div>
      <form @submit.prevent="login" id="login" class="flex flex-col gap-3">
        <div class="relative">
          <input v-model="field.email" type="email" id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
          <label for="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
        </div>
        <div class="relative">
          <input v-model="field.password" type="password" id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
          <label for="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
        </div>
        <div class="my-3">
          <!-- Error Handling -->
          <div v-if="errMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
            <p class="text-red-500">{{ errMsg }}</p>
          </div>
          <p>
            Don't have an account? <span class="text-primary hover:underline"><router-link :to="{ name: 'Register' }">Sign Up!</router-link></span>
          </p>
        </div>
        <button type="submit" class="bg-primary rounded-md font-bold text-white h-9 hover:bg-transparent hover:border-2 hover:border-primary hover:text-primary transition-all duration-300">Login</button>
        <button @click="loginAdmin" type="button" class="bg-primary rounded-md font-bold text-white h-9 hover:bg-transparent hover:border-2 hover:border-primary hover:text-primary transition-all duration-300">Login As Admin</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import currentUser from '../store/init';
import axios from 'axios';

const user = currentUser();
if (user) {
  window.location.href = '/cerpen';
}

const field = ref({
  email: '',
  password: '',
});
const errMsg = ref(null);

const login = () => {
  axios
    .post(`${import.meta.env.VITE_APP_BASE_URL}/login`, field.value)
    .then((res) => {
      console.log(res);
      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('name', res.data.data.name);
      localStorage.setItem('authorId', res.data.data.id);

      window.location.href = '/cerpen';
    })
    .catch((err) => {
      console.log(err);

      errMsg.value = 'Username or password is incorrect!';
      setTimeout(() => {
        errMsg.value = null;
      }, 3000);
    });
};
const loginAdmin = () => {
  axios
    .post(`${import.meta.env.VITE_APP_BASE_URL}/loginAdmin`, field.value)
    .then((res) => {
      console.log(res);
      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('name', res.data.data.name);
      localStorage.setItem('authorId', res.data.data.id);
      localStorage.setItem('admin', res.data.data.is_admin);
      window.location.href = '/dashboard';
    })
    .catch((err) => {
      console.log(err);
      errMsg.value = "You aren't Admin";
      setTimeout(() => {
        errMsg.value = null;
      }, 3000);
    });
};
</script>
