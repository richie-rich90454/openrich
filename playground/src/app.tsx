import { useState } from 'react';
import { Editor } from '@openrich/react';
import { StarterKit } from '@openrich/starter-kit';
import { ThemeToggle } from './theme-toggle';
import { LocaleSelector } from './locale-selector';
import { EditableToggle } from './editable-toggle';

const INITIAL_CONTENT = '<h1>Hello, OpenRich!</h1><p>Start typing here...</p>';
const LONG_CONTENT = `<h2>Embedded anywhere</h2>
<p>This editor is sized by its parent container. Resize the card to see it adapt.</p>
<ul>
  <li>Pass <code>className</code> and <code>style</code> props</li>
  <li>Set width/height via CSS or inline styles</li>
  <li>Theme and locale props work as usual</li>
</ul>`;

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

      <main className="showcase">
        <section className="showcase-section">
          <h2>Default (fills container)</h2>
          <div className="editor-card editor-card--full">
            <Editor
              content={INITIAL_CONTENT}
              extensions={StarterKit}
              editable={editable}
              locale={locale}
              theme={theme}
              placeholder="Type here..."
            />
          </div>
        </section>

        <div className="showcase-row">
          <section className="showcase-section">
            <h2>Fixed height, 300px</h2>
            <div className="editor-card" style={{ height: 300 }}>
              <Editor
                content={LONG_CONTENT}
                extensions={StarterKit}
                editable={editable}
                locale={locale}
                theme={theme}
                placeholder="Type here..."
                className="editor-custom"
                style={{ border: '2px solid var(--openrich-primary)' }}
              />
            </div>
          </section>

          <section className="showcase-section">
            <h2>Compact, 180px</h2>
            <div className="editor-card" style={{ height: 180 }}>
              <Editor
                content="<p>Small embedded editor with custom class.</p>"
                extensions={StarterKit}
                editable={editable}
                locale={locale}
                theme={theme}
                className="editor-rounded"
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
