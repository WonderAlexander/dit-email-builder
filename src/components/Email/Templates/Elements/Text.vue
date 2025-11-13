<script setup lang="ts">
import type { IEmailElement } from "@/types/types.ts";
import { onUnmounted, ref } from "vue";
import TextEditor from "@/components/Editors/TextEditor/TextEditor.vue";
import { useEmailStore } from "@/stores/email.store.ts";

const { element, elements, index } = defineProps<{
  element: IEmailElement;
  elements: IEmailElement[];
  index: number;
}>();

const emailStore = useEmailStore();

const emit = defineEmits<{
  (event: "delete-element", elementToDelete: IEmailElement): void;
}>();

const basic = "padding: 8px 24px 8px 24px;";
const top = "padding: 8px 24px 12px 24px;";
const middle = "padding: 0 24px 12px 24px;";
const bottom = "padding: 0 24px 8px 24px;";

const isEditable = ref<boolean>(false);
let timeoutId: ReturnType<typeof setTimeout>;

function toggleEditable() {
  isEditable.value = !isEditable.value;
}

function startTimeoutToDisableEditing() {
  timeoutId = setTimeout(() => {
    if (!isEditable.value) return; // Не меняем состояние, если он уже не редактируемый
    isEditable.value = false;
  }, 3000); // time in ms
}

onUnmounted(() => {
  clearTimeout(timeoutId);
});
</script>

<template>
  <tr>
    <td
      v-if="!emailStore.isEditable"
      class="s_block"
      width="515"
      bgcolor="#FFFFFF"
      align="left"
      valign="middle"
      v-html="element.text"
      :style="
        elements.length === 1
          ? basic
          : index === 0
            ? top
            : index === elements.length - 1
              ? bottom
              : middle
      "
      style="
        font-size: 16px;
        font-weight: 400;
        font-family: Helvetica, Arial, sans-serif;
        line-height: 20px;
        background: #ffffff;
        max-width: 515px;
      "
    ></td>
    <td
      v-if="emailStore.isEditable"
      class="s_block"
      width="515"
      bgcolor="#FFFFFF"
      align="left"
      valign="middle"
      :style="
        elements.length === 1
          ? basic
          : index === 0
            ? top
            : index === elements.length - 1
              ? bottom
              : middle
      "
      style="
        font-size: 16px;
        font-weight: 400;
        font-family: Helvetica, Arial, sans-serif;
        line-height: 20px;
        background: #ffffff;
        max-width: 515px;
      "
    >
      <TextEditor
        :text="element.text"
        @change-text="(val) => (element.text = val)"
        @delete-element="emit('delete-element', element)"
      />
    </td>
  </tr>
</template>

<style>
.s_block {
  position: relative;
}
</style>
