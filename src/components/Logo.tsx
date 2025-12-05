import { Car } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 text-xl font-bold text-slate-800", className)}>
      <Car className="h-6 w-6 text-accent" />
      <span className="font-headline">LocalWheels</span>
    </div>
  );
}
