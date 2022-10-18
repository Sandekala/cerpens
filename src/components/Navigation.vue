<template>
  <header class="bg-primary text-white fixed w-full z-50">
    <div class="flex justify-between flex-row items-center container text-xl md:px-10 gap-3">
      <div>
        <logo />
      </div>
      <div v-if="isWhere.value.path == '/book'" class="sm:w-1/3">
        <form>
          <div class="relative">
            <Search v-if="search === ''" class="w-4 h-4 absolute z-10 top-0 bottom-0 m-auto text-xs opacity-50 right-3" />
            <Clear v-if="search !== ''" class="w-4 h-4 cursor-pointer absolute z-10 top-0 bottom-0 m-auto text-xs opacity-50 right-3" />
            <input ref="{{search}}" v-on:input="handleChange" type="text" name="search" id="search" class="w-full border-none rounded-lg focus:ring-0 text-black" placeholder="Search Book" />
          </div>
        </form>
      </div>
      <button @click="hamburgerClick" id="hamburger" class="group transition-all duration-500 ease-in-out sm:hidden">
        <span class="mb-[7px] block h-[2px] relative -z-10 w-7 rounded-full bg-white transition-all duration-500 ease-in-out group-hover:bg-secondary"></span>
        <span class="mb-[7px] block h-[2px] relative -z-10 w-7 rounded-full bg-white transition-all duration-500 ease-in-out group-hover:bg-secondary"></span>
        <span class="block h-[2px] w-7 rounded-full relative -z-10 bg-white transition-all duration-500 ease-in-out group-hover:bg-secondary"></span>
      </button>
      <nav id="navMenu" class="navHide absolute top-[110%] p-5 right-5 rounded-lg bg-primary h-36 min-w-[200px] shadow-sm shadow-black overflow-hidden transition-all delay-100 duration-1000 sm:static sm:h-auto sm:w-auto sm:bg-transparent sm:shadow-none">
        <ul class="block sm:flex gap-5">
          <li class="mb-10 sm:m-0"><router-link class="cursor-pointer font-semibold" :to="{ name: 'Home' }">Home</router-link></li>
          <li><router-link v-if="!user" class="cursor-pointer font-semibold" :to="{ name: 'Login' }">Login</router-link></li>
          <li v-if="user">
            <div class="flex flex-row items-center gap-2 relative z-50">
              <p>Hello, {{ name }}</p>
              <Logout @click="logout" class="w-4 h-4 cursor-pointer" />
            </div>
          </li>
        </ul>
      </nav>
      <!-- <div  id="drop" class="cursor-pointer absolute top-full bg-textDark text-black right-0">Logout</div> -->
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Logo from './icons/Logo.vue';
import Search from './icons/Search.vue';
import Clear from './icons/Clear.vue';
import currentUser from '../store/init';
import Logout from './icons/Logout.vue';

const router = useRouter();
const user = currentUser();
const search = ref(null);
const isWhere = ref(null);

isWhere.value = router.currentRoute;
const name = localStorage.getItem('name');

const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

const handleChange = (e) => {
  search.value = e.target.value;
};
const clearSearch = () => {
  search.value = null;
};

const hamburgerClick = (e) => {
  const target = e.target;
  const navMenu = document.getElementById('navMenu');
  target.classList.toggle('active');
  navMenu.classList.toggle('navHide');
};
</script>
