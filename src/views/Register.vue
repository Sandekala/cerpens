<template>
  <div class="container h-screen flex items-center flex-col">
    <div class="border-[3px] w-[380px] border-primary bg-white rounded-md relative m-auto py-16 px-16">
      <div class="w-1/2 bg-primary rounded-md py-4 px-3 font-bold text-xl text-white text-center absolute -top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Sign Up</div>
      <form @submit.prevent="register" class="flex flex-col gap-3">
        <div class="relative">
          <input v-model="form.email" type="email" id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
          <label for="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
        </div>
        <div class="relative">
          <input v-model="form.name" type="text" id="name" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
          <label for="name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
        </div>
        <div class="relative">
          <input v-model="form.password" type="password" id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
          <label for="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
        </div>
        <div class="relative">
          <input v-model="confirmPass" type="password" id="confirmPass" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
          <label for="confirmPass" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Confirm Password</label>
        </div>
        <div v-if="errMsg" class="p-4 rounded-md bg-light-grey shadow-lg w-full">
          <p class="text-red-500">{{ errMsg }}</p>
        </div>
        <div class="my-3">
          <p>
            Already have an account? <span class="text-primary hover:underline"><router-link :to="{ name: 'Login' }">Login!</router-link></span>
          </p>
        </div>
        <button type="submit" class="bg-primary rounded-md font-bold text-white h-9 hover:bg-transparent hover:border-2 hover:border-primary hover:text-primary transition-all duration-300">Sign Up</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const form = ref({
  email: '',
  name: '',
  password: '',
});
const confirmPass = ref(null);
const errMsg = ref(null);

const register = () => {
  if (form.value.password === confirmPass.value) {
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/register`, form.value)
      .then((res) => {
        window.location.href = '/login';
      })
      .catch((err) => {
        errMsg.value = 'Error: ' + err.response.data.errors;
        setTimeout(() => {
          errMsg.value = null;
        }, 3000);
      });
    return;
  }
  errMsg.value = 'Error: Passwords does not match';
  setTimeout(() => {
    errMsg.value = null;
  }, 3000);
};
</script>
