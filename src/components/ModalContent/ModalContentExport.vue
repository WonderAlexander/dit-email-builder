<script setup lang="ts">
import { useEmailStore } from "@/stores/email.store.ts";
import Button from "@/components/UI/ButtonTextUI.vue";
import ExportIcon from "@/components/Icons/ExportIcon.vue";
import { nextTick } from "vue";

const emailStore = useEmailStore();
const emit = <
  {
    (event: "close-modal"): void;
  }
>defineEmits();
async function handleDownload() {
  emailStore.setUnEditable();
  await nextTick();
  emailStore.downloadEmailCode();
  emailStore.setUnEditable();
  emit("close-modal");
}
</script>

<template>
  <div>
    <div class="modal__header">
      <h4 class="modal__title">Экспорт</h4>
      <p class="modal__text">
        Действие экспортирует три файла c заданным именем на ваш комьютер.
      </p>
    </div>
    <div class="modal__field">
      <input
        class="modal__field-input"
        v-model="emailStore.emailFileName"
        @keyup.enter="handleDownload()"
        placeholder="Название файла"
        type="text"
      />
      <div class="modal__field-devider"></div>
      <button class="modal__field-btn" @click="handleDownload()">
        <ExportIcon color="var(--element-accent-color" width="25" />
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

.modal__field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 464px;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--neutral-bg-color);

  box-shadow: var(--main-box-shadow);
}

.modal__field-input {
  width: 412px;
  height: 50px;
  padding: 20px;
  transition: all 0.3s ease-in-out;
  color: var(--primary-text-color);
}

.modal__field-input::placeholder {
  color: var(--element-accent-color);
  font-style: italic;
}

.modal__field-btn {
  width: 54px;
  height: 50px;
  padding: 10px;
  cursor: pointer;
  background-color: transparent;

  transition: all 0.3s ease-in-out;
}

.modal__field-devider {
  height: 30px;
  width: 1px;
  background-color: var(--main-bg-color);
}

.modal__field-btn:hover {
  background-color: var(--main-bg-color);
}
</style>
