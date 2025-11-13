<script setup lang="ts">
import type { ITab } from "@/types/types.ts";
const props = defineProps<{
  tabs: ITab[];
  activeTab: string;
}>();
const emit = defineEmits<{
  (event: "set-active-tab", tab: ITab): void;
}>();
const handleTabClick = (tab: ITab) => {
  emit("set-active-tab", tab);
};
</script>

<template>
  <div class="editor__tabs">
    <div
      class="editor__tabs-item"
      v-for="tab in props.tabs"
      :key="tab.label"
      :class="{ active: tab.label === props.activeTab }"
      @click="handleTabClick(tab)"
    >
      <div class="tabs__item-content">
        <component
          :is="tab.iconComponent"
          color="var(--element-accent-color)"
          :width="28"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor__tabs {
  display: flex;
  background-color: var(--neutral-bg-color);
  border-radius: 12px;
  box-shadow: var(--main-box-shadow);
  overflow: hidden;
  margin-bottom: 25px;
  max-width: 108px;
}

.editor__tabs-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 54px;
  height: 50px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.tabs__item-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.editor__tabs-item.active {
  background: var(--main-bg-color);
}

.editor__tabs-item:hover {
  background: var(--main-bg-color);
}
</style>
