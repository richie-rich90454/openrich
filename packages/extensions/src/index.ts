// Nodes
export { Paragraph } from "./nodes/paragraph";
export { Heading } from "./nodes/heading";
export { BulletList } from "./nodes/bullet-list";
export { OrderedList } from "./nodes/ordered-list";
export { TaskList } from "./nodes/task-list";
export { TaskItem } from "./nodes/task-item";
export { CodeBlock } from "./nodes/code-block";
export { Blockquote } from "./nodes/blockquote";
export { HorizontalRule } from "./nodes/horizontal-rule";
export { Image } from "./nodes/image";
export { HardBreak } from "./nodes/hard-break";

// Marks
export { Bold } from "./marks/bold";
export { Italic } from "./marks/italic";
export { Underline } from "./marks/underline";
export { Strike } from "./marks/strike";
export { Code } from "./marks/code";
export { Link } from "./marks/link";
export { Highlight } from "./marks/highlight";

// Plugins
export { Placeholder } from "./plugins/placeholder";
export { History } from "./plugins/keyboard-shortcuts";

// Direct re-exports from TipTap base extensions
export { Document } from "@tiptap/extension-document";
export { Text } from "@tiptap/extension-text";
export { ListItem } from "@tiptap/extension-list-item";
