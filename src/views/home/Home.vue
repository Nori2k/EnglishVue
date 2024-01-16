<script setup>
import { ref } from "vue";

const title = ref("Introduction");

const isTranslate = ref(true);
const isExample = ref(true);

const vocabulary = ref([
  {
    word: "Work Experience",
    translate: "Kinh nghiệm làm việc",
    example: "I have 2 years work experience in the IT field",
    isClick: false,
  },
  {
    word: "Studied",
    translate: "Đã học",
    example:
      "I (studied / am studying) Software Engineer at Phu Yen University for 4 years",
    isClick: false,
  },
]);

const onClickWord = (index) => {
  vocabulary.value[index].isClick = true;

  setTimeout(() => {
    vocabulary.value[index].isClick = false;
  }, 3000);
};
</script>

<template>
  <div class="container flex flex-column gap-3">
    <span class="text-sm md:text-xl font-semibold text-center">{{
      title
    }}</span>

    <div class="w-full shadow-custom flex flex-column gap-2 border-round-md">
      <div
        class="text-sm md:text-lg font-semibold p-3 md:p-4 bg-purple-200 border-round-top-md flex gap-2 align-items-center"
      >
        <span class="text-purple-700">Vocabulary</span>
        <span class="text-color-secondary">|</span>
        <i
          @click="isTranslate = !isTranslate"
          class="pi pi-language cursor-pointer text-indigo-900"
        ></i>
        <span class="text-color-secondary">|</span>
        <i
          @click="isExample = !isExample"
          class="pi pi-book cursor-pointer text-indigo-900"
        ></i>
      </div>

      <div
        class="text-sm md:text-base p-3 md:p-4 border-round-md flex flex-column gap-2"
      >
        <div
          v-for="(word, index) in vocabulary"
          :key="index"
          class="flex align-items-center h-1rem"
        >
          <span
            @click="onClickWord(index)"
            class="cursor-pointer hover:text-purple-500 cursor-pointer transition-duration-100"
            style="min-width: 8.5rem"
          >
            {{ word.word }}
          </span>

          <div v-if="word.isClick" class="width: 1rem">
            <i class="pi pi-megaphone text-purple-700"></i>
          </div>

          <div v-else style="width: 1rem"></div>

          <div v-if="isTranslate" class="px-2">
            <span>: {{ word.translate }}</span>
          </div>

          <div v-if="isExample" class="px-2">
            <span>| {{ word.example }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full shadow-1 text-sm md:text-base">
      <span> Vocabulary </span>
    </div>
  </div>
</template>

<style scoped>
.shadow-custom {
  box-shadow: 0px 3px 5px rgba(162, 0, 255, 0.466),
    0px 0px 2px rgba(161, 5, 223, 0.05), 0px 1px 4px rgba(213, 26, 250, 0.08);
}
</style>
