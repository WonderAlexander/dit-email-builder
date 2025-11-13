<script setup lang="ts">
import CloseIcon from "@/components/Icons/CloseIcon.vue";

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (event: "close-modal"): void;
}>();

function closeModal() {
  emit("close-modal");
}

function handleOverlayClick() {
  closeModal();
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="props.visible"
      class="modal__overlay"
      @click.self="handleOverlayClick"
    >
      <div class="modal__content">
        <button class="modal__close" @click="closeModal">
          <CloseIcon color="#9faaba" :width="28" />
        </button>
        <slot @close-modal="closeModal"></slot>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal__content {
  position: relative;
  max-width: 550px;
  background: var(--main-bg-color);
  padding: 42px;
  border-radius: 12px;
  min-width: 300px;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
}

.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
