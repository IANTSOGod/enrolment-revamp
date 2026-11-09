export function LocationSelect({
  label,
  value,
  options,
  loading,
  disabled,
  error,
  onChange,
}: {
  label: string
  value: string
  options: Array<{ id: string; name: string }>
  loading: boolean
  disabled: boolean
  error?: string
  onChange: (id: string) => void
}) {
  const id = label.toLowerCase().replaceAll(" ", "-")

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        disabled={disabled || loading}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
      >
        <option value="">
          {loading ? "Chargement…" : `Sélectionner ${label.toLowerCase()}`}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  )
}
