<script setup lang="ts">
import { ref, watch } from "vue";
import { useEmailStore } from "@/stores/email.store.ts";
import Header from "@/components/Email/Templates/Header.vue";
import Footer from "@/components/Email/Templates/Footer.vue";
import EmailActionsPanel from "@/components/Email/EmailActionsPanel.vue";

const emailStore = useEmailStore();
const emailWrapper = ref(null);

watch(
  emailWrapper,
  (newValue) => {
    if (newValue) {
      emailStore.updateEmailHTML(newValue);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="builder__email">
    <EmailActionsPanel />

    <div ref="emailWrapper" class="email__wrapper">
      <table
        class="gmail-fix"
        width="100%"
        style="min-width: 320px; margin: 0; padding: 0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td
            style="
              color: #ffffff;
              font-size: 0;
              line-height: 0;
              margin: 0;
              max-height: 0;
              mso-hide: all;
              opacity: 0;
              overflow: hidden;
              padding: 0;
            "
          >
            {{ emailStore.preHeader }}
          </td>
        </tr>
        <tr>
          <td bgcolor="#eaeaea">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;width:600px;border-spacing:0;border-collapse:collapse;" >
            <tbody>
            <tr>
              <td align="center" valign="top" width="600" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
            <![endif]-->

            <table
              class="flexible"
              width="600"
              align="center"
              style="margin: 0 auto"
              cellpadding="0"
              cellspacing="0"
              bgcolor="#eaeaea"
            >
              <Header :headerImgSrc="emailStore.emailHeader.headerImageSrc" />

              <Component
                v-for="block in emailStore.emailBlocks"
                :key="block.id"
                :is="block.template"
                :elements="block.elements"
                :block="block"
              />

              <Footer
                :footerIconSrc="emailStore.emailFooter.footerImgSrc"
                :footerText="emailStore.emailFooter.footerText"
              />
            </table>

            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            <tbody>
            </table>
            <![endif]-->
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.builder__email {
  width: 100%;
  background-color: #eaeaea;
  overflow-y: auto;
  max-height: 100vh;
  padding: 110px 15px;

  scrollbar-width: none;
}

.builder__email::-webkit-scrollbar {
  display: none;
}

a[x-apple-data-detectors] {
  color: inherit !important;
  text-decoration: none !important;
}

a[href^="tel"]:hover {
  text-decoration: none !important;
}

table td {
  mso-line-height-rule: exactly;
}

a img {
  border: none;
}

img {
  width: auto;
  height: auto;
  border: none;
}

th {
  padding: 0;
  border-collapse: collapse !important;
}

td {
  text-decoration: none;
  border-collapse: collapse !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  display: block;
  margin: 0;
  padding: 0;
}

u {
  display: inline-block;
}

@media only screen and (max-width: 375px) and (min-width: 374px) {
  .gmail-fix {
    min-width: 374px !important;
  }
}
@media only screen and (max-width: 414px) and (min-width: 413px) {
  .gmail-fix {
    min-width: 413px !important;
  }
}
@media only screen and (max-width: 590px) {
  .flexible {
    width: 100% !important;
  }
  .img-flex img {
    width: 100% !important;
    height: auto !important;
  }
}
</style>
