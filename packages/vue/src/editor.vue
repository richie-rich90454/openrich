<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { OpenRichEditor, isClient } from "@openrich/core";
import "@openrich/core/src/theme/variables.css";

const props = withDefaults(
    defineProps<{
        content?: string | Record<string, unknown>;
        extensions?: any[];
        editable?: boolean;
        onUpdate?: (props: { editor: any; content: string }) => void;
        onFocus?: (props: { editor: any }) => void;
        onBlur?: (props: { editor: any }) => void;
        locale?: string | { dir: "ltr" | "rtl"; messages: Record<string, string> };
        theme?: "light" | "dark" | "system";
        placeholder?: string;
        className?: string;
        style?: Record<string, string>;
    }>(),
    {
        editable: true,
        theme: "system",
    },
);

const container = ref<HTMLDivElement>();
const editorRef = ref<OpenRichEditor | null>(null);

onMounted(() => {
    if (!isClient || !container.value) return;
    const editor = new OpenRichEditor({
        content: props.content,
        extensions: props.extensions,
        editable: props.editable,
        locale: props.locale,
        theme: props.theme,
        placeholder: props.placeholder,
        onUpdate: props.onUpdate,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
    });
    container.value.appendChild(editor.tiptapEditor.view.dom);
    editorRef.value = editor;
});

onUnmounted(() => {
    editorRef.value?.destroy();
    editorRef.value = null;
});

watch(
    () => props.editable,
    (val) => editorRef.value?.setEditable(val),
);
watch(
    () => props.theme,
    (val) => editorRef.value?.setTheme(val),
);
watch(
    () => props.locale,
    (val) => {
        if (val) editorRef.value?.setLocale(val);
    },
);
</script>

<template>
    <div
        v-if="!isClient"
        data-openrich-editor
        :data-theme="theme"
        :class="className"
        :style="style"
    />
    <div
        v-else
        ref="container"
        :class="['openrich-editor', className].filter(Boolean).join(' ')"
        :style="style"
    />
</template>
