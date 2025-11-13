<script setup lang="ts">
import { ref } from "vue";
import TipUI from "@/components/UI/ToolTipUI.vue";

const props = defineProps<{ selectedText: string; currentLink: string }>();

const emit = <
  {
    (event: "toggle-bold"): void;
    (event: "toggle-underline"): void;
    (event: "toggle-italic"): void;
    (event: "set-color", newColorHEX: string): void;
    (event: "delete-element"): void;
    (event: "set-link-text"): void;
    (event: "update-link", newLink: string): void;
    (event: "delete-link"): void;
  }
>defineEmits();

const newLink = ref(props.currentLink);
const customColor = ref("");

const isColorPickerShowed = ref<boolean>(false);
const isLinkEditorShowed = ref<boolean>(false);

const availableColors = ["#E51740", "#0563c1", "#6f2c9d", "#0066ff", "#000000"];

function toggleColorPicker() {
  isColorPickerShowed.value = !isColorPickerShowed.value;
}

function toggleLinkEditor() {
  isLinkEditorShowed.value = !isLinkEditorShowed.value;
  emit("set-link-text");
}

const setColorFromInput = () => {
  if (/^#[0-9A-F]{6}$/i.test(customColor.value)) {
    emit("set-color", customColor.value);
  }
};

function handleDeleteLink() {
  emit("delete-link");
  newLink.value = "";
}
</script>

<template>
  <div class="editor__toolbar">
    <div class="toolbar__settings">
      <button
        class="toolbar__settings-btn"
        :class="{ active: isBoldActive }"
        @click="emit('toggle-bold')"
      >
        <img
          class="toolbar__settings-icon"
          src="../../../assets/icons/toolbar/FontBold.svg"
          alt="Bold"
          style="width: 18px !important; height: 18px !important"
        />
      </button>
      <div class="actions__line"></div>
      <button
        class="toolbar__settings-btn"
        :class="{ active: isUnderlineActive }"
        @click="emit('toggle-underline')"
      >
        <img
          class="toolbar__settings-icon"
          src="../../../assets/icons/toolbar/FontUnderline.svg"
          alt="Underline"
        />
      </button>
      <div class="actions__line"></div>
      <button
        class="toolbar__settings-btn"
        :class="{ active: isItalicActive }"
        @click="emit('toggle-italic')"
      >
        <img
          class="toolbar__settings-icon"
          src="../../../assets/icons/toolbar/FontItalic.svg"
          alt="Italic"
        />
      </button>
      <div class="actions__line"></div>
      <div class="color__picker">
        <TipUI text="Изменить цвет текста">
          <button class="toolbar__settings-btn" @click="toggleColorPicker">
            <img
              class="toolbar__settings-icon"
              src="../../../assets/icons/toolbar/FontColor.svg"
              alt="Invert Color"
            />
          </button>
        </TipUI>
        <div v-show="isColorPickerShowed" class="color__picker-options">
          <div class="color__picker-colors">
            <button
              v-for="color in availableColors"
              type="button"
              :key="color"
              class="color__picker-color"
              @click="emit('set-color', color)"
              :style="{ backgroundColor: color }"
            ></button>
          </div>
          <input
            class="color__picker-input"
            type="text"
            placeholder="HEX"
            v-model.trim="customColor"
            @input="setColorFromInput"
          />
        </div>
      </div>
      <div class="actions__line"></div>
      <TipUI text="Удалить элемент">
        <button
          class="toolbar__settings-btn"
          :class="{ active: isItalicActive }"
          @click="emit('delete-element')"
        >
          <img
            class="toolbar__settings-icon"
            src="../../../assets/icons/toolbar/DeleteCan.svg"
            alt="Delete"
            style="width: 18px !important; height: 18px !important"
          />
        </button>
      </TipUI>
      <div class="actions__line"></div>
      <div class="toolbar__link">
        <TipUI text="Редактировать ссылку">
          <button class="toolbar__settings-btn" @click="toggleLinkEditor()">
            <img
              class="toolbar__settings-icon"
              src="../../../assets/icons/toolbar/LinkChain.svg"
              alt="Link"
            />
          </button>
        </TipUI>
      </div>
    </div>

    <div v-if="isLinkEditorShowed" class="link__editor">
      <label class="link__editor-label">
        <span class="link__editor-title">Текст ссылки</span>
        <span class="link__editor-link-text">{{ props.selectedText }}</span>
      </label>
      <label class="link__editor-label">
        <span class="link__editor-title">Адрес ссылки</span>
        <input
          class="link__editor-input"
          v-model.trim="newLink"
          @keyup.enter="emit('update-link', newLink)"
          placeholder="Введите URL"
        />
      </label>
      <div class="link__editor-btns">
        <TipUI text="Добавить ссылку">
          <button
            class="link__edit-btn"
            @click="emit('update-link', newLink)"
            style="margin-right: 8px; margin-left: 8px"
          >
            <img
              class="link__edit-icon"
              src="../../../assets/icons/SuccessSmall.svg"
              alt="Добавить"
            />
          </button>
        </TipUI>
        <div class="actions__line"></div>
        <TipUI text="Удалить ссылку">
          <button
            class="link__edit-btn"
            @click="handleDeleteLink"
            style="margin-left: 8px"
          >
            <img
              class="link__edit-icon"
              src="../../../assets/icons/OutlinedClose.svg"
              alt="Удалить"
            />
          </button>
        </TipUI>
      </div>
    </div>
  </div>
</template>

<style>
.editor__toolbar {
  position: absolute;
  display: flex;
  align-items: flex-end;
  top: -280px;
  left: -10px;
  z-index: 1000;
  width: 700px;
  height: 280px;
}

.toolbar__settings {
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: var(--neutral-bg-color);
  border-radius: 12px;
  box-shadow: var(--main-box-shadow);
  max-height: 42px;
  margin-right: 12px;
}

.toolbar__settings-btn {
  width: 48px;
  height: 42px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.toolbar__settings-btn:hover {
  background-color: var(--main-bg-color);
}

.toolbar__settings-icon {
  width: 24px;
  fill: var(--element-accent-color);
}

.toolbar__settings-btn.active {
  background-color: var(
    --main-bg-color
  );
}

.color__picker {
  display: flex;
  align-items: center;
}

.color__picker-options {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  justify-content: space-between;
  padding: 6px;
  background-color: var(--neutral-bg-color);
  border-radius: 12px;
}

.color__picker-colors {
  display: flex;
  gap: 3px;
}

.color__picker-color {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
}

.color__picker-input {
  font-size: 14px;
  font-style: italic;
  color: var(--primary-text-color);
  width: 75px;
  border-bottom: 1px solid var(--element-accent-color);
}

.link__editor-link-text {
  font-size: 14px;
  color: var(--primary-text-color);
}

.link__editor {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 6px;
  background-color: var(--neutral-bg-color);
  border-radius: 12px;
  box-shadow: var(--main-box-shadow);
}

.link__editor-label {
  margin-bottom: 3px;
}

.link__editor-title {
  font-size: 14px;
  color: var(--element-accent-color);
  margin-right: 6px;
}

.link__editor-input {
  font-size: 14px;
  font-style: normal;
  color: var(--primary-text-color);
  width: 175px;
  border-bottom: 1px solid var(--element-accent-color);
}

.link__editor-btns {
  display: flex;
}

.toolbar__link {
  display: flex;
  align-items: center;
}

.link__edit-icon {
  width: 18px;
  height: 18px;
}

.link__edit-btn {
  width: 24px;
  height: 24px;
}

.actions__line {
  height: 24px;
  width: 1px;
  background-color: var(--main-bg-color);
}
</style>
