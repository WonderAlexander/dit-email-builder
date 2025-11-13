<script setup lang="ts">
import { ref } from "vue";
import ImportIcon from "@/components/Icons/ImportIcon.vue";
import { useEmailStore } from "@/stores/email.store.ts";
import Block from "@/components/Email/Templates/Blocks/Block.vue";
import Text from "@/components/Email/Templates/Elements/Text.vue";
import UnOrderedList from "../Email/Templates/Elements/UnOrderedList.vue";
import Button from "@/components/Email/Templates/Elements/Button.vue";
import Icon from "@/components/Email/Templates/Elements/Icon.vue";
import IconText from "@/components/Email/Templates/Elements/IconText.vue";
import OrderedList from "@/components/Email/Templates/Elements/OrderedList.vue";
import type {IEmailBlock, IEmailElement} from "@/types/types.ts";

const selectedFile = ref<File | null>(null);
const fileName = ref<string | null>(null);
const data = ref();
const emailStore = useEmailStore();
const fileInput = ref<HTMLInputElement | null>(null);

const emit = <
  {
    (event: "close-modal"): void;
  }
>defineEmits();

const componentMap = {
  Block,
  Text,
  Button,
  Icon,
  IconText,
  OrderedList,
  UnOrderedList,
};

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
    fileName.value = selectedFile.value.name;

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === "string") {
        try {
          data.value = JSON.parse(content);

          data.value.forEach((block: IEmailBlock) => {
            block.template = componentMap[block.template.__name];
            block.elements?.forEach((element: IEmailElement): void => {
              element.template = componentMap[element.template.__name];
            });
          });
        } catch (error) {
        }
      }
    };
    reader.readAsText(selectedFile.value);
  }
}

function handleUpdateBlocks() {
  emailStore.emailBlocks = data.value;
  emit("close-modal");
}
</script>

<template>
  <div>
    <div class="modal__header">
      <h4 class="modal__title">Импорт</h4>
      <p class="modal__text">
        Загрузите файл шаблона рассылки с вашего компьютера
      </p>
    </div>
    <div class="modal__field">
      <input
        class="modal__field-input"
        type="file"
        id="fileInput"
        ref="fileInput"
        @change="handleFileChange"
      />
      <label for="fileInput" class="modal__file-label">
        {{ fileName ? fileName : "Выберите файл" }}
      </label>
      <div class="modal__field-devider"></div>
      <button class="modal__field-btn" @click="handleUpdateBlocks">
        <ImportIcon color="var(--element-accent-color)" width="25" />
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
  display: none;
}

.modal__file-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50px;
  margin: 0;
  width: 412px;
  padding: 20px;
  transition: all 0.3s ease-in-out;
  font-style: italic;
  color: var(--element-accent-color);
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
