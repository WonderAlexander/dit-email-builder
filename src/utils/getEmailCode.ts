export const getEmailCode = (
  emailInner: any,
  emailBlocks: any,
  fileName: string,
): void => {
  let html = emailInner.innerHTML;

  const structural = [
    "div",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "td",
    "th",
    "section",
    "article",
    "header",
    "footer",
    "aside",
    "nav",
    "ul",
    "ol",
    "li",
    "form",
    "fieldset",
    "legend",
  ];

  const re = new RegExp("<\\/?(?:" + structural.join("|") + ")(?=\\s|>)", "gi");

  html = html.replace(re, function (match) {
    return "\n" + match;
  });

  let content = html;

  const jsonEmailBlocks = JSON.stringify(emailBlocks, null, 2);
  content = content.replace(/<u>(.*?)<\/u>/g, (match, innerContent) => {
    return `<u>${innerContent.slice(0, -1)}</u>`; // Удаляем последний символ
  });

  content = content.replace(
    /<table([^>]*) style="([^"]*)"/g,
    (match, attrs, styles) => {
      const additionalStyles =
        "mso-table-lspace:0pt; mso-table-rspace:0pt; mso-table-bspace:0pt; mso-table-tspace:0pt;";
      return `<table${attrs} style="${styles}; ${additionalStyles}"`;
    },
  );

  const emailCode = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;700&display=swap" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style type="text/css">
         p {
         margin: 0 !important;
         }
        a[x-apple-data-detectors]{color: inherit !important; text-decoration: none !important;}
        a[href^="tel"]:hover{text-decoration: none !important;}
        table td{mso-line-height-rule: exactly;}
        a {display: inline-block;}
        a img{border: none;}
        a span {display: inline-block;}
        img{width:auto;height:auto;border:none;}
        th{padding: 0;border-collapse:collapse!important;}
        td{text-decoration: none;border-collapse:collapse!important;}
        h1,h2,h3,h4,h5,h6{display:block;margin:0;padding:0;}
        u {display: inline-block;}
        @media only screen and (max-width:375px) and (min-width:374px) {.gmail-fix{min-width:374px !important;}}
        @media only screen and (max-width:414px) and (min-width:413px) {.gmail-fix{min-width:413px !important;}}
        @media only screen and (max-width:590px) {
            .flexible{width: 100% !important;}
            .img-flex img{width: 100% !important; height: auto !important;}
            .stretch{display: table !important; width: 100% !important;}
            .acenter{text-align: center!important;}
            .nobr {display:none!important;}
            .p10px {padding-left:10px!important;padding-right:10px!important;}
            .p30px {padding-left:30px!important;padding-right:30px!important;}
            .pt20px {padding-top:20px!important;}
            .s_title {font-size:20px!important;}
            .s_block_0 {padding:5px 20px 0 20px !important;}
            .s_block {padding:5px 20px 5px 20px !important;}
        }
        @media only screen and (max-width:330px) {
            .p10px {padding-left:15px!important;padding-right:15px!important;}
        }
    </style>
</head>
    <body bgcolor="#eaeaea" style="margin:0; padding:0; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
        ${content}
        <div style="display:none;white-space:nowrap;font:15px courier;line-height:0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
    </body>
    </html>
    `;

  const blob: Blob = new Blob([emailCode], { type: "text/html" });
  const url: string = URL.createObjectURL(blob);
  const a: HTMLAnchorElement = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.html`;
  a.click();
  URL.revokeObjectURL(url);

  const blobTxt: Blob = new Blob([emailCode], { type: "text/plain" });
  const urlTxt: string = URL.createObjectURL(blobTxt);
  const aTxt: HTMLAnchorElement = document.createElement("a");
  aTxt.href = urlTxt;
  aTxt.download = `${fileName}.txt`;
  aTxt.click();
  URL.revokeObjectURL(urlTxt);

  const blobEmailBlocks: Blob = new Blob([jsonEmailBlocks], {
    type: "text/plain",
  });
  const urlBlocks: string = URL.createObjectURL(blobEmailBlocks);
  const aBlocks: HTMLAnchorElement = document.createElement("a");
  aBlocks.href = urlBlocks;
  aBlocks.download = `${fileName}.json`;
  aBlocks.click();
  URL.revokeObjectURL(urlBlocks);
};
