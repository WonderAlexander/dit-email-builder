<script setup lang="ts">
import type { IEmailBlock, IEmailElement } from "@/types/types.ts";
import ElementsListUI from "@/components/UI/ElementsListUI.vue";
import AddElementIcon from "@/components/Icons/AddElementIcon.vue";
import { ref } from "vue";
import { availableElements } from "@/utils/availableElements.ts";
import { useEmailStore } from "@/stores/email.store.ts";
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";
import BlockActions from "@/components/Editors/BlockActions.vue";
import ElementPositionDownIcon from "@/components/Icons/ElementPositionDownIcon.vue";
import ModalUI from "@/components/UI/ModalUI.vue";
import ModalContentDeleteBlock from "@/components/ModalContent/ModalContentDeleteBlock.vue";
import ToolTipUI from "@/components/UI/ToolTipUI.vue";

const { block, elements } = defineProps<{
  block: IEmailBlock;
  elements: IEmailElement[];
}>();

const emit = defineEmits<{
  (event: "selectElement", selectedElement: IEmailElement): void;
}>();

const emailStore = useEmailStore();
const isBlockActions = ref<boolean>(false);
const isAvailableElementsShowed = ref<boolean>(false);

function toggleAvailableElements() {
  isAvailableElementsShowed.value = !isAvailableElementsShowed.value;
}

function addNewElement(currentBlock: IEmailBlock, newElement: IEmailElement) {
  emailStore.addElement(currentBlock, newElement);
  toggleAvailableElements();
}

const setPositionUp = (block: IEmailBlock) => {
  emailStore.moveBlockUp(block);
};

const setPositionDown = (block: IEmailBlock) => {
  emailStore.moveBlockDown(block);
};

const isVisible = ref<boolean>(false);

const handleModal = () => {
  isVisible.value ? (isVisible.value = false) : (isVisible.value = true);
};

function handleDeleteElement(
  block: IEmailBlock,
  elementToDelete: IEmailElement,
) {
  emailStore.deleteElement(block, elementToDelete);
}
</script>

<template>
  <div
    class="block__wrapper"
    @mouseenter="isBlockActions = true"
    @mouseleave="
      ((isBlockActions = false), (isAvailableElementsShowed = false))
    "
  >
    <!-- БЛОК - ТЕКСТ ======================================================================================================================================= -->
    <tr>
      <td style="padding: 0">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="p10px" align="center" style="padding: 13px 42px 0 43px">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <th
                    class="stretch"
                    width="515"
                    align="center"
                    valign="middle"
                    style="padding: 0; vertical-align: top"
                  >
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      style="position: relative"
                    >
                      <!-- Верхняя граница -->
                      <tr>
                        <td>
                          <img
                            src="https://pic.mos.ru/srv/images/newEmails/assets/white-top.png"
                            width="515"
                            style="
                              border: none;
                              display: block;
                              max-width: 515px;
                              outline: 0;
                              width: 100%;
                              height: auto;
                            "
                          />
                        </td>
                      </tr>
                      <Component
                        v-for="(element, index) in elements"
                        :key="element.id"
                        :is="element.template"
                        :element="element"
                        :elements="elements"
                        :index="index"
                        @delete-element="
                          (elementToDelete: IEmailElement) =>
                            handleDeleteElement(block, elementToDelete)
                        "
                      />
                      <transition name="fade">
                        <div class="add__element" v-if="isBlockActions">
                          <ToolTipUI text="Добавить новый элемент">
                            <button class="add__element-btn">
                              <AddElementIcon
                                @click="toggleAvailableElements()"
                                :width="25"
                                color="var(--element-accent-color)"
                              />
                            </button>
                          </ToolTipUI>
                        </div>
                      </transition>
                      <ElementsListUI
                        v-if="isAvailableElementsShowed"
                        :elements="availableElements"
                        @element-click="
                          (newElement: IEmailElement) =>
                            addNewElement(block, newElement)
                        "
                      />

                      <!-- Нижняя граница -->
                      <tr>
                        <td
                          valign="top"
                          height="14"
                          style="
                            height: 14px;
                            line-height: 14px;
                            vertical-align: top;
                          "
                        >
                          <img
                            src="https://pic.mos.ru/srv/images/newEmails/assets/white-bottom.png"
                            width="515"
                            style="
                              border: none;
                              display: block;
                              max-width: 515px;
                              outline: 0;
                              width: 100%;
                              height: auto;
                              vertical-align: top;
                            "
                          />
                        </td>
                      </tr>
                    </table>
                  </th>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- КОНЕЦ БЛОК - ТЕКСТ ================================================================================================================================= -->

    <transition name="fade">
      <BlockActions
        v-if="isBlockActions"
        @set-position-up="setPositionUp(block)"
        @set-position-down="setPositionDown(block)"
        @delete-block="isVisible = true"
      />
    </transition>

    <ModalUI :visible="isVisible" @close-modal="handleModal()">
      <component :block="block" :is="ModalContentDeleteBlock" />
    </ModalUI>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.add__element {
  position: absolute;
  bottom: 3px;
  left: 48%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.add__element-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--element-accent-color);
  width: 16px;
  height: 16px;
  margin: 0 auto;
  border-radius: 50%;
}

.block__wrapper {
  position: relative;
}
</style>
