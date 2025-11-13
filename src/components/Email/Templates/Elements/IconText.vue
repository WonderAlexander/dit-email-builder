<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";
import type { IEmailElement } from "@/types/types.ts";
import TextEditor from "@/components/Editors/TextEditor/TextEditor.vue";
import ElementIconEditor from "@/components/Editors/ElementIconEditor.vue";
import { availableIcons } from "@/utils/availableIcons.ts";

const { element, elements, index } = defineProps<{
  element: IEmailElement;
  elements: IEmailElement[];
  index: number;
}>();

const emit = defineEmits<{
  (event: "delete-element", elementToDelete: IEmailElement): void;
}>();

const basic = "padding: 8px 24px 8px 24px;";
const top = "padding: 8px 24px 8px 24px;";
const middle = "padding: 0 24px 8px 24px;";
const bottom = "padding: 0 24px 8px 24px;";

const padding = computed(() => {
  if (elements.length === 1) {
    return basic;
  } else if (index === 0) {
    return top;
  } else if (index === elements.length - 1) {
    return bottom;
  } else {
    return middle;
  }
});

const isTextEditable = ref<boolean>(false);
const isIconEditable = ref<boolean>(false);
function toggleTextEditable() {
  isTextEditable.value = !isTextEditable.value;
}

function toggleIconEditable() {
  isIconEditable.value = !isIconEditable.value;
}

let timeoutId: ReturnType<typeof setTimeout>;
function startTimeoutToDisableEditing() {
  timeoutId = setTimeout(() => {
    if (!isTextEditable.value) return; // Не меняем состояние, если он уже не редактируемый
    isTextEditable.value = false;
  }, 1000); // time in ms
}

onUnmounted(() => {
  clearTimeout(timeoutId);
});
</script>

<template>
  <!-- Текст + иконка -->
  <tr @mouseleave="startTimeoutToDisableEditing">
    <td
      class="s_block"
      bgcolor="#FFFFFF"
      align="left"
      valign="middle"
      :style="padding"
      style="
        color: #000000;
        font-size: 16px;
        font-weight: 400;
        font-family: Helvetica, Arial, sans-serif;
        line-height: 20px;
        background: #ffffff;
      "
    >
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td
            v-if="!isIconEditable"
            bgcolor="#ffffff"
            width="32"
            align="left"
            valign="top"
          >
            <img
              @click="toggleIconEditable()"
              :src="element.iconSrc"
              width="24"
              style="
                -ms-interpolation-mode: bicubic;
                border: none;
                clear: both;
                display: block;
                max-width: 24px;
                outline: 0;
                text-decoration: none;
                width: 100%;
                height: auto;
                padding: 0;
                background: #ffffff;
              "
              alt="1"
            />
          </td>
          <td
            v-if="isIconEditable"
            bgcolor="#ffffff"
            width="32"
            align="left"
            valign="top"
            @mouseleave="startTimeoutToDisableEditing"
          >
            <ElementIconEditor
              :icon-src="element.iconSrc"
              :available-icons="availableIcons"
              @change-icon="(val: string) => (element.iconSrc = val)"
            />
          </td>
          <td
            v-if="!isTextEditable"
            @click="toggleTextEditable()"
            bgcolor="#ffffff"
            v-html="element.text"
            align="left"
            valign="bottom"
            style="
              padding: 0;
              color: #000000;
              font-size: 16px;
              font-weight: 400;
              font-family: Helvetica, Arial, sans-serif;
              line-height: 20px;
              background: #ffffff;
            "
          ></td>
          <td
            v-if="isTextEditable"
            @mouseleave="startTimeoutToDisableEditing"
            bgcolor="#ffffff"
            align="left"
            valign="bottom"
            style="
              padding: 0;
              color: #000000;
              font-size: 16px;
              font-weight: 400;
              font-family: Helvetica, Arial, sans-serif;
              line-height: 20px;
              background: #ffffff;
            "
          >
            <TextEditor
              :text="element.text"
              @change-text="(val) => (element.text = val)"
              @delete-element="emit('delete-element', element)"
            />
          </td>
        </tr>
      </table>
    </td>
  </tr>
</template>
