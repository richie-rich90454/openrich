import type { SerializedDoc } from "../types";
import { serializeHTML } from "./to-html";
import { serializeJSON } from "./to-json";
import { serializeText } from "./to-text";
import { serializeMarkdown } from "./to-markdown";

export { serializeHTML } from "./to-html";
export { serializeJSON } from "./to-json";
export { serializeText } from "./to-text";
export { serializeMarkdown } from "./to-markdown";
export { renderStatic } from "../render-static";

export function serializeDoc(doc: any, extensions?: any[]): SerializedDoc {
    return {
        html: serializeHTML(doc, extensions),
        json: serializeJSON(doc),
        text: serializeText(doc),
        markdown: serializeMarkdown(doc, extensions),
    };
}
