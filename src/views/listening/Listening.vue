<script setup>
import { ref } from "vue";
import menuList from "@/components/menuList.vue";
import { lessonEng } from "@/services/data";

const lessons = ref(lessonEng);
const currentLessonMenu = ref(0);

const isTranslate = ref(true);
const isExample = ref(true);
const isListen = ref(true);

const scrollToLesson = (lessonId) => {
  currentLessonMenu.value = lessonId;
};
const currentLessonIndex = ref(0);
const currentVocabIndex = ref(0);

const currentLesson = ref(lessons.value[currentLessonIndex.value]);
const currentStep = ref("lessonTitle");

console.log(currentLesson.value);

const nextStep = () => {
  if (currentStep.value === "lessonTitle") {
    currentStep.value = "vocab";
  } else {
    currentVocabIndex.value = 0; // Reset currentVocabIndex.value when moving to a new lesson
    currentVocabIndex.value += 1;
    if (currentVocabIndex.value >= currentLesson.value.vocab.length) {
      currentVocabIndex.value = 0;
      currentLessonIndex.value += 1;
      if (currentLessonIndex.value >= lessons.value.length) {
        currentStep.value = "finish";
      } else {
        currentLesson.value = lessons.value[currentLessonIndex.value];
        currentStep.value = "lessonTitle";
      }
    }
  }
};

const nextVocabStep = () => {
  currentVocabIndex.value += 1;
  if (currentVocabIndex.value >= currentLesson.value.vocab.length) {
    currentVocabIndex.value = 0;
    currentLessonIndex.value += 1;
    if (currentLessonIndex.value >= lessons.value.length) {
      currentStep.value = "finish";
    } else {
      currentLesson.value = lessons.value[currentLessonIndex.value];
      currentStep.value = "lessonTitle";
    }
  }
};
</script>

<template>
  <div class="flex gap-4">
    <div class="relative w-2rem md:w-5rem flex-0">
      <menuList
        :item="lessons"
        @onClickItemMenu="scrollToLesson"
        :currentLesson="currentLessonMenu"
      />
    </div>

    <div class="mt-8 py-4 md:pt-2 flex-1" style="margin-inline: auto">
      <div class="gap-3 mx-0 md:mx-8" style="margin-inline: auto">
        <div
          class="shadow-custom border-round-md mx-0 md:mx-8 text-center p-4 flex flex-column"
        >
          <div class="flex gap-2 justify-content-center">
            <i
              @click="isTranslate = !isTranslate"
              v-tooltip.top="isTranslate ? 'Tắt dịch' : 'Mở dịch'"
              class="pi pi-language text-indigo-900 cursor-pointer hover:text-purple-500 transition-duration-100"
              :style="!isTranslate ? 'opacity: 0.3' : ''"
            ></i>

            <span class="text-color-secondary" style="cursor: default">|</span>

            <i
              @click="isExample = !isExample"
              v-tooltip.top="isExample ? 'Tắt ví dụ' : 'Mở ví dụ'"
              class="pi pi-book text-indigo-900 cursor-pointer hover:text-purple-500 transition-duration-100"
              :style="!isExample ? 'opacity: 0.3' : ''"
            ></i>

            <span class="text-color-secondary" style="cursor: default">|</span>

            <i
              @click="isListen = !isListen"
              v-tooltip.top="isListen ? 'Tắt đọc' : 'Mở đọc'"
              class="pi pi-volume-up text-indigo-900 cursor-pointer hover:text-purple-500 transition-duration-100"
              :style="!isListen ? 'opacity: 0.3' : ''"
            ></i>
          </div>

          <hr class="w-10" />

          <!--  -->

          <div>
            <div v-if="currentStep === 'lessonTitle'">
              <h2>{{ currentLesson.title }}</h2>
              <Button @click="nextStep">Bắt đầu</Button>
            </div>

            <div v-else-if="currentStep === 'vocab'">
              <div v-if="currentVocabIndex < currentLesson.vocab.length">
                <h3>{{ currentLesson.vocab[currentVocabIndex].word }}</h3>
                <p>{{ currentLesson.vocab[currentVocabIndex].example }}</p>
                <Button @click="nextVocabStep">Tiếp tục</Button>
              </div>
              <div v-else>
                <Button @click="nextStep">Tiếp tục</Button>
              </div>
            </div>

            <div v-else>
              <h2>Finish</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shadow-custom {
  box-shadow: 0px 3px 5px rgba(162, 0, 255, 0.466),
    0px 0px 2px rgba(161, 5, 223, 0.05), 0px 1px 4px rgba(213, 26, 250, 0.08);
}
</style>
