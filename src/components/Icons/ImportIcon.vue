<script setup lang="ts">
const { width, color } = defineProps<{
  width: number;
  color: string;
}>();
</script>

<template>
  <svg
    class="import__icon"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ width: width, scale: width / 32 }"
  >
    <path d="M27 28L5 28" :stroke="color" stroke-width="2.5" />
    <path
      d="M8 15L16 23L24 15"
      :stroke="color"
      stroke-width="2.5"
      stroke-linecap="square"
      stroke-linejoin="round"
    />
    <path
      d="M16 4L16 22"
      :stroke="color"
      stroke-width="2.5"
      stroke-linecap="square"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped>
.import__icon {
  transform: rotate(180deg);
}
</style>
