<script setup>
import PrimaryIconVue from '../components/icons/PrimaryIcon.vue';
import Line from '../components/icons/Line.vue';
</script>

<template>
  <div class="container text-black">
    <div class="flex flex-row items-center flex-wrap justify-between">
      <div class="md:ml-20">
        <h1 class="text-6xl md:text-8xl font-bold ml-5 mb-10">Cerpens</h1>
        <Line />
        <div class="text-xl ml-10 mt-10 flex flex-wrap gap-5 items-center">
          <p>Wanna read Cerpens?</p>
          <span class="bg-primary rounded-lg shadow-lg shadow-black/20 text-white px-2 py-1 hover:bg-transparent hover:border-2 hover:border-primary border-primary border-2 hover:text-primary transition-all duration-300 cursor-pointer">
            <router-link :to="{ name: 'CerpenList' }">Go to Bookshelf</router-link>
          </span>
        </div>
      </div>
      <div class="ml-auto">
        <PrimaryIconVue />
      </div>
    </div>
  </div>
</template>
