<script setup lang="ts">
const emit = defineEmits<{
  (emit: "action"): void;
}>();

const handleButtonAction = () => {
  emit("action");
};
</script>

<template>
  <button class="btn" @click="handleButtonAction">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  display: inline-block;
  cursor: pointer;
  padding: 8px 12px;
  margin: 15px 0;
  border-radius: 6px;
  border: solid 1px transparent;
  color: var(--neutral-bg-color);
  background-color: var(--dit-accent-text-color);
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  color: var(--dit-accent-text-color);
  border-color: var(--dit-accent-text-color);
  background-color: transparent;
}
</style>
