/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type { ThemeMode, Dir, LocaleConfig, OpenRichOptions, SerializedDoc } from "./types";

/* ------------------------------------------------------------------ */
/*  Editor                                                             */
/* ------------------------------------------------------------------ */
export { OpenRichEditor } from "./openrich-editor";

/* ------------------------------------------------------------------ */
/*  Base classes (for building custom extensions)                      */
/* ------------------------------------------------------------------ */
export { Node } from "./base/node";
export { Mark } from "./base/mark";
export { Extension } from "./base/extension";

/* ------------------------------------------------------------------ */
/*  Command API                                                        */
/* ------------------------------------------------------------------ */
export {
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleStrike,
    toggleHeading,
    toggleBulletList,
    toggleOrderedList,
    toggleBlockquote,
    toggleCodeBlock,
    insertImage,
    setLink,
    undo,
    redo,
} from "./command-api";

/* ------------------------------------------------------------------ */
/*  Transaction / chain                                                */
/* ------------------------------------------------------------------ */
export { createChain } from "./transaction";

/* ------------------------------------------------------------------ */
/*  Serialization                                                      */
/* ------------------------------------------------------------------ */
export {
    serializeHTML,
    serializeJSON,
    serializeText,
    serializeMarkdown,
    serializeDoc,
    renderStatic,
} from "./serialization";

/* ------------------------------------------------------------------ */
/*  i18n                                                               */
/* ------------------------------------------------------------------ */
export { I18nManager } from "./i18n";
export { default as messages } from "./i18n/messages";

/* ------------------------------------------------------------------ */
/*  Theme                                                              */
/* ------------------------------------------------------------------ */
export { ThemeManager } from "./theme";

/* ------------------------------------------------------------------ */
/*  Utilities                                                          */
/* ------------------------------------------------------------------ */
export { isClient } from "./utils/is-client";
export { getEditorContainer, isElement, createContainer, queryContainer } from "./utils/dom";
export { isMac, isIOS, isChrome49Plus } from "./utils/platform";
