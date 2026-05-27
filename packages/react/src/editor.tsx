import { useEffect, useRef } from "react";
import { OpenRichEditor as CoreEditor, isClient } from "@openrich/core";
import type { EditorProps } from "./types";
import "@openrich/core/src/theme/variables.css";

export function OpenRichEditor({
    content,
    extensions,
    editable = true,
    onUpdate,
    onFocus,
    onBlur,
    locale,
    theme = "system",
    placeholder,
    className,
    style,
}: EditorProps) {
    const editorRef = useRef<CoreEditor | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize editor on mount
    useEffect(() => {
        if (!isClient || !containerRef.current) return;

        const editor = new CoreEditor({
            content,
            extensions,
            editable,
            locale,
            theme,
            placeholder,
            onUpdate,
            onFocus,
            onBlur,
        });

        containerRef.current.appendChild(editor.tiptapEditor.view.dom);
        editorRef.current = editor;

        return () => {
            editor.destroy();
            editorRef.current = null;
        };
    }, []);

    // Sync editable prop
    useEffect(() => {
        editorRef.current?.setEditable(editable);
    }, [editable]);

    // Sync theme prop
    useEffect(() => {
        editorRef.current?.setTheme(theme);
    }, [theme]);

    // Sync locale prop
    useEffect(() => {
        if (locale) editorRef.current?.setLocale(locale);
    }, [locale]);

    if (!isClient) {
        return <div data-openrich-editor data-theme={theme} className={className} style={style} />;
    }

    return (
        <div
            ref={containerRef}
            className={`openrich-editor${className ? ` ${className}` : ""}`}
            style={style}
        />
    );
}
