<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";
import ElementButtonEditor from "@/components/Editors/ElementButtonEditor.vue";
import type { IEmailElement } from "@/types/types.ts";
import DeleteElement from "@/components/Editors/DeleteElement.vue";
import TextEditor from "@/components/Editors/TextEditor/TextEditor.vue";

const { element } = defineProps<{
  element: IEmailElement;
}>();

const emit = defineEmits<{
  (event: "delete-element", elementToDelete: IEmailElement): void;
}>();

const buttonStyles = computed(() => {
  return `background-color: ${element.btnBgColor}; color: ${element.btnTextColor};`;
});

const roundRect = computed(() => {
  return `<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${element.btnLink}" style="mso-wrap-style:none; mso-fit-shape-to-text: true; height: 50px; v-text-anchor:middle; vertical-align: middle;" arcsize="20%" stroke="f" fillcolor="${element.btnBgColor}"><w:anchorlock/><center>`;
});

const outlookButton = computed(() => {
  return `
    <!--[if mso]>
      ${roundRect.value}
    <![endif]-->
    <a
      href="${element.btnLink}"
      style="${buttonStyles.value}; padding: 0 12px; border-radius: 8px; display: inline-block; font-family: 'Helvetica', Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 40px; text-align: center; text-decoration: none; -webkit-text-size-adjust: none;"
    >&nbsp;${element.btnText}&nbsp;</a
    >
   <!--[if mso]>
  </center>
  </v:roundrect>
  <![endif]-->
  `;
});

const isButtonEditable = ref<boolean>(false);
function toggleButtonEditable() {
  isButtonEditable.value = !isButtonEditable.value;
}

let timeoutId: ReturnType<typeof setTimeout>;
function startTimeoutToDisableEditing() {
  timeoutId = setTimeout(() => {
    if (!isButtonEditable.value) return; // Не меняем состояние, если он уже не редактируемый
    isButtonEditable.value = false;
  }, 1000); // time in ms
}

onUnmounted(() => {
  clearTimeout(timeoutId);
});
</script>

<template>
  <!--Кнопка-->
  <tr>
    <td
      class="s_block"
      bgcolor="#FFFFFF"
      align="left"
      valign="middle"
      style="
        padding: 8px 24px 8px 24px;
        color: #000000;
        font-size: 16px;
        font-weight: 400;
        font-family: &quot;Helvetica&quot;, Arial, sans-serif;
        line-height: 20px;
        background: #ffffff;
      "
    >
      <table
        border="0"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="
          width: 100%;
          font-family: &quot;Helvetica&quot;, Arial, sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          -webkit-text-size-adjust: none;
          vertical-align: middle;
        "
      >
        <tr>
          <td
            align="left"
            valign="middle"
            style="padding: 0; margin: 0; vertical-align: middle"
          >
            <div
              style="
                display: flex;
                position: relative;
                padding: 0;
                margin: 0;
                vertical-align: middle;
              "
            >
              <div
                @click.prevent="toggleButtonEditable()"
                v-html="outlookButton"
              ></div>

              <ElementButtonEditor
                v-if="isButtonEditable"
                @mouseleave="startTimeoutToDisableEditing()"
                :element="element"
              />
              <DeleteElement
                style="margin-left: 12px"
                @delete-element="emit('delete-element', element)"
                v-if="isButtonEditable"
                @mouseleave="startTimeoutToDisableEditing()"
              />
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!--Конец Кнопка-->
</template>
