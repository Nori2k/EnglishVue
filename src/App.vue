<script setup>
import { RouterView } from "vue-router";
import AppTopBar from "./AppTopBar.vue";
</script>

<template>
  <div class="relative">
    <AppTopBar />
  </div>

  <RouterView />
</template>

<style scoped></style>
