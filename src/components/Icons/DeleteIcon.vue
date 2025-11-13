<script setup lang="ts">
const {} = defineProps<{
  width: number;
  color: string;
}>();
</script>

<template>
  <div>
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      :fill="color"
      xmlns="http://www.w3.org/2000/svg"
      :style="{ width: width, scale: width / 32 }"
    >
      <path
        d="M14.5833 12.0834L14.5833 23.9167L12.0833 23.9167L12.0833 12.0834H14.5833Z"
        class="icon-path"
      />
      <path
        d="M19.9167 23.9167L19.9167 12.0834L17.4167 12.0834L17.4167 23.9167H19.9167Z"
        class="icon-path"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2.75C11.3096 2.75 10.75 3.30964 10.75 4V6.75L2.75 6.75L2.75 9.25H5.49722L6.75277 28.0831C6.79654 28.7398 7.34192 29.25 8 29.25L24 29.25C24.6581 29.25 25.2035 28.7398 25.2472 28.0831L26.5028 9.25H29.25V6.75L21.25 6.75V4C21.25 3.30964 20.6904 2.75 20 2.75L12 2.75ZM18.75 6.75V5.25L13.25 5.25V6.75L18.75 6.75ZM23.9972 9.25L8.00277 9.25L9.16944 26.75L22.8306 26.75L23.9972 9.25Z"
        class="icon-path"
      />
    </svg>
  </div>
</template>
