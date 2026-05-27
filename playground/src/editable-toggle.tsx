interface EditableToggleProps {
  value: boolean;
  onChange: (editable: boolean) => void;
}

export function EditableToggle({ value, onChange }: EditableToggleProps) {
  return (
    <div className="control-group">
      <label>Editable</label>
      <div
        className={`toggle-track${value ? ' active' : ''}`}
        role="switch"
        aria-checked={value}
        tabIndex={0}
        onClick={() => onChange(!value)}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange(!value);
          }
        }}
      >
        <div className="toggle-thumb" />
      </div>
    </div>
  );
}
