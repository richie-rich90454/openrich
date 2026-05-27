import { type Node as ProseMirrorNode, type Schema, DOMSerializer } from "prosemirror-model";

// ---------------------------------------------------------------------------
// Minimal SSR DOM implementation
// ---------------------------------------------------------------------------
// DOMSerializer.createElement/createTextNode etc. need a `document`-like
// object.  This shim provides just enough surface area to produce an in-memory
// tree that we can later walk to build an HTML string – no browser DOM needed.

const VOID_ELEMENTS = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------------------
class SSRTextNode {
    nodeType = 3;
    text: string;

    constructor(text: string) {
        this.text = text;
    }

    get textContent(): string {
        return this.text;
    }
}

// ---------------------------------------------------------------------------
class SSRElement {
    nodeType = 1;
    tagName: string;
    attrs: Record<string, string> = {};
    childNodes: (SSRElement | SSRTextNode)[] = [];
    /** When set directly (e.g. via a custom toDOM), child nodes are cleared. */
    forcedText: string | null = null;

    constructor(tagName: string) {
        this.tagName = tagName.toUpperCase();
    }

    setAttribute(name: string, value: string): void {
        this.attrs[name] = value;
    }

    getAttribute(name: string): string | undefined {
        return this.attrs[name];
    }

    appendChild(child: SSRElement | SSRTextNode): SSRElement | SSRTextNode {
        this.childNodes.push(child);
        return child;
    }

    get textContent(): string {
        if (this.forcedText !== null) return this.forcedText;
        return this.childNodes.map((c) => c.textContent).join("");
    }

    set textContent(value: string) {
        this.forcedText = value;
        this.childNodes = [];
    }

    get className(): string {
        return this.attrs["class"] ?? "";
    }

    set className(value: string) {
        if (value) {
            this.attrs["class"] = value;
        } else {
            delete this.attrs["class"];
        }
    }
}

// ---------------------------------------------------------------------------
class SSRDocumentFragment {
    nodeType = 11;
    childNodes: (SSRElement | SSRTextNode)[] = [];

    appendChild(child: SSRElement | SSRTextNode): SSRElement | SSRTextNode {
        this.childNodes.push(child);
        return child;
    }

    get textContent(): string {
        return this.childNodes.map((c) => c.textContent).join("");
    }
}

// ---------------------------------------------------------------------------
function createSSRDocument() {
    return {
        createElement(tagName: string): SSRElement {
            return new SSRElement(tagName);
        },
        createElementNS(_ns: string, tagName: string): SSRElement {
            return new SSRElement(tagName);
        },
        createTextNode(text: string): SSRTextNode {
            return new SSRTextNode(text);
        },
        createDocumentFragment(): SSRDocumentFragment {
            return new SSRDocumentFragment();
        },
    };
}

// ---------------------------------------------------------------------------
function serializeFragmentToString(fragment: SSRDocumentFragment): string {
    const parts: string[] = [];
    for (const child of fragment.childNodes) {
        parts.push(serializeNodeToString(child));
    }
    return parts.join("");
}

function serializeNodeToString(node: SSRElement | SSRTextNode): string {
    if (node.nodeType === 3) {
        return escapeHtml((node as SSRTextNode).text);
    }

    const el = node as SSRElement;
    const tag = el.tagName.toLowerCase();

    // Serialize attributes (Object.keys for ES2015 compat)
    let attrs = "";
    const keys = Object.keys(el.attrs);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]!;
        const val = el.attrs[key];
        if (val != null) {
            attrs += ` ${key}="${escapeHtml(String(val))}"`;
        }
    }

    if (VOID_ELEMENTS.has(tag)) {
        return `<${tag}${attrs}>`;
    }

    let contents: string;
    if (el.forcedText !== null) {
        contents = escapeHtml(el.forcedText);
    } else {
        contents = el.childNodes.map((c) => serializeNodeToString(c)).join("");
    }

    return `<${tag}${attrs}>${contents}</${tag}>`;
}

// ---------------------------------------------------------------------------
// Helpers to resolve a ProseMirror schema from various input types
// ---------------------------------------------------------------------------
function resolveSchema(doc: any): Schema {
    if (doc.type?.schema) {
        return doc.type.schema as Schema;
    }
    if (doc.schema) {
        // TipTap Editor instance
        return doc.schema as Schema;
    }
    if (doc.state?.schema) {
        return doc.state.schema as Schema;
    }
    throw new Error(
        "serializeHTML: unable to determine ProseMirror schema from the provided argument. " +
            "Pass a ProseMirror Node or a TipTap Editor instance.",
    );
}

function resolveProseMirrorNode(doc: any): ProseMirrorNode {
    if (doc.type?.schema) {
        return doc as ProseMirrorNode;
    }
    if (doc.state?.doc) {
        return doc.state.doc as ProseMirrorNode;
    }
    if (doc.doc) {
        return doc.doc as ProseMirrorNode;
    }
    throw new Error(
        "serializeHTML: unable to extract a ProseMirror Node from the provided argument.",
    );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Serialize a ProseMirror document (or TipTap editor instance) to an HTML
 * string.  Works entirely without a browser DOM, making it suitable for
 * server-side rendering.
 *
 * @param doc        – A ProseMirror `Node` (document root) or a TipTap `Editor`.
 * @param extensions – Ignored when a schema is already available from `doc`;
 *                     reserved for future use when supplying a raw JSON node.
 */
export function serializeHTML(doc: any, _extensions?: any[]): string {
    const node = resolveProseMirrorNode(doc);
    const schema = resolveSchema(doc);
    const serializer = DOMSerializer.fromSchema(schema);
    const ssrDoc = createSSRDocument();

    // Serialize the document *content* (the Fragment inside the doc node) into
    // our minimal SSR element tree.
    const fragment = serializer.serializeFragment(node.content, {
        document: ssrDoc as unknown as Document,
    }) as unknown as SSRDocumentFragment;

    return serializeFragmentToString(fragment);
}
