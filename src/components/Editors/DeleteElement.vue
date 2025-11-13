<script setup lang="ts">
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";

const emit = defineEmits<{
  (event: "delete-element"): void;
}>();
</script>

<template>
  <div class="delete__element">
    <button class="delete__element-btn">
      <DeleteIcon
        @click="emit('delete-element')"
        class="element__delete"
        color="var(--element-accent-color)"
        width="28"
      />
    </button>
  </div>
</template>

<style scoped>
.delete__element {
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: var(--neutral-bg-color);
  border-radius: 12px;
  box-shadow: var(--main-box-shadow);
}

.delete__element-btn {
  width: 40px;
  height: 40px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.delete__element-btn:hover {
  background-color: var(--main-bg-color);
}
</style>
