export function Lagarta({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const bolinhas = [0, 1, 2, 3, 4];

  return (
    <svg viewBox="0 0 64 24" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <line x1="11" y1="9" x2="8" y2="3" stroke="#2f4a35" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="15.5" y1="9" x2="13.5" y2="3" stroke="#2f4a35" strokeWidth="1.3" strokeLinecap="round" />
      {bolinhas.map((i) => (
        <circle
          key={i}
          cx={12 + i * 10}
          cy="14"
          r="5"
          fill="#2f4a35"
          style={{
            transformOrigin: `${12 + i * 10}px 14px`,
            animation: `pulsar-bolinha 1s ease-in-out ${i * 0.12}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}

export function Casulo({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 52" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4 C10 2, 22 6, 36 3" stroke="#7a5a3a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M20 6 C19 8, 19 10, 19.5 13" stroke="#8a8a7f" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path
        d="M20 13
           C 27 14, 30 22, 29 30
           C 28.5 36, 26 42, 22 48
           C 21 49.5, 19 49.5, 18 48
           C 14 42, 11.5 36, 11 30
           C 10 22, 13 14, 20 13 Z"
        fill="#9a9a92"
      />
      <path d="M20 15 C22 22, 22 36, 20 47" stroke="#7d7d74" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M15 20 C14 27, 15.5 37, 18.5 46" stroke="#b7b7ac" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M25 20 C26 27, 24.5 37, 21.5 46" stroke="#b7b7ac" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}
