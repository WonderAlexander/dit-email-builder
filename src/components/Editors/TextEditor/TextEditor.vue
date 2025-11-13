<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, nextTick } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import { Focus } from "@tiptap/extensions";
import EditorToolbar from "@/components/Editors/TextEditor/EditorToolbar.vue";

const props = defineProps<{ text: string }>();
const emit = defineEmits<{
  (event: "change-text", text: string): void;
  (event: "delete-element"): void;
}>();

const containerRef = ref<HTMLElement | null>(null);
const currentLink = ref<string | undefined>("");
const currentSelectionText = ref<string | undefined>("");
const toolBarIsShowed = ref<boolean>(false);
const editor = useEditor({
  content: props.text,
  extensions: [
    StarterKit,
    Focus.configure({ className: "custom-focus", mode: "all" }),
    TextStyle,
    Color,
    Link.extend({
      protocols: ["http", "https", "mailto", "tel"],
      openOnClick: false,
      enableClickSelection: true,
    }),
  ],
  onUpdate: ({ editor }) => {
    const trimmedContent = editor.getHTML().trim();
    emit("change-text", trimmedContent);
  },
  onSelectionUpdate: ({ editor }) => {
    updateCurrentSelectionText(editor);
  },
  parseOptions: { preserveWhitespace: true },
});

function removeSelectionAndHideToolbar() {
  toolBarIsShowed.value = false;
  currentSelectionText.value = "";
  currentLink.value = "";
  const sel = window.getSelection();
  if (sel) sel.removeAllRanges();
  if (editor.value && editor.value.isFocused) {
    try {
      editor.value.commands.blur();
    } catch (e) {
    }
  }
}
function handlerOutsideClick(e: MouseEvent) {
  const target = e.target as Node | null;
  if (!containerRef.value) return;
  if (!target) return;
  if (!containerRef.value.contains(target)) {
    removeSelectionAndHideToolbar();
  }
}
function handlerFocusIn(e: FocusEvent) {
  if (!containerRef.value) return;
  const target = e.target as Node | null;
  if (target && containerRef.value.contains(target)) {
    updateCurrentSelectionText(editor.value);
  }
}
function handlerFocusOut(e: FocusEvent) {
  if (!containerRef.value) return;
  const related = e.relatedTarget as Node | null;
  if (!related || !containerRef.value.contains(related)) {
    removeSelectionAndHideToolbar();
  }
}
onMounted(async () => {
  await nextTick();
  if (editor.value) {
    editor.value.commands.focus();
  }
  document.addEventListener("mousedown", handlerOutsideClick);
  document.addEventListener("focusin", handlerFocusIn);
  document.addEventListener("focusout", handlerFocusOut);
});

onBeforeUnmount(() => {
  editor.value?.destroy();
  document.removeEventListener("mousedown", handlerOutsideClick);
  document.removeEventListener("focusin", handlerFocusIn);
  document.removeEventListener("focusout", handlerFocusOut);
});

const handleToggleBold = () => {
  editor.value?.chain().focus().toggleBold().run();
};
const handleToggleUnderline = () => {
  editor.value?.chain().focus().toggleUnderline().run();
};
const handleToggleItalic = () => {
  editor.value?.chain().focus().toggleItalic().run();
};
const handleSetColor = (newHEX: string) => {
  editor.value?.chain().focus().setColor(newHEX).run();
};
const handleDeleteElement = () => {
  emit("delete-element");
};
const handleUpdateLink = (newLink: string) => {
  if (newLink) {
    editor.value
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: newLink, target: "_blank" })
      .run();
    editor.value?.chain().focus().setColor("#E51740").run();
    editor.value?.chain().focus().setUnderline().run();
  }
};
const handleDeleteLink = () => {
  editor.value?.chain().focus().unsetLink().run();
  editor.value?.chain().focus().setColor("#000000").run();
  editor.value?.chain().focus().unsetUnderline().run();
};
function updateCurrentSelectionText(editorInstance = editor.value) {
  if (!editorInstance) {
    currentSelectionText.value = "";
    toolBarIsShowed.value = false;
    currentLink.value = "";
    return;
  }
  const elementLinkAttr = editorInstance.getAttributes("link");
  currentLink.value = elementLinkAttr?.href ?? "";
  const sel = editorInstance.state.selection;
  if (!sel) {
    currentSelectionText.value = "";
    toolBarIsShowed.value = false;
    return;
  }
  const { from, to } = sel;
  if (from === to) {
    currentSelectionText.value = "";
    toolBarIsShowed.value = false;
    return;
  }
  const text = editorInstance.state.doc.textBetween(from, to, "\n", " ");
  currentSelectionText.value = text ?? "";
  toolBarIsShowed.value = true;
}
</script>

<template>
  <div class="text__editor" ref="containerRef">
    <EditorToolbar
      v-if="(currentSelectionText?.length ?? 0) > 0 || toolBarIsShowed"
      :selected-text="currentSelectionText"
      :currentLink="currentLink"
      @toggle-bold="handleToggleBold()"
      @toggle-underline="handleToggleUnderline()"
      @toggle-italic="handleToggleItalic()"
      @set-color="(newHex: string) => handleSetColor(newHex)"
      @delete-element="handleDeleteElement()"
      @set-link-text="updateCurrentSelectionText()"
      @update-link="(newLink: string) => handleUpdateLink(newLink)"
      @delete-link="handleDeleteLink()"
    />

    <EditorContent class="editor__content" :editor="editor" />
  </div>
</template>

<style>
.text__editor {
  position: relative;
  display: flex;
  flex-direction: column;
}

.editor__content:focus {
  outline: none;
  border: none;
}

.ProseMirror * {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.ProseMirror:focus {
  outline: none !important;
}
</style>
