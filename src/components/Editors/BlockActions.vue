<script setup lang="ts">
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";
import ElementPositionUpIcon from "@/components/Icons/ElementPositionUpIcon.vue";
import ElementPositionDownIcon from "@/components/Icons/ElementPositionDownIcon.vue";
import ToolTipUI from "@/components/UI/ToolTipUI.vue";

const emit = defineEmits<{
  (event: "set-position-up"): void;
  (event: "set-position-down"): void;
  (event: "delete-block"): void;
}>();
</script>

<template>
  <div class="block__actions">
    <ToolTipUI text="Переместить блок выше">
      <button @click="emit('set-position-up')" class="position__btn">
        <ElementPositionUpIcon
          color="var(--element-accent-color)"
          :width="28"
        />
      </button>
    </ToolTipUI>
    <ToolTipUI text="Переместить блок ниже">
      <button @click="emit('set-position-down')" class="position__btn">
        <ElementPositionDownIcon
          color="var(--element-accent-color)"
          :width="28"
          style="margin-top: 2px"
        />
      </button>
    </ToolTipUI>
    <ToolTipUI text="Удалить блок">
      <button @click="emit('delete-block')" class="position__btn">
        <DeleteIcon
          color="var(--element-accent-color)"
          :width="26"
          style="margin-top: 2px"
        />
      </button>
    </ToolTipUI>
  </div>
</template>

<style scoped>
.block__actions {
  height: 124px;
  position: absolute;
  right: -2%;
  top: 55%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.position__btn {
  width: 38px;
  height: 38px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: var(--neutral-bg-color);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.position__btn:hover {
  background-color: var(--main-bg-color);
}
</style>
