<script setup lang="ts">
const { width, color } = defineProps<{
  width: number;
  color: string;
}>();
</script>

<template>
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ width: width, scale: width / 32 }"
  >
    <path
      d="M24 20L16 12L8 20"
      :stroke="color"
      stroke-width="2.5"
      stroke-linecap="square"
      stroke-linejoin="round"
    />
  </svg>
</template>
