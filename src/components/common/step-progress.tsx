
import {Progress} from '@/components/ui/progress';

export function StepProgress({ active = 1, steps = 2 }: { active?: number; steps?: number }) {
    return (
        <div className={`grid grid-cols-${steps} gap-2`}>
            {[...Array(steps)].map((_, i) => (
                <Progress key={`step-progress-${i}`} className={i + 1 == active ? "bg-green-600" : ""} />
            ))}
        </div>
    )
}
