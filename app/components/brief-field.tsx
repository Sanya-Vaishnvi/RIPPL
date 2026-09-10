"use client";

interface BriefFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
  rows?: number;
}

export function BriefField({
  id,
  label,
  placeholder,
  value,
  onChange,
  optional = false,
  rows = 2,
}: BriefFieldProps) {
  return (
    <div className="border-b border-line py-6">
      <label
        htmlFor={id}
        className={`font-display text-xl ${optional ? "text-ink-soft" : "text-ink"}`}
      >
        {label}
        {optional && (
          <span className="ml-2 text-sm font-normal text-ink-soft">
            (optional)
          </span>
        )}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full resize-none border-0 bg-transparent py-2 font-body text-base text-ink placeholder:italic placeholder:text-ink-soft/70 focus:outline-none"
      />
    </div>
  );
}