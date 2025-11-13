import { nanoid } from "nanoid";
import type { IEmailElement } from "@/types/types.ts";
import Text from "@/components/Email/Templates/Elements/Text.vue";
import OrderedList from "@/components/Email/Templates/Elements/OrderedList.vue";
import UnOrderedList from "@/components/Email/Templates/Elements/UnOrderedList.vue";
import IconText from "@/components/Email/Templates/Elements/IconText.vue";
import Button from "@/components/Email/Templates/Elements/Button.vue";
import Person from "@/components/Email/Templates/Elements/Person.vue";

export const availableElements: IEmailElement[] = [
  {
    id: nanoid(),
    name: "Текст",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec pulvinar dolor, vel ullamcorper lorem. Fusce ac urna scelerisque nisl aliquet suscipit. Donec congue mollis nibh sed facilisis. Donec consectetur consectetur ligula vestibulum fermentum.",
    template: Text,
  },
  {
    id: nanoid(),
    name: "Ненумерованный список",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    template: UnOrderedList,
  },
  {
    id: nanoid(),
    name: "Нумерованный список",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    template: OrderedList,
  },
  {
    id: nanoid(),
    name: "Список с иконкой",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    iconSrc:
      "https://pic.mos.ru/srv/images/newEmails/assets/icons/Calendar.png",
    template: IconText,
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
  {
    id: nanoid(),
    name: "Персона",
    personImgSrc:
      "https://pic.mos.ru/srv/images/newEmails/assets/person-placeholder.png",
    personName: "Имя Фамилия",
    personJob: "Должность",
    template: Person,
  },
];
