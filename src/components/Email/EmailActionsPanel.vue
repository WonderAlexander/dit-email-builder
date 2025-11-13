<script setup lang="ts">
import ExportIcon from "@/components/Icons/ExportIcon.vue";
import ImportIcon from "@/components/Icons/ImportIcon.vue";
import ModalUI from "@/components/UI/ModalUI.vue";
import { computed, ref } from "vue";
import ModalContentExport from "@/components/ModalContent/ModalContentExport.vue";
import ModalContentImport from "@/components/ModalContent/ModalContentImport.vue";
import TabSettingsIcon from "@/components/Icons/TabSettingsIcon.vue";
import ModalContentSettings from "@/components/ModalContent/ModalContentSettings.vue";
import NewBlockIcon from "@/components/Icons/NewBlockIcon.vue";
import { availableBlocks } from "@/utils/availableBlocks.ts";
import type { IEmailBlock } from "@/types/types.ts";
import { useEmailStore } from "@/stores/email.store.ts";
import ToolTipUI from "@/components/UI/ToolTipUI.vue";

const emailStore = useEmailStore();
const isVisible = ref<boolean>(false);
const modalType = ref<string>('');
const isBlocksShowed = ref<boolean>(false);


const handleModal = (action: string) => {
  modalType.value = action;
  isVisible.value ? (isVisible.value = false) : (isVisible.value = true);
};


const actionsModalComponents: Map<string, any> = new Map([
  ["Экспортировать", ModalContentExport],
  ["Импортировать", ModalContentImport],
  ["Настройки", ModalContentSettings],
]);

const modalContent = computed(() => {
  return actionsModalComponents.get(modalType.value) || null;
});
const showBlocks = () => {
  isBlocksShowed.value = !isBlocksShowed.value;
};

function addNewBlock(newBlock: IEmailBlock) {
  emailStore.addBlock(newBlock);
  showBlocks();
}
</script>

<template>
  <div class="email__actions">
    <transition name="fade">
      <ul v-if="isBlocksShowed" class="blocks__list">
        <li
          class="blocks__list-item"
          v-for="block in availableBlocks"
          @click="addNewBlock(block)"
        >
          {{ block.name }}
        </li>
      </ul>
    </transition>

    <ToolTipUI text="Добавить новый блок">
      <div class="actions__blocks">
        <button class="actions__btn" @click="showBlocks()">
          <NewBlockIcon
            class="actions__btn-icon"
            :width="32"
            color="#9faaba"
            alt="Добавить блок"
          />
        </button>
      </div>
    </ToolTipUI>
    <div class="actions__panel">
      <div class="actions__panel-actions">
        <ToolTipUI text="Скачать файлы рассылки">
          <button class="actions__btn" @click="handleModal('Экспортировать')">
            <ExportIcon
              class="actions__btn-icon"
              :width="32"
              color="#9faaba"
              alt="Экспортировать"
            />
          </button>
        </ToolTipUI>
        <div class="actions__line"></div>
        <ToolTipUI text="Восстановить рассылку из шаблона">
          <button class="actions__btn" @click="handleModal('Импортировать')">
            <ImportIcon
              class="actions__btn-icon"
              :width="32"
              color="#9faaba"
              alt="Импортировать"
            />
          </button>
        </ToolTipUI>
        <div class="actions__line"></div>
        <ToolTipUI text="Основные настройки">
          <button class="actions__btn" @click="handleModal('Настройки')">
            <TabSettingsIcon
              class="actions__btn-icon"
              :width="32"
              color="#9faaba"
              alt="Настройки"
            />
          </button>
        </ToolTipUI>
      </div>
    </div>
  </div>
  <ModalUI :visible="isVisible" @close-modal="handleModal">
    <component :is="modalContent" @close-modal="handleModal" />
  </ModalUI>
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

.email__actions {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  background-color: transparent;
  width: 100%;
  max-width: 515px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px auto;
}

.blocks__list {
  position: absolute;
  left: -53%;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
  max-width: 300px;
  z-index: 1;
}

.blocks__list-item {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 8px;
  color: var(--element-accent-color);
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  flex-grow: 0;
  margin-left: auto;
  background-color: var(--neutral-bg-color);
  cursor: pointer;
}

.actions__blocks {
  height: 54px;
  background-color: var(--neutral-bg-color);
  border-radius: 16px;
  box-shadow: var(--main-box-shadow);
  overflow: hidden;
}

.actions__panel {
  max-width: 164px;
  height: 54px;
  background-color: var(--neutral-bg-color);
  border-radius: 16px;
  box-shadow: var(--main-box-shadow);
  overflow: hidden;
}

.actions__panel-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions__btn {
  width: 52px;
  height: 54px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.actions__btn:hover {
  background-color: var(--main-bg-color);
}

.actions__line {
  height: 30px;
  width: 1px;
  background-color: var(--main-bg-color);
}

.actions__btn:hover + .tooltip {
  display: block;
}
</style>
