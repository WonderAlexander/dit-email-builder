<script setup lang="ts">
import type {IEmailBlock, IEmailElement} from "@/types/types.ts";

const { elements } = defineProps<{
  elements: IEmailBlock[];
}>();

const emit = defineEmits<{
  (event: "element-click", element: IEmailBlock): void;
}>();

function handleElementClick(el: IEmailBlock) {
  emit("element-click", el);
}
</script>

<template>
  <div class="elements__list-wrapper">
    <ul class="elements__list">
      <li
        class="elements__list-item"
        v-for="element in elements"
        :key="element.name"
        @click="handleElementClick(element)"
      >
        <span class="list__item-text">{{ element.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.elements__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.elements__list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 6px;
  background-color: #ffffff;
  box-shadow: var(--main-box-shadow);
  cursor: pointer;
}

.list__item-text {
  font-size: 12px;
  color: var(--element-accent-color);
}
</style>
