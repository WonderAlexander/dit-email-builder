<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{ title: string }>();
</script>

<template>
  <section class="editor__section">
    <div class="editor__section-header">
      <h4 class="section__header-title">{{ props.title }}</h4>
    </div>
    <div class="editor__section-content">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.editor__section {
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--element-accent-color);
}

.section__header-title {
  font-size: 16px;
  margin-bottom: 8px;
  margin-right: 8px;
}

.editor__section-header {
  display: flex;
}
</style>
