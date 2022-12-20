<template>
  <div class="container">
    <h1 class="text-3xl underline font-bold text-center mb-5">Setting</h1>
    <div class="flex items-center flex-wrap justify-center gap-7">
      <div id="neo" class="shadow-lg rounded-lg shadow-black/20 bg-white">
        <img src="/50426.jpg" alt="image" width="400" class="rounded-lg" />
      </div>
      <div id="neo" class="w-[300px] h-[450px] relative shadow-black/20 bg-white p-5">
        <form v-if="loaded" id="profil" @submit.prevent="handleSubmit" class="h-full">
          <label for="id">ID</label>
          <div>
            <p>{{ field.id }}</p>
          </div>
          <label for="name">Name</label>
          <div>
            <p v-if="!edit">{{ field.name }}</p>
            <input v-else type="text" name="name" id="name" v-model="field.name" />
          </div>
          <label for="email">Email</label>
          <div>
            <p v-if="!edit">{{ field.email }}</p>
            <input v-else type="text" name="email" id="email" v-model="field.email" />
          </div>
          <label for="password">Password</label>
          <div>
            <p>***</p>
          </div>
          <div class="absolute bottom-0 right-0">
            <button v-if="edit" type="submit" class="px-1 hover:bg-primary hover:text-white font-semibold text-primary border-2 border-primary rounded-xl w-24">Save</button>
            <button v-if="edit" type="button" class="font-semibold text-red-500 hover:underline ml-2 w-24" @click="handleEdit">Cancel</button>
            <button v-if="!edit" type="button" class="px-1 hover:bg-primary hover:text-white font-semibold text-primary border-2 border-primary rounded-xl w-24 ml-2" @click="handleEdit">Edit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const field = ref({
  id: '',
  name: '',
  email: '',
});
const loaded = ref(null);
const edit = ref(false);
const id = localStorage.getItem('authorId');
const token = localStorage.getItem('token');

const handleEdit = () => {
  edit.value = !edit.value;
};
const handleSubmit = () => {
  axios
    .put(
      `${import.meta.env.VITE_APP_BASE_URL}/user/${id}`,
      {
        name: field.value.name,
        email: field.value.email,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      loaded.value = true;
      edit.value = false;
      console.log(res);
    })
    .catch((err) => console.log(err));
};

axios
  .get(`${import.meta.env.VITE_APP_BASE_URL}/user/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
  .then((res) => {
    loaded.value = true;
    field.value.id = res.data.data.id;
    field.value.name = res.data.data.name;
    field.value.email = res.data.data.email;
  })
  .catch((err) => console.log(err));
</script>
<style>
#profil label {
  @apply text-2xl font-bold;
}
#profil p {
  @apply my-5 ml-3 text-xl;
}

#profil input {
  @apply my-3 rounded-3xl border-black/20 focus:ring-0 w-full;
}
#neo {
  border-radius: 15px;
  background: #f9f9f9;
  box-shadow: 10px 10px 20px #bebebe, -10px -10px 20px #ffffff;
}
</style>
