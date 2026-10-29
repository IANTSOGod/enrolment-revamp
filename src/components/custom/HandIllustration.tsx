export default function HandIllustration({ active = false }: { active?: boolean }) {
  const outline = active ? "#667085" : "#b0b8c2"
  const accent = active ? "#00a878" : outline

  return (
    <svg
      viewBox="0 0 220 210"
      role="img"
      aria-label={
        active
          ? "Illustration de la main droite"
          : "Illustration de la main gauche"
      }
      className="h-full w-full"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <g transform={active ? "translate(220 0) scale(-1 1)" : undefined}>
        <g stroke={outline}>
          <path d="M58 105 48 57c-2-9 1-15 7-16 6-1 10 4 12 12l8 40" />
          <path d="M75 97V37c0-9 4-14 10-14s10 5 10 14v60" />
          <path d="M95 97V27c0-9 4-14 10-14s10 5 10 14v70" />
          <path d="M115 97V43c0-9 4-14 10-14s10 5 10 14v60" />
          <path d="M135 100V58c0-8 4-12 9-12 6 0 9 5 8 13l-6 44" />
          <path d="M58 105c-2 37 9 72 35 91 7 5 14 8 20 8s13-3 20-8c26-19 37-54 35-91H58Z" />
          <path d="M168 119c19 2 28 11 31 24 2 9-3 20-10 23-8 3-13-7-19-17" />
        </g>
        {active && (
          <path
            d="M58 105c-4 12-10 18-17 23-8 6-11 16-7 23 5 9 14 8 21 0 8-9 12-22 12-37"
            fill="#d1fae5"
            stroke={accent}
          />
        )}
        {active && <path d="M85 28v68" stroke="#f4e9a7" strokeWidth="12" />}
        {active && <path d="M85 28v68" stroke="#667085" />}
        {active && (
          <circle cx="85" cy="27" r="7" fill="#72b8b8" stroke="none" />
        )}
      </g>
    </svg>
  )
}
