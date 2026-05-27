import type { Node as ProseMirrorNode } from 'prosemirror-model';

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
    'serializeText: unable to extract a ProseMirror Node from the provided argument. ' +
      'Pass a ProseMirror Node or a TipTap Editor instance.',
  );
}

/**
 * Recursively extract plain text from a ProseMirror document.
 *
 * Text nodes are concatenated; a newline is inserted *between* sibling block
 * nodes so that paragraphs, headings, list items etc. produce readable output.
 *
 * @param doc – A ProseMirror `Node` (document root) or a TipTap `Editor`.
 */
export function serializeText(doc: any): string {
  const node = resolveProseMirrorNode(doc);

  const parts: string[] = [];

  function walk(n: ProseMirrorNode): void {
    if (n.isText) {
      parts.push(n.text ?? '');
      return;
    }

    let firstChild = true;
    n.forEach((child: ProseMirrorNode) => {
      if (!firstChild && child.isBlock) {
        parts.push('\n');
      }
      firstChild = false;
      walk(child);
    });
  }

  walk(node);
  return parts.join('');
}
