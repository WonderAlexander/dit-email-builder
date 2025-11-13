<script setup lang="ts">
import type {IEmailElement} from "@/types/types.ts";

const { elements } = defineProps<{
  elements: IEmailElement[];
}>();

const emit = defineEmits<{
  (event: "element-click", element: IEmailElement): void;
}>();

function handleElementClick(el: IEmailElement) {
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
.elements__list-wrapper {
  width: 515px;
  padding: 10px 24px;
  background-color: #ffffff;
}

.elements__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
}

.elements__list-item {
  display: inline-block;
  border-radius: 8px;
  padding: 8px 12px;
  background-color: var(--neutral-bg-color);
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  flex-grow: 0;
}

.list__item-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--element-accent-color);
}
</style>
