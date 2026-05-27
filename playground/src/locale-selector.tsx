interface LocaleSelectorProps {
  value: string;
  onChange: (locale: string) => void;
}

const locales: { value: string; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
  { value: 'es', label: 'Español' },
  { value: 'ar', label: 'العربية' },
  { value: 'pt', label: 'Português' },
  { value: 'fr', label: 'Français' },
  { value: 'ru', label: 'Русский' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'hi', label: 'हिन्दी' },
];

export function LocaleSelector({ value, onChange }: LocaleSelectorProps) {
  return (
    <div className="control-group">
      <label>Locale</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {locales.map((loc) => (
          <option key={loc.value} value={loc.value}>
            {loc.value} ({loc.label})
          </option>
        ))}
      </select>
    </div>
  );
}
