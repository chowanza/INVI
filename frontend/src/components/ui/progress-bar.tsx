import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number
    max?: number
    indicatorColor?: string
}

export function ProgressBar({
    value,
    max = 100,
    indicatorColor = "bg-primary",
    className,
    ...props
}: ProgressBarProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
        <div
            className={cn(
                "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
                className
            )}
            {...props}
        >
            <div
                className={cn("h-full w-full flex-1 transition-all", indicatorColor)}
                style={{ transform: `translateX(-${100 - percentage}%)` }}
            />
        </div>
    )
}
