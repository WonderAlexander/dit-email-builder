<script setup lang="ts">
import type { IEmailElement } from "@/types/types.ts";
import { availableIcons } from "@/utils/availableIcons.ts";
import ElementIconEditor from "@/components/Editors/ElementIconEditor.vue";
import { onUnmounted, ref } from "vue";
import DeleteElement from "@/components/Editors/DeleteElement.vue";

const { element } = defineProps<{ element: IEmailElement }>();

const isIconEditable = ref<boolean>(false);
function toggleIconEditable() {
  isIconEditable.value = !isIconEditable.value;
}

let timeoutId: ReturnType<typeof setTimeout>;
function startTimeoutToDisableEditing() {
  timeoutId = setTimeout(() => {
    if (!isIconEditable.value) return; // Не меняем состояние, если он уже не редактируемый
    isIconEditable.value = false;
  }, 1000); // time in ms
}

onUnmounted(() => {
  clearTimeout(timeoutId);
});
</script>

<template>
  <tr>
    <td
      v-if="!isIconEditable"
      @click="toggleIconEditable()"
      class="s_block_0"
      bgcolor="#ffffff"
      align="left"
      valign="middle"
      style="padding: 8px 24px 16px 24px; background: #ffffff"
    >
      <img
        :src="element.iconSrc"
        width="24"
        height="24"
        style="
          border: none;
          display: block;
          width: 24px;
          height: 24px;
          outline: 0;
        "
        alt="Иконка"
      />
    </td>
    <td
      v-if="isIconEditable"
      @mouseleave="startTimeoutToDisableEditing()"
      class="s_block_0"
      bgcolor="#ffffff"
      align="left"
      valign="middle"
      style="padding: 8px 24px 16px 24px; background: #ffffff"
    >
      <ElementIconEditor
        :icon-src="element.iconSrc"
        :available-icons="availableIcons"
        @change-icon="(val: string) => (element.iconSrc = val)"
      />
    </td>
  </tr>
</template>
