<script setup>
import { RouterView } from "vue-router";
import AppTopBar from "./AppTopBar.vue";
</script>

<template>
  <AppTopBar />

  <div class="mt-4 md:mt-8 pt-5 md:pt-3">
    <RouterView />
  </div>
</template>

<style scoped></style>
