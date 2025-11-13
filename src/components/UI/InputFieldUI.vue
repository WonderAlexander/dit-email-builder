<script setup lang="ts">
import Button from "@/components/UI/ButtonTextUI.vue";
import DataEditIcon from "@/components/Icons/DataEditIcon.vue";

const model = defineModel<string>();
const { placeholder } = defineProps<{
  placeholder: string;
}>();
const onInput = (event: Event) => {
  model.value = (event.target as HTMLInputElement).value;
};
</script>

<template>
  <div class="modal__field">
    <input
      class="modal__field-input"
      :value="model"
      :placeholder="placeholder"
      @input="onInput"
      type="text"
    />
    <div class="modal__field-devider"></div>
    <button class="modal__field-btn">
      <DataEditIcon color="var(--element-accent-color" width="25" />
    </button>
  </div>
</template>

<style scoped>
.modal__field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 464px;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--neutral-bg-color);

  box-shadow: var(--main-box-shadow);
  margin-bottom: 12px;
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
