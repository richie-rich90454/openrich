import { useState } from 'react';
import { Editor } from '@openrich/react';
import { StarterKit } from '@openrich/starter-kit';
import { ThemeToggle } from './theme-toggle';
import { LocaleSelector } from './locale-selector';
import { EditableToggle } from './editable-toggle';

const INITIAL_CONTENT = '<h1>Hello, OpenRich!</h1><p>Start typing here...</p>';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [locale, setLocale] = useState('en');
  const [editable, setEditable] = useState(true);

  return (
    <>
      <header className="playground-header">
        <h1>OpenRich Playground</h1>
        <div className="controls">
          <ThemeToggle value={theme} onChange={setTheme} />
          <LocaleSelector value={locale} onChange={setLocale} />
          <EditableToggle value={editable} onChange={setEditable} />
        </div>
      </header>
      <main className="editor-container">
        <Editor
          content={INITIAL_CONTENT}
          extensions={StarterKit}
          editable={editable}
          locale={locale}
          theme={theme}
          placeholder="Type here..."
        />
      </main>
    </>
  );
}
