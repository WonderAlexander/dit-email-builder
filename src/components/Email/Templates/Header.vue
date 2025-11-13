<script setup lang="ts">
const props = defineProps(["headerImgSrc"]);
</script>

<template>
  <!-- БАННЕР ======================================================================================================================================= -->
  <tr>
    <td style="padding: 0">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="p10px" align="left" style="padding: 0">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td
                  align="center"
                  style="
                    padding: 13px 0 0 0;
                    color: #ff0000;
                    font-size: 15px;
                    font-weight: 600;
                    font-family: &quot;Helvetica&quot;, Arial, sans-serif;
                  "
                >
                  <img
                    :src="
                      props.headerImgSrc.trim()
                        ? props.headerImgSrc
                        : 'https://pic.mos.ru/srv/images/newEmails/banners/shablon-banner.png'
                    "
                    width="515"
                    height="170"
                    alt=""
                    style="
                      -ms-interpolation-mode: bicubic;
                      border: none;
                      clear: both;
                      display: block;
                      max-width: 515px;
                      outline: 0;
                      text-decoration: none;
                      width: 100%;
                      height: auto;
                    "
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- КОНЕЦ БАННЕР ======================================================================================================================================= -->
</template>
