import { createEffect, onCleanup, onMount } from "solid-js";
import { OpenRichEditor as CoreEditor, isClient } from "@openrich/core";
import type { EditorProps } from "./types";
import "@openrich/core/src/theme/variables.css";

export function OpenRichEditor(props: EditorProps) {
    let containerRef: HTMLDivElement | null = null;
    let editor: CoreEditor | null = null;

    onMount(() => {
        if (!isClient || !containerRef) return;
        editor = new CoreEditor({
            content: props.content,
            extensions: props.extensions,
            editable: props.editable,
            locale: props.locale,
            theme: props.theme ?? "system",
            placeholder: props.placeholder,
            onUpdate: props.onUpdate,
            onFocus: props.onFocus,
            onBlur: props.onBlur,
        });
        containerRef.appendChild(editor.tiptapEditor.view.dom);
    });

    onCleanup(() => {
        editor?.destroy();
        editor = null;
    });

    createEffect(() => {
        editor?.setEditable(props.editable ?? true);
    });

    createEffect(() => {
        editor?.setTheme(props.theme ?? "system");
    });

    createEffect(() => {
        if (props.locale) editor?.setLocale(props.locale);
    });

    if (!isClient) {
        return (
            <div
                data-openrich-editor
                data-theme={props.theme ?? "system"}
                className={props.className}
                style={props.style}
            />
        );
    }

    const cls = props.className ? `openrich-editor ${props.className}` : "openrich-editor";
    return (
        <div
            ref={(el) => {
                containerRef = el;
            }}
            className={cls}
            style={props.style}
        />
    );
}
