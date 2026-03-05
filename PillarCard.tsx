import { useRef, useCallback, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  metric: { label: string; value: string; progress: number; positive: boolean };
  index: number;
}

const PillarCard = ({ icon: Icon, title, description, metric, index }: PillarCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y });
    const ry = ((x - 50) / 50) * 6;
    const rx = ((50 - y) / 50) * 6;
    setTilt({ rx, ry });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
    setSpotlight({ x: 50, y: 50 });
  };

  return (
    <div
      className="perspective-[800px]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 will-change-transform"
        style={{
          transform: isHovered
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-8px) scale(1.02)`
            : 'rotateX(0) rotateY(0) translateY(0) scale(1)',
          boxShadow: isHovered
            ? '0 8px 30px rgba(59,130,246,0.12)'
            : '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        {/* Spotlight effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, hsl(var(--primary) / 0.06), transparent 60%)`,
          }}
        />

        <CardContent className="relative z-10 p-7">
          {/* Icon */}
          <div className="mb-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110"
            >
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-base font-semibold text-foreground">{title}</h3>

          {/* Description */}
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{description}</p>

          {/* Micro-metric */}
          <div className="space-y-2.5 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{metric.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  metric.positive
                    ? 'bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]'
                    : 'bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning))]'
                }`}
              >
                {metric.value}
              </span>
            </div>
            <Progress value={metric.progress} className="h-1.5 bg-border" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PillarCard;
