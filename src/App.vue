<script setup>
import { RouterView } from "vue-router";
import AppTopBar from "./AppTopBar.vue";
</script>

<template>
  <AppTopBar />

  <div class="flex gap-2">
    <div class="relative w-2rem md:w-5rem">
      <div
        class="h-screen fixed w-2rem md:w-5rem border-right-1 border-purple-500"
        style="
          box-shadow: 0 5px 5px -5px rgba(162, 0, 255, 0.466),
            0px 0px 2px rgba(161, 5, 223, 0.05),
            0px 1px 4px rgba(213, 26, 250, 0.08);
        "
      ></div>
    </div>

    <div class="mt-4 md:mt-8 pt-4 md:pt-2 flex-1" style="margin-inline: auto">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
