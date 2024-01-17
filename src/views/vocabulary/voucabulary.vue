<script setup>
import { ref } from "vue";
import { lessonEng } from "./services/data";

const lesson = ref(lessonEng);

const currentUtterance = ref(null);
const currentWord = ref(null);

// Bấm vào để đọc
const onClickWord = (speakWord) => {
  currentWord.value = speakWord;

  if (currentUtterance.value) {
    speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(speakWord);

  // Ẩn thông báo khi đọc xong
  utterance.onend = () => {
    currentWord.value = null;
  };

  speechSynthesis.speak(utterance);
  currentUtterance.value = utterance;
};

// Kiểm tra từ trong example nếu nó giống với từ trong word thì làm đậm và underline
const highlightText = (example, word) => {
  // Sử dụng biểu thức chính quy để tìm từ trong câu ví dụ
  const regex = new RegExp(`\\b${word}\\b`, "gi");

  // Thay thế từ bằng phiên bản in đậm và underline
  const highlightedText = example.replace(
    regex,
    (match) =>
      `<span style="text-decoration: underline;"><b>${match}</b></span>`
  );

  return highlightedText;
};
</script>

<template>
  <div class="flex flex-column gap-3 mx-0 md:mx-8" style="margin-inline: auto">
    <!-- <span class="text-sm md:text-xl font-semibold text-center">
        Vocabulary
      </span> -->

    <div
      v-for="(lessonItem, indexLesson) in lesson"
      :key="indexLesson"
      class="w-full shadow-custom flex flex-column gap-2 border-round-md"
    >
      <div
        class="text-sm md:text-lg font-semibold p-3 md:p-4 bg-purple-200 border-round-top-md flex gap-2 align-items-center"
      >
        <span
          v-tooltip.top="lessonItem.translateTitle"
          class="cursor-pointer text-purple-700"
          @click="onClickWord(lessonItem.title)"
        >
          {{ lessonItem.title }}
        </span>
        <span class="text-color-secondary" style="cursor: default">|</span>

        <i
          @click="lessonItem.isTranslate = !lessonItem.isTranslate"
          v-tooltip.top="lessonItem.isTranslate ? 'Tắt dịch' : 'Mở dịch'"
          placeholder="Top"
          class="pi pi-language text-indigo-900 cursor-pointer hover:text-purple-500 transition-duration-100"
          :style="!lessonItem.isTranslate ? 'opacity: 0.3' : ''"
        ></i>

        <span class="text-color-secondary" style="cursor: default">|</span>
        <i
          v-tooltip.top="lessonItem.isExample ? 'Tắt ví dụ' : 'Mở ví dụ'"
          placeholder="Top"
          @click="lessonItem.isExample = !lessonItem.isExample"
          class="pi pi-book text-indigo-900 cursor-pointer hover:text-purple-500 transition-duration-100"
          :style="!lessonItem.isExample ? 'opacity: 0.3' : ''"
        ></i>
      </div>

      <div
        class="text-sm md:text-base p-3 md:p-4 border-round-md flex flex-column gap-3 pb-5"
      >
        <div
          v-for="(word, index) in lessonItem.vocab"
          :key="index"
          class="h-full flex flex-column md:flex-row"
        >
          <div class="flex align-items-center h-full">
            <div class="flex gap-2" style="width: 10rem; min-height: 1.4rem">
              <span
                @click="onClickWord(word.word)"
                class="cursor-pointer hover:text-purple-500 transition-duration-100 font-semibold"
                v-tooltip.top="word.translate"
                placeholder="Top"
              >
                {{ word.word }}
              </span>

              <div>
                <div v-if="currentWord === word.word" style="width: 1rem">
                  <i class="pi pi-megaphone text-purple-700"></i>
                </div>

                <div v-else style="width: 1rem"></div>
              </div>
            </div>

            <div v-if="lessonItem.isTranslate" class="px-1">
              <span>:</span>
            </div>

            <div v-if="lessonItem.isTranslate" style="width: 11rem">
              {{ word.translate }}
            </div>

            <div
              v-if="lessonItem.isExample"
              class="border-left-1 border-700 hidden md:flex flex-1 ml-2 pl-2"
              style="min-height: 1.4rem"
            >
              <span
                @click="onClickWord(word.example)"
                v-tooltip.top="word.translateWord"
                placeholder="Top"
                v-html="highlightText(word.example, word.word)"
                class="cursor-pointer hover:text-purple-500 transition-duration-100"
              ></span>

              <div class="pl-2">
                <div v-if="currentWord === word.example" style="width: 1rem">
                  <i class="pi pi-megaphone text-purple-700"></i>
                </div>

                <div v-else style="width: 1rem"></div>
              </div>
            </div>
          </div>

          <div
            v-if="lessonItem.isExample"
            class="flex md:hidden flex-1 mt-1 pt-1"
            style="min-height: 1.4rem"
          >
            <div
              @click="onClickWord(word.example)"
              v-tooltip.top="word.translateWord"
              placeholder="Top"
              class="cursor-pointer hover:text-purple-500 transition-duration-100"
              v-html="'EX: ' + highlightText(word.example, word.word)"
            ></div>

            <div class="pl-2">
              <div v-if="currentWord === word.example" style="width: 1rem">
                <i class="pi pi-megaphone text-purple-700"></i>
              </div>

              <div v-else style="width: 1rem"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.shadow-custom {
  box-shadow: 0px 3px 5px rgba(162, 0, 255, 0.466),
    0px 0px 2px rgba(161, 5, 223, 0.05), 0px 1px 4px rgba(213, 26, 250, 0.08);
}

:deep(.custom-tippy) {
  .tippy-box {
    border-radius: 0.5rem;
  }
}
</style>
