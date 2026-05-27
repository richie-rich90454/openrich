import { createContext, useContext } from 'react';
import type { OpenRichEditor } from '@openrich/core';

const EditorContext = createContext<OpenRichEditor | null>(null);

export const EditorProvider = EditorContext.Provider;
export const useEditorContext = () => useContext(EditorContext);
