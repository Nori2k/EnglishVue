<script setup>
const props = defineProps({
  item: {
    type: Array,
    default: null,
  },
  currentLesson: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["onClickItemMenu"]);

const onClickItemMenu = (id) => {
  emits("onClickItemMenu", id);
};
</script>

<template>
  <!--         style="box-shadow: 5px 0 10px -5px rgba(248, 159, 91)" -->
  <div
    class="h-screen fixed w-3rem md:w-7rem border-right-1 border-purple-500 left-0 can-not-copy"
    style="box-shadow: 5px 0 10px -5px rgba(163, 25, 255, 0.75)"
  >
    <div class="mx-2">
      <div class="flex flex-column mt-7">
        <div
          class="flex gap-1 py-2 align-items-center justify-content-center cursor-pointer hover:bg-purple-100 hover:text-purple-700 transition-duration-200"
        >
          <i class="pi pi-arrow-circle-left text-sm"></i>
          <span class="hidden md:flex">Back</span>
        </div>
      </div>

      <hr class="w-11" />

      <div
        v-for="(lesson, index) in item"
        :key="lesson.id"
        class="flex flex-column"
      >
        <span
          @click="onClickItemMenu(lesson.id)"
          class="hidden md:flex text-sm cursor-pointer hover:text-purple-700 transition-duration-200 text-center"
          :class="{
            'font-bold text-purple-700': lesson?.id === currentLesson,
          }"
        >
          {{ lesson.title }}
        </span>

        <span
          @click="onClickItemMenu(lesson.id)"
          class="flex-inline md:hidden text-sm cursor-pointer hover:text-purple-700 transition-duration-200 text-center"
          :class="{
            'font-bold text-purple-700 text-base': lesson.id === currentLesson,
          }"
          v-tooltip.right="lesson.title"
        >
          {{ index + 1 }}
        </span>

        <hr v-if="index !== item.length - 1" class="w-11" />
      </div>
    </div>
  </div>
</template>
