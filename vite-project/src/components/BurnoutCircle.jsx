import { useEffect, useState } from 'react';

export default function BurnoutCircle({ score = 0, size = 120 }) {
  // score: 0..100
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    setDisplayScore(0);
    if (score == null) return;
    let start = 0;
    const duration = 900; // ms
    const stepMs = 20;
    const steps = Math.ceil(duration / stepMs);
    const increment = (score - start) / steps;
    let curr = start;
    let i = 0;
    const id = setInterval(() => {
      i++;
      curr = Math.min(score, curr + increment);
      setDisplayScore(Math.round(curr));
      if (i >= steps) {
        clearInterval(id);
        setDisplayScore(Math.round(score));
      }
    }, stepMs);
    return () => clearInterval(id);
  }, [score]);

  const r = (size - 12) / 2; // subtract stroke width
  const c = Math.PI * 2 * r;
  const offset = c - (Math.max(0, Math.min(100, displayScore)) / 100) * c;

  let color = '#10B981'; // green
  if (displayScore >= 71) color = '#EF4444'; // red
  else if (displayScore >= 41) color = '#F59E0B'; // orange

  return (
    <div className="flex items-center justify-center flex-col">
      <svg width={size} height={size} className="transform rotate-[-90deg]">
        <defs>
          <linearGradient id="burnGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#f3f4f6"
          strokeWidth="12"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#burnGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 900ms ease-out' }}
        />
      </svg>
      <div className="-mt-[78px] md:-mt-[84px] text-center">
        <div className="text-xl md:text-2xl font-semibold text-gray-800">{displayScore}</div>
        <div className="text-xs md:text-sm text-gray-500">Burnout score</div>
      </div>
    </div>
  );
}
