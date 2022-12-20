<template>
  <header class="bg-white fixed w-full z-40 shadow-md shadow-black/10 text-primary">
    <div class="flex justify-between flex-row items-center container text-lg md:px-10 gap-3">
      <div>
        <logo />
      </div>
      <div class="sm:w-1/4">
        <form @submit.prevent="handleSearch">
          <div class="relative">
            <Search v-if="search === ''"
              class="w-4 h-4 absolute z-10 top-0 bottom-0 m-auto text-xs opacity-50 right-3" />
            <Clear @click="clearSearch" v-if="search !== ''"
              class="w-4 h-4 cursor-pointer absolute z-10 top-0 bottom-0 m-auto text-xs opacity-50 right-3" />
            <input v-on:input="handleChange" v-model="search" type="text" name="search" id="search"
              class="w-full border-black/20 rounded-lg focus:ring-0 text-black" placeholder="Search" />
          </div>
        </form>
      </div>
      <button id="hamburger" class="group transition-all duration-500 ease-in-out sm:hidden" type="button"
        data-drawer-target="drawer-backdrop" data-drawer-backdrop="true" data-drawer-show="drawer-backdrop"
        aria-controls="drawer-backdrop" data-drawer-placement="right">
        <span
          class="mb-[7px] block h-[2px] relative -z-10 w-7 rounded-full bg-primary transition-all duration-500 ease-in-out group-hover:bg-secondary"></span>
        <span
          class="mb-[7px] block h-[2px] relative -z-10 w-7 rounded-full bg-primary transition-all duration-500 ease-in-out group-hover:bg-secondary"></span>
        <span
          class="block h-[2px] w-7 rounded-full relative -z-10 bg-primary transition-all duration-500 ease-in-out group-hover:bg-secondary"></span>
      </button>
      <nav id="navMenu" class="hidden sm:block">
        <ul class="block sm:flex gap-5">
          <li class="w-fit group p-5 sm:p-0">
            <router-link class="cursor-pointer" :to="{ name: 'Home' }">Home</router-link>
            <span class="bg-primary w-0 group-hover:w-full transition-all duration-300 h-[2px] block"></span>
          </li>
          <li class="w-fit group p-5 sm:p-0">
            <router-link class="cursor-pointer" :to="{ name: 'CerpenList' }">Bookshelf</router-link>
            <span class="bg-primary w-0 group-hover:w-full transition-all duration-300 h-[2px] block"></span>
          </li>
          <li v-if="!user" class="w-fit group p-5 sm:p-0">
            <router-link class="cursor-pointer" :to="{ name: 'Login' }">Login</router-link>
            <span class="bg-primary h-[2px] block w-0 group-hover:w-full transition-all duration-300"></span>
          </li>
          <li v-if="user" class="group">
            <button type="button" class="flex flex-row items-center gap-2 relative z-50 p-5 sm:p-0"
              id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation">
              <p>Hello, {{ name }}</p>
              <Down class="w-4 h-4 cursor-pointer animate-bounce" />
            </button>
            <!-- <span class="bg-primary h-[2px] block w-0 group-hover:w-full transition-all duration-300"></span> -->
            <!-- Dropdown menu -->
            <div id="dropdownInformation"
              class="hidden z-10 w-44 bg-white rounded-lg px-2 divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
              <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
                <div>{{ name }}</div>
                <div class="font-medium truncate">{{ email }}</div>
              </div>
              <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                <li>
                  <router-link :to="{ name: 'CerpenList' }"
                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Profil' }"
                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</router-link>
                </li>
              </ul>
              <div class="py-1">
                <p @click="logout"
                  class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                  Sign out</p>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <!-- drawer component -->
  <div id="drawer-backdrop" class="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800" tabindex="-1"
    aria-labelledby="drawer-backdrop-label">
    <h5 id="drawer-backdrop-label" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
    <button type="button" data-drawer-dismiss="drawer-backdrop" aria-controls="drawer-backdrop"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"></path>
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <div class="py-4 overflow-y-auto">
      <ul class="space-y-2">
        <li>
          <router-link :to="{ name: 'Home' }"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg aria-hidden="true"
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
            <span class="ml-3">Home</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'CerpenList' }"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M0 96C0 43 43 0 96 0h96V190.7c0 13.4 15.5 20.9 26 12.5L272 160l54 43.2c10.5 8.4 26 .9 26-12.5V0h32 32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384 96c-53 0-96-43-96-96V96zM64 416c0 17.7 14.3 32 32 32H352V384H96c-17.7 0-32 14.3-32 32z" />
            </svg>
            <span class="ml-3">Bookshelf</span>
          </router-link>
        </li>
        <li v-if="user">
          <button type="button"
            class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <svg aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
              </path>
            </svg>
            <span class="flex-1 ml-3 text-left whitespace-nowrap">Hello, {{ name }}</span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
          <ul id="dropdown-example" class="hidden py-2 space-y-2">
            <li>
              <router-link :to="{ name: 'Profil' }"
                class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Setting</router-link>
            </li>
          </ul>
        </li>
        <li v-if="!user">
          <router-link :to="{ name: 'Login' }"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Login</span>
          </router-link>
        </li>
        <li v-else>
          <p @click="logout"
            class="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Logout</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import Logo from './icons/Logo.vue';
import currentUser from '../store/init';
import Down from './icons/Down.vue';
import Search from '../components/icons/Search.vue';
import Clear from '../components/icons/Clear.vue';
import Logout from './icons/Logout.vue';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const user = currentUser();
const isWhere = ref(null);
const search = ref('');
const dataLoaded = ref(false);
const data = ref(null);

isWhere.value = router.currentRoute;
const name = localStorage.getItem('name');
const email = localStorage.getItem('email');

const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};
const handleChange = (e) => {
  search.value = e.target.value;
};
const clearSearch = () => {
  search.value = '';
};

const handleSearch = () => {
  if (!route.query.name) {
    router.push({ path: 'search', query: { name: search.value } });
  } else {
    router.push({ path: 'search', query: { name: search.value } });
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/search?name=${search.value}`)
      .then((res) => {
        dataLoaded.value = true;
        data.value = res.data.data;
        router.go()
      })
      .catch((err) => console.log(err));
  }
};

const hamburgerClick = (e) => {
  const target = e.target;
  const navMenu = document.getElementById('navMenu');
  target.classList.toggle('active');
  navMenu.classList.toggle('navHide');
};
</script>
