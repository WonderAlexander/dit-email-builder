<script setup lang="ts">
import { useEmailStore } from "@/stores/email.store.ts";
import Button from "@/components/UI/ButtonTextUI.vue";
import type { IEmailBlock } from "@/types/types.ts";

const { block } = defineProps<{
  block: IEmailBlock;
}>();

const emailStore = useEmailStore();

function handleDeleteBlock(blockToDelete: IEmailBlock) {
  emailStore.deleteBlock(blockToDelete);
}
</script>

<template>
  <div>
    <div class="modal__header">
      <h4 class="modal__title">Удалить блок</h4>
      <p class="modal__text">
        Действие приведет к необратимому удалению блока и всех элементов внтури.
        Вы уверены?
      </p>
    </div>
    <div class="modal__btns">
      <button class="modal__delete-btn" @click="handleDeleteBlock(block)">
        Да
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal__header {
  margin-bottom: 12px;
}

.modal__title {
  display: inline-block;
  font-size: 22px;
  margin-bottom: 8px;
}

.modal__title:after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--element-accent-color);
}

.modal__delete-btn {
  border: 1px solid var(--element-accent-color);
  color: var(--element-accent-color);
  padding: 12px 24px;
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
}

.modal__delete-btn:hover {
  background-color: var(--dit-accent-text-color);
  color: var(--neutral-bg-color);
  border-color: var(--dit-accent-text-color);
}
</style>
