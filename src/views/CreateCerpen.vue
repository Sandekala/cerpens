<template>
  <div class="container">
    <form @submit.prevent="handlePost" class="flex flex-col relative m-auto">
      <div>
        <input required v-model="form.title" type="text" name="title" id="title" class="focus:outline-none focus:ring-0 h-24 placeholder:font-bold block m-auto border-none focus:border-black/5 rounded-xl placeholder-shown" placeholder="Input title here..." />
      </div>
      <div class="flex justify-center items-center m-auto relative w-[500px] my-10">
        <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div class="flex flex-col justify-center items-center pt-5 pb-6">
            <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload Cover</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG(MAX. 800x400px)</p>
          </div>
          <img v-if="blobImg" :src="blobImg" alt="uploadedImg" class="absolute w-full h-full z-20 top-0 left-0" />
          <input required id="dropzone-file" type="file" accept="image/jpeg, image/png, image/jpg" class="hidden" v-on:change="addImage" />
        </label>
        <Trash v-if="blobImg" @click="blobImg = null" class="absolute top-3 cursor-pointer right-3 z-20" />
      </div>
      <div>
        <textarea required v-model="form.content" class="focus:outline-none focus:ring-0 focus:border-black/5 block m-auto border-2 border-black/5 rounded-xl text-justify max-w-full" name="content" id="content" cols="120" rows="10" placeholder="Input content here..."></textarea>
      </div>
      <div class="ml-auto flex gap-3">
        <button class="hover:border-primary hover:text-primary transition-all duration-300">
          <router-link :to="{ name: 'CerpenList' }">Cancel </router-link>
        </button>
        <button type="submit" class="bg-primary rounded-md font-bold text-white hover:bg-transparent hover:border-2 border-primary py-1 px-2 border-2 hover:border-primary hover:text-primary transition-all duration-300">Post!</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import Trash from '../components/icons/Trash.vue';
import { ref } from 'vue';

const authorId = parseInt(localStorage.getItem('authorId'));
const token = localStorage.getItem('token');
const blobImg = ref(null);

const form = ref({
  title: '',
  content: '',
});
let image = ref(null);

const addImage = (e) => {
  const file = e.target.files[0];
  blobImg.value = URL.createObjectURL(file);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    image.value = reader.result;
  };
};

const handlePost = async () => {
  const data = new FormData();
  data.append('file', image.value);
  data.append('upload_preset', 'pbtupgns');
  data.append('cloud_name', 'dhx7fh9xc');
  axios
    .post('https://api.cloudinary.com/v1_1/dhx7fh9xc/image/upload', data)
    .then((res) => {
      image = res.data.url;
    })
    .then(
      axios
        .post(
          `${import.meta.env.VITE_APP_BASE_URL}/cerpen`,
          {
            title: form.value.title,
            content: form.value.content,
            cover: image.value,
            author_id: authorId,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        .catch((err) => console.log(err))
        .finally((res) => {
          window.location.href = '/cerpen';
        })
    );
};
</script>
