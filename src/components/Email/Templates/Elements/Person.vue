<script setup lang="ts">
import type { IEmailElement } from "@/types/types.ts";
import TextEditor from "@/components/Editors/TextEditor/TextEditor.vue";
import { onUnmounted, ref } from "vue";

const { element } = defineProps<{
  element: IEmailElement;
}>();

const emit = defineEmits<{
  (event: "delete-element", elementToDelete: IEmailElement): void;
}>();

const isNameEditable = ref<boolean>(false);
const isJobEditable = ref<boolean>(false);
let timeoutId: ReturnType<typeof setTimeout>;

function toggleNameEditable() {
  isNameEditable.value = !isNameEditable.value;
}

function toggleJobEditable() {
  isJobEditable.value = !isJobEditable.value;
}

function startTimeoutToDisableEditing() {
  timeoutId = setTimeout(() => {
    if (!isNameEditable.value && !isJobEditable.value) return; // Не меняем состояние, если он уже не редактируемый
    isNameEditable.value = false;
    isJobEditable.value = false;
  }, 300); // time in ms
}

onUnmounted(() => {
  clearTimeout(timeoutId);
});
</script>

<template>
  <tr @mouseleave="startTimeoutToDisableEditing">
    <td
      class="s_block_0"
      bgcolor="#FFFFFF"
      align="left"
      valign="middle"
      style="
        padding: 8px 24px 12px 24px;
        color: #000000;
        font-size: 16px;
        font-weight: 400;
        font-family: &quot;Helvetica&quot;, Arial, sans-serif;
        line-height: 20px;
        background: #ffffff;
      "
    >
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td bgcolor="#FFFFFF" width="96" align="left" valign="top">
            <img
              :src="element.personImgSrc"
              width="80"
              style="
                -ms-interpolation-mode: bicubic;
                border: none;
                clear: both;
                display: block;
                max-width: 80px;
                outline: 0;
                text-decoration: none;
                width: 100%;
                height: auto;
                padding: 0;
                background: #ffffff;
              "
              alt=""
            />
          </td>
          <td
            bgcolor="#FFFFFF"
            align="left"
            valign="middle"
            style="
              padding: 0;
              color: #000000;
              font-size: 16px;
              font-weight: 400;
              font-family: &quot;Helvetica&quot;, Arial, sans-serif;
              line-height: 20px;
              background: #ffffff;
            "
          >
            <table cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td
                  @click="toggleNameEditable()"
                  v-if="!isNameEditable"
                  bgcolor="#FFFFFF"
                  align="left"
                  valign="middle"
                  style="
                    padding: 0;
                    color: #000000;
                    font-size: 16px;
                    font-weight: 400;
                    font-family: &quot;Helvetica&quot;, Arial, sans-serif;
                    line-height: 20px;
                    background: #ffffff;
                  "
                  v-html="element.personName"
                ></td>
                <td
                  v-if="isNameEditable"
                  bgcolor="#FFFFFF"
                  align="left"
                  valign="middle"
                  style="
                    padding: 0;
                    color: #000000;
                    font-size: 16px;
                    font-weight: 700 !important;
                    font-family: &quot;Helvetica&quot;, Arial, sans-serif;
                    line-height: 20px;
                    background: #ffffff;
                  "
                >
                  <TextEditor
                    :text="element.personName"
                    @change-text="(val) => (element.personName = val)"
                    @delete-element="emit('delete-element', element)"
                  />
                </td>
              </tr>
              <tr>
                <td
                  @click="toggleJobEditable()"
                  v-if="!isJobEditable"
                  bgcolor="#FFFFFF"
                  align="left"
                  valign="middle"
                  style="
                    padding: 0;
                    color: #000000;
                    font-size: 16px;
                    font-weight: 400;
                    font-family: &quot;Helvetica&quot;, Arial, sans-serif;
                    line-height: 20px;
                    background: #ffffff;
                  "
                  v-html="element.personJob"
                ></td>
                <td
                  v-if="isJobEditable"
                  bgcolor="#FFFFFF"
                  align="left"
                  valign="middle"
                  style="
                    padding: 0;
                    color: #000000;
                    font-size: 16px;
                    font-weight: 400;
                    font-family: &quot;Helvetica&quot;, Arial, sans-serif;
                    line-height: 20px;
                    background: #ffffff;
                  "
                >
                  <TextEditor
                    :text="element.personJob"
                    @change-text="(val) => (element.personJob = val)"
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
