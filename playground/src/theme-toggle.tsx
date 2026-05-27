interface ThemeToggleProps {
  value: 'light' | 'dark' | 'system';
  onChange: (theme: 'light' | 'dark' | 'system') => void;
}

const themes: { value: 'light' | 'dark' | 'system'; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

export function ThemeToggle({ value, onChange }: ThemeToggleProps) {
  return (
    <div className="control-group">
      <label>Theme</label>
      <div className="controls-row">
        {themes.map((t) => (
          <button
            key={t.value}
            type="button"
            className={`theme-btn${value === t.value ? ' active' : ''}`}
            onClick={() => onChange(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
