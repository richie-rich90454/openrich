import { onMount, onCleanup, createSignal } from "solid-js";
import { OpenRichEditor, isClient } from "@openrich/core";
import type { OpenRichOptions } from "@openrich/core";

export function createEditor(options: Partial<OpenRichOptions> = {}) {
    const [editor, setEditor] = createSignal<OpenRichEditor | null>(null);

    onMount(() => {
        if (!isClient) return;
        const instance = new OpenRichEditor(options);
        setEditor(() => instance);
    });

    onCleanup(() => {
        editor()?.destroy();
        setEditor(() => null);
    });

    return editor;
}
