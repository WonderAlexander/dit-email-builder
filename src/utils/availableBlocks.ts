import { nanoid } from "nanoid";
import type { IEmailBlock } from "@/types/types.ts";
import Text from "@/components/Email/Templates/Elements/Text.vue";
import Block from "@/components/Email/Templates/Blocks/Block.vue";
import OrderedList from "@/components/Email/Templates/Elements/OrderedList.vue";
import UnOrderedList from "@/components/Email/Templates/Elements/UnOrderedList.vue";
import IconText from "@/components/Email/Templates/Elements/IconText.vue";
import Button from "@/components/Email/Templates/Elements/Button.vue";
import Icon from "@/components/Email/Templates/Elements/Icon.vue";

export const availableBlocks: IEmailBlock[] = [
  {
    id: nanoid(),
    name: "Текстовый блок",
    template: Block,
    elements: [
      {
        id: nanoid(),
        name: "Текст",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec pulvinar dolor, vel ullamcorper lorem. Fusce ac urna scelerisque nisl aliquet suscipit. Donec congue mollis nibh sed facilisis. Donec consectetur consectetur ligula vestibulum fermentum.",
        template: Text,
      },
    ],
  },
  {
    id: nanoid(),
    name: "Блок с нумерованным список",
    template: Block,
    elements: [
      {
        id: nanoid(),
        name: "Нумерованный список",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        template: OrderedList,
      },
      {
        id: nanoid(),
        name: "Нумерованный список",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        template: OrderedList,
      },
      {
        id: nanoid(),
        name: "Нумерованный список",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        template: OrderedList,
      },
    ],
  },
  {
    id: nanoid(),
    name: "Блок с ненумерованным список",
    template: Block,
    elements: [
      {
        id: nanoid(),
        name: "Ненумерованный список",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        template: UnOrderedList,
      },
      {
        id: nanoid(),
        name: "Ненумерованный список",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        template: UnOrderedList,
      },
      {
        id: nanoid(),
        name: "Ненумерованный список",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        template: UnOrderedList,
      },
    ],
  },
  {
    id: nanoid(),
    name: "Блок со списком с иконками",
    template: Block,
    elements: [
      {
        id: nanoid(),
        name: "Текст с иконкой",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        iconSrc:
          "https://pic.mos.ru/srv/images/newEmails/assets/icons/Calendar.png",
        template: IconText,
      },
      {
        id: nanoid(),
        name: "Текст с иконкой",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        iconSrc:
          "https://pic.mos.ru/srv/images/newEmails/assets/icons/Phone.png",
        template: IconText,
      },
      {
        id: nanoid(),
        name: "Текст с иконкой",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        iconSrc:
          "https://pic.mos.ru/srv/images/newEmails/assets/icons/Mail.png",
        template: IconText,
      },
    ],
  },
  {
    id: nanoid(),
    name: "Текстовый блок с кнопкой",
    template: Block,
    elements: [
      {
        id: nanoid(),
        name: "Текст",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec pulvinar dolor, vel ullamcorper lorem. Fusce ac urna scelerisque nisl aliquet suscipit. Donec congue mollis nibh sed facilisis. Donec consectetur consectetur ligula vestibulum fermentum.",
        template: Text,
      },
      {
        id: nanoid(),
        name: "Кнопка",
        btnText: "Нажми на меня",
        btnLink: "https://spk.mos.ru/template/224035",
        btnBgColor: "#E51740",
        btnTextColor: "#FFFFFF",
        template: Button,
      },
    ],
  },
  {
    id: nanoid(),
    name: "Текстовый блок с иконкой",
    template: Block,
    elements: [
      {
        id: nanoid(),
        name: "Иконка",
        iconSrc:
          "https://pic.mos.ru/srv/images/newEmails/assets/icons/party.png",
        template: Icon,
      },
      {
        id: nanoid(),
        name: "Текст",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec pulvinar dolor, vel ullamcorper lorem. Fusce ac urna scelerisque nisl aliquet suscipit. Donec congue mollis nibh sed facilisis. Donec consectetur consectetur ligula vestibulum fermentum.",
        template: Text,
      },
    ],
  },
];
