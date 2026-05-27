import { useEffect, useRef, useState } from "react";
import { OpenRichEditor, isClient } from "@openrich/core";
import type { OpenRichOptions } from "@openrich/core";

export function useEditor(options: Partial<OpenRichOptions> = {}) {
    const editorRef = useRef<OpenRichEditor | null>(null);
    const [editor, setEditor] = useState<OpenRichEditor | null>(null);

    useEffect(() => {
        if (!isClient) return;

        const instance = new OpenRichEditor(options);
        editorRef.current = instance;
        setEditor(instance);

        return () => {
            instance.destroy();
            editorRef.current = null;
            setEditor(null);
        };
    }, []);

    return editor;
}
