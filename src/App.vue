<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Nav.vue'

</script>

<template>
  <Navbar />
  <div class="container-fluid mt-3">
    <RouterView />
  </div>

</template>
