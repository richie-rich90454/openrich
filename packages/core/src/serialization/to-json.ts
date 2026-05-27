import type { Node as ProseMirrorNode } from "prosemirror-model";

function resolveProseMirrorNode(doc: any): ProseMirrorNode {
    if (typeof (doc as ProseMirrorNode)?.toJSON === "function") {
        return doc as ProseMirrorNode;
    }
    if ((doc as any)?.state?.doc) {
        return (doc as any).state.doc as ProseMirrorNode;
    }
    if ((doc as any)?.doc) {
        return (doc as any).doc as ProseMirrorNode;
    }
    throw new Error(
        "serializeJSON: unable to extract a ProseMirror Node from the provided argument. " +
            "Pass a ProseMirror Node or a TipTap Editor instance.",
    );
}

/**
 * Serialize a ProseMirror document (or TipTap editor instance) to its JSON
 * representation via `Node.toJSON()`.
 *
 * @param doc – A ProseMirror `Node` (document root) or a TipTap `Editor`.
 */
export function serializeJSON(doc: any): Record<string, any> {
    const node = resolveProseMirrorNode(doc);
    return node.toJSON();
}
