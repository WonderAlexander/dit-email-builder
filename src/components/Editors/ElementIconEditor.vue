<script setup lang="ts">
import { ref } from "vue";
import type { IIconPic } from "@/types/types.ts";

const props = defineProps<{
  iconSrc: string;
  availableIcons: IIconPic[];
}>();

const emit = defineEmits<{
  (event: "changeIcon", src: string): void;
}>();

const isShowed = ref<boolean>(false);

const handleChangeIcon = (newSrc: string) => {
  emit("changeIcon", newSrc);
};

const toggleIconsList = () => {
  isShowed.value = !isShowed.value;
};
</script>

<template>
  <div
    class="icon__editor"
    @mouseenter="toggleIconsList()"
    @mouseleave="toggleIconsList()"
  >
    <div v-if="isShowed" class="icons__list">
      <button
        class="icons__list-icon"
        v-for="icon in availableIcons"
        :key="icon.name"
        @click="handleChangeIcon(icon.iconSrc)"
      >
        <img
          :src="icon.iconSrc"
          alt="Иконка"
          width="24"
          style="
            border: none;
            display: block;
            width: 24px;
            outline: 0;
            height: auto;
          "
        />
      </button>
    </div>
    <img
      class="icon"
      :src="props.iconSrc"
      alt="Иконка"
      width="24"
      style="
        border: none;
        display: block;
        width: 24px;
        outline: 0;
        height: auto;
      "
    />
  </div>
</template>

<style scoped>
.icon__editor {
  position: relative;
}
.icon {
  width: 24px;
}
.icons__list {
  position: absolute;
  top: -140px;
  border-radius: 12px;
  background-color: var(--neutral-bg-color);
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  box-shadow: 3px 5px 16px 0 rgba(184, 197, 218, 0.5);
  cursor: pointer;
}

.icons__list::-webkit-scrollbar {
  display: none;
}

.icons__list-icon {
  width: 25px;
}
</style>
