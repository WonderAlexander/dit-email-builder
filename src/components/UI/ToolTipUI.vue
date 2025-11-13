<script setup lang="ts">
import { ref, defineProps } from "vue";

const { text } = defineProps<{
  text: string;
}>();

const showTooltip = ref(false);
const tooltipStyle = ref({});

const updateTooltipPosition = (event: MouseEvent) => {
  tooltipStyle.value = {
    position: "absolute",
    top: `${event.clientY - 40}px`,
    left: `${event.clientX}px`,
    transform: "translate(-50%, -100%)",
  };
};
</script>

<template>
  <div
    class="tooltip-wrapper"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
    @mousemove="updateTooltipPosition"
  >
    <slot></slot>
    <Teleport to="body">
      <transition name="fade">
        <div v-if="showTooltip" class="tooltip" :style="tooltipStyle">
          {{ text }}
        </div>
      </transition>
    </Teleport>
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

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip {
  background-color: var(--neutral-bg-color);
  color: #a1a9bd;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 14px;
  border-radius: 8px;
  white-space: nowrap;
  z-index: 999999;
  transition: opacity 0.2s;
}
</style>
