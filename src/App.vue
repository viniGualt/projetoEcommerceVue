<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <main class="text-black">
    <Navbar />

    <div class="">
      <RouterView />
    </div>
    <Footer />
  </main>
</template>