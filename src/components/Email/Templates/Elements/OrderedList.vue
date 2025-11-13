<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";
import type { IEmailElement } from "@/types/types.ts";
import TextEditor from "@/components/Editors/TextEditor/TextEditor.vue";

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
const bottom = "padding: 0 24px 12px 24px;";

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

const order = computed(() => {
  return (
    elements
      .filter((el) => el.name === "Нумерованный список")
      .indexOf(elements[index]) + 1
  );
});

const isEditable = ref<boolean>(false);
function toggleEditable() {
  isEditable.value = !isEditable.value;
}

let timeoutId: ReturnType<typeof setTimeout>;
function startTimeoutToDisableEditing() {
  timeoutId = setTimeout(() => {
    if (!isEditable.value) return; // Не меняем состояние, если он уже не редактируемый
    isEditable.value = false;
  }, 1000); // time in ms
}

onUnmounted(() => {
  clearTimeout(timeoutId);
});
</script>

<template>
  <!--Нумерованный список-->
  <tr @click="toggleEditable()" v-if="!isEditable">
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
      <table>
        <tr>
          <td
            bgcolor="#ffffff"
            align="left"
            valign="middle"
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
            <table cellpadding="0" cellspacing="0">
              <!-- Элемент списка -->
              <tr>
                <td
                  valign="top"
                  style="
                    color: #000000;
                    width: 20px;
                    text-align: left;
                    vertical-align: top;
                    font-size: 16px;
                    font-weight: 400;
                    font-family: Helvetica, Arial, sans-serif;
                    line-height: 20px;
                  "
                >
                  <span
                    style="
                      color: #000000;
                      width: 20px;
                      text-align: left;
                      vertical-align: top;
                      line-height: 20px;
                      font-size: 16px;
                    "
                    >{{ order }}.</span
                  >
                </td>
                <td
                  valign="top"
                  v-html="element.text"
                  style="
                    color: #000000;
                    font-size: 16px;
                    font-weight: 400;
                    font-family: Helvetica, Arial, sans-serif;
                    line-height: 20px;
                    vertical-align: top;
                  "
                ></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!--Конец Нумерованный список-->
  <tr v-if="isEditable" @mouseleave="startTimeoutToDisableEditing()">
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
      <table>
        <tr>
          <td
            bgcolor="#ffffff"
            align="left"
            valign="middle"
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
            <table cellpadding="0" cellspacing="0">
              <!-- Элемент списка -->
              <tr>
                <td
                  valign="top"
                  style="
                    color: #000000;
                    width: 20px;
                    text-align: left;
                    vertical-align: top;
                    line-height: 20px;
                    font-size: 16px;
                  "
                >
                  <span
                    style="
                      color: #000000;
                      width: 20px;
                      text-align: left;
                      vertical-align: top;
                      line-height: 20px;
                      font-size: 16px;
                    "
                    >{{ order }}.</span
                  >
                </td>
                <td
                  valign="top"
                  style="
                    color: #000000;
                    font-size: 16px;
                    font-weight: 400;
                    font-family: Helvetica, Arial, sans-serif;
                    line-height: 20px;
                    vertical-align: top;
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
      </table>
    </td>
  </tr>
</template>

<style scoped></style>
