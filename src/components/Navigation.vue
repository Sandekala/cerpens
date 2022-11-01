<template>
  <header class="bg-white fixed w-full z-40 shadow-md shadow-black/10 text-primary">
    <div class="flex justify-between flex-row items-center container text-lg md:px-10 gap-3">
      <div>
        <logo />
      </div>
      <!-- <div v-if="isWhere.value.path == '/cerpen'" class="sm:w-1/3">
        <form @submit.prevent>
          <div class="relative">
            <Search v-if="search === ''" class="w-4 h-4 absolute z-10 top-0 bottom-0 m-auto text-xs opacity-50 right-3" />
            <Clear @click="clearSearch" v-if="search !== ''" class="w-4 h-4 cursor-pointer absolute z-10 top-0 bottom-0 m-auto text-xs opacity-50 right-3" />
            <input v-on:input="handleChange" v-model.lazy="search" type="text" name="search" id="search" class="w-full border-none rounded-lg focus:ring-0 text-black" placeholder="Search Book" />
          </div>
        </form>
      </div> -->
      <button @click="hamburgerClick" id="hamburger" class="group transition-all duration-500 ease-in-out sm:hidden">
        <span class="mb-[7px] block h-[2px] relative -z-10 w-7 rounded-full bg-primary transition-all duration-500 ease-in-out group-hover:bg-secondary"></span>
        <span class="mb-[7px] block h-[2px] relative -z-10 w-7 rounded-full bg-primary transition-all duration-500 ease-in-out group-hover:bg-secondary"></span>
        <span class="block h-[2px] w-7 rounded-full relative -z-10 bg-primary transition-all duration-500 ease-in-out group-hover:bg-secondary"></span>
      </button>
      <nav id="navMenu" class="navHide absolute top-[110%] right-5 rounded-lg sm:rounded-none bg-white h-36 min-w-[200px] shadow-md shadow-black/10 overflow-hidden transition-all delay-100 duration-1000 sm:static sm:h-auto sm:w-auto sm:bg-transparent sm:shadow-none">
        <ul class="block sm:flex gap-5">
          <li class="w-fit group p-5 sm:p-0">
            <router-link class="cursor-pointer" :to="{ name: 'Home' }">Home</router-link>
            <span class="bg-primary w-0 group-hover:w-full transition-all duration-300 h-[2px] block"></span>
          </li>
          <li v-if="!user" class="w-fit group p-5 sm:p-0">
            <router-link class="cursor-pointer" :to="{ name: 'Login' }">Login</router-link>
            <span class="bg-primary h-[2px] block w-0 group-hover:w-full transition-all duration-300"></span>
          </li>
          <li v-if="user">
            <div class="flex flex-row items-center gap-2 relative z-50 p-5 sm:p-0">
              <p>Hello, {{ name }}</p>
              <Logout @click="logout" class="w-4 h-4 cursor-pointer hover:scale-110" />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Logo from './icons/Logo.vue';
import currentUser from '../store/init';
import Logout from './icons/Logout.vue';

const router = useRouter();
const user = currentUser();
const isWhere = ref(null);

isWhere.value = router.currentRoute;
const name = localStorage.getItem('name');

const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

const hamburgerClick = (e) => {
  const target = e.target;
  const navMenu = document.getElementById('navMenu');
  target.classList.toggle('active');
  navMenu.classList.toggle('navHide');
};
</script>
