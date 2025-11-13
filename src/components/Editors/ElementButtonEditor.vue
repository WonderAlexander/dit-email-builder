<script setup lang="ts">
import type { IEmailElement } from "@/types/types.ts";
import { ref } from "vue";

const { element } = defineProps<{
  element: IEmailElement;
}>();

const emit = defineEmits<{
  (event: "delete-element"): void;
}>();

const availableColors = ["#E51740", "#0563c1", "#6f2c9d", "#0066ff", "#000000"];

const customColor = ref("");

function setBgColor(newColor: string) {
  element.btnBgColor = newColor;
}

const setColorFromInput = () => {
  if (/^#[0-9A-F]{6}$/i.test(customColor.value)) {
    setBgColor(customColor.value);
  }
};
</script>

<template>
  <div v-if="element" class="email__button-editor">
    <div class="button__editor-item">
      <label class="editor-item__title">Текст кнопки:</label>
      <input class="editor-item__input" v-model="element.btnText" />
    </div>
    <div class="button__editor-item">
      <label class="editor-item__title">Ссылка кнопки:</label>
      <input class="editor-item__input" v-model="element.btnLink" />
    </div>
    <div class="button__editor-item">
      <label class="editor-item__title">Цвет фона кнопки:</label>
      <div class="color__picker-options">
        <div class="color__picker-colors">
          <button
            v-for="color in availableColors"
            :key="color"
            class="color__picker-color"
            @click="setBgColor(color)"
            :style="{ backgroundColor: color }"
          ></button>
        </div>
        <input
          class="color__picker-input"
          type="text"
          placeholder="HEX"
          v-model="customColor"
          @input="setColorFromInput"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.email__button-editor {
  position: absolute;
  top: -185px;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--neutral-bg-color);
  border-radius: 12px;
  padding: 12px;
  box-shadow: var(--main-box-shadow);
}

.editor-item__input {
  transition: all 0.3s ease-in-out;
  font-style: italic;
  color: var(--element-accent-color);
  background-color: var(--neutral-bg-color);
  box-shadow: var(--main-box-shadow);
  border-radius: 12px;
}

.button__editor-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
}

.editor-item__title {
  font-size: 14px;
  font-weight: normal;
}

.color__picker-options {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  justify-content: space-between;
  padding: 6px;
  background-color: var(--neutral-bg-color);
  border-radius: 12px;
}

.color__picker-colors {
  display: flex;
  gap: 3px;
}

.color__picker-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
}

.color__picker-input {
  font-size: 14px;
  font-style: italic;
  color: var(--element-accent-color);
  width: 75px;
  border-bottom: 1px solid var(--element-accent-color);
}
</style>
