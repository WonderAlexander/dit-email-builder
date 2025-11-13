<script setup lang="ts">
const props = defineProps(["footerIconSrc", "footerText"]);
</script>

<template>
  <!-- ПОДВАЛ ======================================================================================================================================= -->
  <tr>
    <td style="padding: 0">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="p10px" align="center" style="padding: 13px 42px 13px 43px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <th
                  class="stretch"
                  width="515"
                  align="center"
                  valign="middle"
                  style="padding: 0; vertical-align: top"
                >
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <img
                          src="https://pic.mos.ru/srv/images/newEmails/assets/gray-top.png"
                          width="515"
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
                    <tr>
                      <td
                        class="s_block"
                        bgcolor="#89919E"
                        align="left"
                        valign="middle"
                        style="
                          padding: 4px 24px 4px 24px;
                          color: #000000;
                          font-size: 16px;
                          font-weight: 400;
                          font-family: Helvetica, Arial, sans-serif;
                          line-height: 20px;
                          background: #89919e;
                        "
                      >
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td
                              bgcolor="#89919E"
                              align="left"
                              valign="middle"
                              style="
                                padding: 0;
                                color: #ffffff;
                                font-size: 16px;
                                font-weight: 400;
                                font-family: Helvetica, Arial, sans-serif;
                                line-height: 20px;
                                background: #89919e;
                              "
                            >
                              С уважением,<br />
                              {{
                                props.footerIconSrc.trim()
                                  ? props.footerIconSrc
                                  : "команда сервиса «Управления персоналом»"
                              }}
                            </td>
                            <td
                              bgcolor="#89919E"
                              width="50"
                              align="right"
                              valign="middle"
                              style="width: 50px; background: #89919e"
                            >
                              <img
                                :src="
                                  props.footerIconSrc.trim()
                                    ? props.footerIconSrc
                                    : 'https://pic.mos.ru/srv/images/%D0%98%D0%A2%20%D0%A0%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D1%8F/IT_Solutions_znak%202.png'
                                "
                                width="45"
                                height="53"
                                style="
                                  border: 0;
                                  display: block;
                                  width: 45px;
                                  outline: 0;
                                  height: 53px;
                                  padding: 0;
                                  vertical-align: middle;
                                "
                                alt=""
                              />
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td
                        valign="top"
                        height="14"
                        style="
                          height: 14px;
                          line-height: 14px;
                          vertical-align: top;
                        "
                      >
                        <img
                          src="https://pic.mos.ru/srv/images/newEmails/assets/gray-bottom.png"
                          width="515"
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
                </th>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- КОНЕЦ ПОДВАЛ ======================================================================================================================================= -->
</template>
