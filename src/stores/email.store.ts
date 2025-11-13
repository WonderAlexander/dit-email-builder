import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  IEmailBlock,
  IEmailElement,
  IEmailHeader,
  IEmailFooter,
} from "../types/types";
import Block from "@/components/Email/Templates/Blocks/Block.vue";
import Text from "@/components/Email/Templates/Elements/Text.vue";
import { cloneDeep } from "lodash";
import { nanoid } from "nanoid";
import { getEmailCode } from "@/utils/getEmailCode.ts";

export const useEmailStore = defineStore("email", () => {
  const preHeader = ref<string>("");
  const emailHeader = ref<IEmailHeader>({
    headerImageSrc: "",
  });

  const emailBlocks = ref<IEmailBlock[]>([
    {
      id: "defaultId",
      name: "Текстовый блок",
      template: Block,
      elements: [
        {
          id: "defaultId",
          name: "Текст",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec pulvinar dolor, vel ullamcorper lorem. Fusce ac urna scelerisque nisl aliquet suscipit. Donec congue mollis nibh sed facilisis. Donec consectetur consectetur ligula vestibulum fermentum.",
          template: Text,
        },
      ],
    },
  ]);

  const emailFooter = ref<IEmailFooter>({
    footerText: "",
    footerImgSrc: "",
  });

  const emailHTML = ref();
  const emailFileName = ref<string>("");

  const isEditable = ref<boolean>(true);

  const addBlock = (block: IEmailBlock): void => {
    const newBlock: IEmailBlock = cloneDeep(block);
    newBlock.id = nanoid();
    emailBlocks.value.push(newBlock);
  };

  const addElement = (block: IEmailBlock, element: IEmailElement): void => {
    const newElement: IEmailElement = cloneDeep(element);
    newElement.id = nanoid();
    block.elements?.push(newElement);
  };

  const deleteBlock = (selectedBlock: IEmailBlock): void => {
    emailBlocks.value = emailBlocks.value.filter(
      (block: IEmailBlock): boolean => block.id !== selectedBlock.id,
    );
  };

  const deleteElement = (block: IEmailBlock, deletingElement: IEmailElement) =>
    (block.elements = block.elements?.filter(
      (element: IEmailElement): boolean => element.id !== deletingElement.id,
    ));

  const updateEmailHTML = (newHTML: HTMLElement) => {
    emailHTML.value = newHTML;
  };

  const changeElementIconSrc = (element: IEmailElement, newSrc: string) => {
    element.iconSrc = newSrc;
  };

  function downloadEmailCode() {
    getEmailCode(emailHTML.value, emailBlocks.value, emailFileName.value);
  }

  const moveBlockUp = (blockToMove: IEmailBlock) => {
    const blocks = emailBlocks.value;
    const index = blocks.findIndex((block) => block.id === blockToMove.id);
    if (index > 0) {
      const temp = blocks[index - 1];
      blocks[index - 1] = blockToMove;
      blocks[index] = temp;
    }
  };

  const moveBlockDown = (blockToMove: IEmailBlock) => {
    const blocks = emailBlocks.value;
    const index = blocks.findIndex((block) => block.id === blockToMove.id);
    if (index < blocks.length - 1) {
      const temp = blocks[index + 1];
      blocks[index + 1] = blockToMove;
      blocks[index] = temp;
    }
  };

  function setUnEditable() {
    isEditable.value = !isEditable.value;
  }

  return {
    preHeader,
    emailHeader,
    emailBlocks,
    emailFooter,
    emailHTML,
    emailFileName,
    addBlock,
    deleteBlock,
    addElement,
    deleteElement,
    updateEmailHTML,
    changeElementIconSrc,
    downloadEmailCode,
    moveBlockUp,
    moveBlockDown,
    isEditable,
    setUnEditable,
  };
});
