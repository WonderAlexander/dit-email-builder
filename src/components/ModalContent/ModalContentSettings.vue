<script setup lang="ts">
import { useEmailStore } from "@/stores/email.store.ts";
import InputFieldUI2 from "@/components/UI/InputFieldUI.vue";
import SectionUI from "@/components/UI/SectionUI.vue";

const emailStore = useEmailStore();
</script>

<template>
  <div>
    <div class="modal__header">
      <h4 class="modal__title">Основные настройки</h4>
    </div>
    <div class="panel__main">
      <SectionUI title="Прехедер рассылки">
        <InputFieldUI2
          v-model="emailStore.preHeader"
          :placeholder="
            emailStore.preHeader ? emailStore.preHeader : 'Текст прехедера'
          "
        />
      </SectionUI>

      <SectionUI title="Баннер рассылки">
        <InputFieldUI2
          v-model="emailStore.emailHeader.headerImageSrc"
          :placeholder="
            emailStore.emailHeader.headerImageSrc
              ? emailStore.emailHeader.headerImageSrc
              : 'https://pic.mos.ru/srv/images/newEmails/banners/shablon-banner.png'
          "
        />
      </SectionUI>

      <SectionUI title="Подвал рассылки">
        <InputFieldUI2
          v-model="emailStore.emailFooter.footerText"
          :placeholder="
            emailStore.emailFooter.footerText
              ? emailStore.emailFooter.footerText
              : 'команда сервиса «Управления персоналом»'
          "
        />
        <InputFieldUI2
          v-model="emailStore.emailFooter.footerImgSrc"
          :placeholder="
            emailStore.emailFooter.footerImgSrc
              ? emailStore.emailFooter.footerImgSrc
              : 'https://pic.mos.ru/srv/images/newEmails/assets/footer-icon.png'
          "
        />
      </SectionUI>
    </div>
  </div>
</template>

<style scoped>
.modal__header {
  margin-bottom: 12px;
}

.modal__title {
  display: inline-block;
  font-size: 22px;
  margin-bottom: 8px;
}

.modal__title:after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--element-accent-color);
}
</style>
