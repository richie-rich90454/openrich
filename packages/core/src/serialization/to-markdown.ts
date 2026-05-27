import type { Node as ProseMirrorNode } from 'prosemirror-model';
import {
  defaultMarkdownSerializer,
  type MarkdownSerializer,
} from 'prosemirror-markdown';

function resolveProseMirrorNode(doc: any): ProseMirrorNode {
  if ((doc as ProseMirrorNode)?.isBlock !== undefined) {
    return doc as ProseMirrorNode;
  }
  if ((doc as any)?.state?.doc) {
    return (doc as any).state.doc as ProseMirrorNode;
  }
  if ((doc as any)?.doc) {
    return (doc as any).doc as ProseMirrorNode;
  }
  throw new Error(
    'serializeMarkdown: unable to extract a ProseMirror Node from the provided argument. ' +
      'Pass a ProseMirror Node or a TipTap Editor instance.',
  );
}

/**
 * Serialize a ProseMirror document (or TipTap editor instance) to a Markdown
 * string.
 *
 * Uses the built-in `defaultMarkdownSerializer` from `prosemirror-markdown`,
 * which handles: paragraph, heading, bulletList, orderedList, codeBlock,
 * blockquote, horizontalRule, image, hardBreak, and the common inline marks
 * (em, strong, code, link).
 *
 * @param doc        – A ProseMirror `Node` (document root) or a TipTap `Editor`.
 * @param _extensions – Reserved for future use; ignored when the default
 *                      serializer is sufficient.
 */
export function serializeMarkdown(doc: any, _extensions?: any[]): string {
  const node = resolveProseMirrorNode(doc);
  const serializer: MarkdownSerializer = defaultMarkdownSerializer;
  return serializer.serialize(node);
}
