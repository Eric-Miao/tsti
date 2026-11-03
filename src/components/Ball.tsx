export function Ball({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14.2" fill="currentColor" />
      <path
        d="M4.2 7.4c5.6 4.6 5.6 14.6 0 17.2M27.8 7.4c-5.6 4.6-5.6 14.6 0 17.2"
        stroke="#16241C"
        strokeWidth="2.1"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function typeArtUrl(code: string) {
  return `/types/${code.toLowerCase()}-v3.jpg`
}
