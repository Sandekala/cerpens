<template>
  <div class="font-poppins text-black min-h-screen flex flex-col">
    <Navigation />
    <router-view class="pt-20 pb-10 flex-1 bg-[url('/bg.png')] bg-no-repeat" />
    <Footer />
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
import store from './store';
import { supabase } from './supabase/init';

supabase.auth.onAuthStateChange((_, session) => {
  store.methods.setUser(session);
});
</script>
